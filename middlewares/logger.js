const logger = (req, res, next) => {
    let route = req.protocol+'://'+req.get('host')+req.originalUrl
    let separator = '='
    console.log(separator.repeat(route.length))
    console.log(route)
    next()
}

module.exports = logger;
