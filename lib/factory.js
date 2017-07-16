/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const AWS = require('aws-sdk');

module.exports = {
    cache : {
        s3: { create: () => new AWS.S3(), obj: undefined }
    },
    create: function (key) {
        if (!key) throw new Error('No key passed to factory');
        if (!this.cache[key]) throw new Error(`Factory cannot create ${key}`);

        if (this.cache[key].obj) return this.cache[key].obj;

        const instance = this.cache[key].create();
        if ('obj' in this.cache[key]) this.cache[key].obj = instance;

        return instance;
    }
};