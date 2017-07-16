/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const factory = require('./factory');
const keyMapping = {
    events: 'events.json'
};

module.exports = {
    get: (key) => {
        return new Promise((resolve, reject) => {
            if (!keyMapping[key]) reject(new Error(`Can't get ${key}`));

            const s3 = factory.instance('s3');
            const params = {
                Bucket: process.env.BUCKET_NAME || 'ncfsc',
                Key: keyMapping[key]
            };

            s3.getObject(params, (err, response) => {
                if (err) reject (err);

                let data;
                try {
                    data = JSON.parse(response);
                    resolve(data.Body);
                }
                catch(err) {
                    reject(err);
                }
            });
        });
    }
};
