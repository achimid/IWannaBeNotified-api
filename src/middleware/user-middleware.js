const inUser = (req, res, next) => {

    if (req.user) {
        if (Object.keys(req.body).length) {
            req.body.userId = req.user._id
        } else {
            req.body = {userId: req.user._id}
        }
        if (Object.keys(req.query).length) {
            req.query.userId = req.user._id
        } else {
            req.query = {userId: req.user._id}
        }
    }

    next()    
}

module.exports = inUser
