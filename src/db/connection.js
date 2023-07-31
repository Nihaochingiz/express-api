const monk = require ('monk');

let dbUrl = process.env.DB_URL;


if (process.env.NODE_ENV === 'test') {
    dbUrl = process.env.TEST_DB_URL;
}

const db = monk(dbUrl);


module.exports = db;


function notFound(req, res, next) {
    res.status(404);
    const error = new Error( "Not Found", req.originalUrl);
    next(error);
}

function errorHandler( err, req, res, next) {
    res.status(res.statusCode || 500);
    res.json({
        message:err.message,
        stack:err.stack
    });
}



module.exports = {
    notFound,
    errorHandler
}

