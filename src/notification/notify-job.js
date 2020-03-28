const schedule = require('../utils/cron')
const SiteRequestModel = require('../site-request/sr-model')

const executionService = require('../site-execution/se-service')

const TelegramDispatcher = require('./telegram/telegram')
const EmailDispatcher = require('./email/email-dispatcher')
const WebHookDispatcher = require('./webhook/webhook-dispatcher')
const WebSocketDispacher = require('./websocket/websocket')

const { execute } = require('../site-execution/se-service')
const { templateFormat } = require('../utils/template-engine')
const { hasSimilarity } = require('../utils/text-search')
const { 
    hasUrlsOnContent, 
    getUrlsOnContent, 
    getFiltersFromSiteRequest 
} = require('../utils/commons')


const parseUpdateData = (exect) => {
    const updateData = { 
        isSuccess: exect.isSuccess,
        createdAt: exect.createdAt
    }

    if (exect.isSuccess) {
        updateData.hashTarget = exect.hashTarget
        updateData.extractedTarget = exect.extractedTarget
        updateData.extractedContent = exect.extractedContent
    } else {
        updateData.errorMessage = exect.errorMessage
    }
    
    return updateData    
}

const getNotifications = (site) => {
    if (site.notifications.length) return site.notifications
    if (site.userId && site.userId.notifications && site.userId.notifications.length) return site.userId.notifications
    console.info('Nenhum canal de notificação encontrado', site.url)
    return []
}

const notifyChannels = (site) => Promise.all(getNotifications(site).map(notf => {        

    if (notf.telegram.chat_id) {
        const message = templateFormat(site, notf.template)
        return TelegramDispatcher.notifyAll(message)
    } else if (notf.email && notf.email.legth > 0) {
        const message = templateFormat(site, notf.template)
        return EmailDispatcher.sendEMail(notf.email, message)
    } else if (notf.webhook && notf.webhook.legth > 0) {
        return WebHookDispatcher.send(notf.webhook, site)
    } if (notf.websocket) {
        return WebSocketDispacher.notifyWebSocket(site)
    }
    
}))


const executeSequencialRequest = async (req) => {
    if (req.then.length == 0) return

    const reqTmp = req.toObject()
    delete reqTmp._id

    const newReq = new SiteRequestModel(reqTmp)    

    newReq.isTransient = true
    newReq.url = getUrlsOnContent(req)[0]
    newReq.scriptTarget = newReq.then.pop()
    newReq.scriptContent = []
    newReq.scriptContent.push(newReq.scriptTarget)

    console.info('Executando Request sequencial...')

    executeSiteRequests(newReq)
}


const validateAndNotify = async (req, exect) => {
    
    try {
        if (!exect.isSuccess)
            throw 'Execution failed'
            
        if (req.options.onlyChanged && !req.lastExecution.hashChanged) 
            throw 'Hash not changed'

        if (req.options.onlyUnique) {
            const isUnique = await executionService.countHash(req, exect) <= 0
            if (!isUnique) throw 'Hash not unique'
        }

        const filter = getFiltersFromSiteRequest(req)
        if (filter) {
            const { words, threshold} = filter
            if (!hasSimilarity(exect.extractedTarget, words, threshold)) {
                throw 'Has no similarity with filters'
            }
        }

        if (req.then.length > 0 && hasUrlsOnContent(req)) {
            executeSequencialRequest(req) // Async
        } else {
            notifyChannels(req) // Async
        }
    } catch (error) {
        console.info('Notification not sent: ', error)
    }            
}

const executeSiteRequests = (req) => execute(req)
    .then(async (exect) => {

        const hashChanged = req.lastExecution.hashTarget != exect.hashTarget
        Object.assign(req, { lastExecution: parseUpdateData(exect) })
        req.lastExecution.hashChanged = hashChanged

        validateAndNotify(req, exect)

        if (!req.isTransient) req.save()    
    })

const jobs = {}
const createJobExecutions = (req) => {
    console.info(`Starting job for ${req.url} runing each ${req.options.hitTime} minute`)
    return schedule(() => executeSiteRequests(req), `*/${req.options.hitTime} * * * *`)
        .then((data) => jobs[req.id] = data)
        .then(() => req)
}

const removeJobExecutions = (req) => {
    const job = jobs[req.id]
    job.stop()

    delete jobs[req.id]

    return req
}

const initJobsExecutions = () => {
    if (process.env.ENABLE_JOB !== 'true') return
    console.info('Iniciando job de notificação...')

    // return SiteRequestModel
    //     .find({'options.isDependency': { $ne: true}})
    //     .populate('userId').exec()    
    //     .then(requests => requests.map(req => {
    //         executeSiteRequests(req)            
    //         createJobExecutions(req)
    //     }))

    return SiteRequestModel.findById('5e7f4a8d7523d0375b8bba0c')
        .then(executeSiteRequests)
        .catch(() => console.log('Erro ao inicializar SchedulesRequests'))
}
    

module.exports = {
    initJobsExecutions,
    createJobExecutions,
    removeJobExecutions
}