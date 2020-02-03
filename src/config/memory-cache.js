var mcache = require('memory-cache');
const default_duration = process.env.DEFAULT_MEMORY_CACHE_TIME

const cache = (duration = default_duration) => {
    return (req, res, next) => {
        let key = '__express__' + (req.originalUrl || req.url) + '_' + JSON.stringify(req.body)
        let cachedBody = mcache.get(key)
        if (cachedBody) {            
            res.send(JSON.parse(cachedBody))
            return
        } else {
            res.sendResponse = res.send
            res.send = (body) => {                
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body)
            }
            next()
        }
    }
}

module.exports = cache