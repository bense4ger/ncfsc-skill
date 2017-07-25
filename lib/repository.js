/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const factory = require('./factory');
const logger = require('./logger');

const keyMapping = {
    events: 'events.json'
};

module.exports = {
    get: (key) => {
        logger.log(logger.logType.INFO, 'repository.get');

        return new Promise((resolve, reject) => {
            if (!keyMapping[key]) reject(new Error(`Can't get ${key}`));

            const s3 = factory.instance('s3');
            const params = {
                Bucket: process.env.BUCKET_NAME || 'ncfsc',
                Key: keyMapping[key]
            };

            s3.getObject(params, (err, response) => {
                if (err) {
                    logger.log(logger.logType.ERR, 's3.getObject');
                    logger.log(logger.logType.ERR, err);

                    reject (err);
                }

                let data;
                try {
                    logger.log(logger.logType.INFO, 'repository.get - parsing data');
                    console.dir(response);
                    data = JSON.parse(response);
                    console.dir(data);

                    resolve(data.Body);
                }
                catch(err) {
                    logger.log(logger.logType.ERR, 'parsing');
                    logger.log(logger.logType.ERR, err);

                    reject(err);
                }
            });
        });
    }
};
