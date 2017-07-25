"use strict";

module.exports = {
    logType: {
        INFO: { name: 'INFO', func: (data) => console.log(data) },
        ERR: { name: 'ERR', func: (data) => console.error(data) }
    },
    log(logType, data) {
        const env = process.env['NODE_ENV'] || 'dev';
        if (env === 'prod') {
            const complete = {
                type: logType.name,
                message: JSON.stringify(data),
                timestamp: new Date().toISOString()
            };

            logType.func(JSON.stringify(complete));
        }
    }
};
