/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const AWS = require('aws-sdk');

module.exports = {
    configure: () => {
        const region = process.env.BUCKET_REGION;

        if (!region) throw new Error('Unable to configure AWS');
        AWS.config.update({
            region: region
        });

    }
};