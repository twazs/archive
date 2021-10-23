function notFoundPage(options) {
    return function(req, res, next) {
        res.status(404).render("404.ejs", {
            bot: options.bot,
            req: req
        });
    }
}

function internalErrorPage(options) {
    return function(req, res, next) {
        res.status(500).render("500.ejs", {
            bot: options.bot,
            req: req
        });
    }
}

var exp = { notfound: notFoundPage, internalError: internalErrorPage }
exports = module.exports = exp;
exports.package = exp;