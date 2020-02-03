const schedule = require('./cron')
const SiteRequestModel = require('../site-request/sr-model')
const SiteExecutionModel = require('../site-execution/se-model')
const Telegram = require('../notification/telegram/telegram')
const EmailDispatcher = require('../notification/email/email-dispatcher')
const { execute } = require('../site-execution/se-service')
const { templateFormat } = require('../utils/template-engine')

const parseUpdateData = (exect) => {
    const updateData = { isSuccess: exect.isSuccess}

    if (exect.isSuccess) {
        updateData.hashTarget = exect.hashTarget
        updateData.extractedTarget = exect.extractedTarget
        updateData.extractedContent = exect.extractedContent
    } else {
        updateData.errorMessage = exect.errorMessage
    }
    
    return updateData    
}


const notifyChannels = (site) => {
    return Promise.all(site.notification.map(notf => {
        const message = templateFormat(site, notf.template)

        if (notf.telegram) {
            return Telegram.notifyAll(message)
        } else if (notf.email) {
            return EmailDispatcher.sendEMail(notf.email, message)
        }
        
    }))
}


const countHash = (req, exect) => SiteExecutionModel.countDocuments({url: req.url, hashTarget: req.lastExecution.hashTarget, _id: { $ne: exect._id}})

const validateAndNotify = async (req, exect) => {
    try {
            
        if (req.options.onlyChanged && !req.lastExecution.hashChanged) 
            throw 'hash not changed'

        if (req.options.onlyUnique) {
            const isUnique = await countHash(req, exect) <= 0
            if (!isUnique) throw 'is not unique'
        }

        await notifyChannels(req)
    } catch (error) {
        console.info('Notification not sent: ', error)
    }            
}

const executeSiteRequests = (req) => execute(req)
    .then(async (exect) => {
        if (!exect.isSuccess) return
        
        const hashChanged = req.lastExecution.hashTarget != exect.hashTarget

        // Copy execution into requisition.lastExecution
        Object.assign(req, { lastExecution: parseUpdateData(exect) })
        req.lastExecution.hashChanged = hashChanged

        await validateAndNotify(req, exect)

        return req.save()    
    })

const initSchedulesRequests = () => {    
    if (process.env.ENABLE_JOB !== 'true') return

    return SiteRequestModel.find()
    .then(requests => requests.map(req => {
        console.info(`Starting job for ${req.url} runing each ${req.options.hitTime} minute`)
        // return executeSiteRequests(req)
        
        return schedule(() => {
            return executeSiteRequests(req)
        },`*/${req.options.hitTime} * * * *` )
        
        // },`*/15 * * * * *` ) // TODO: Remover

    }))
}
    

module.exports = initSchedulesRequests