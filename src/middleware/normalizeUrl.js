export function normalizeUrl(req, res, next) {
    let host = req.headers.host;
    let url = req.url;

    // Force www
    if (host === "regressionequationcalculator.com") {
        return res.redirect(301, `https://www.regressionequationcalculator.com${url}`);
    }

    // Force trailing slash (ignore files)
    if (!url.includes('.') && !url.endsWith('/')) {
        return res.redirect(301, `${url}/`);
    }

    next();
}
