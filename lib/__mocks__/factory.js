/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const mockBody = new Buffer.from(JSON.stringify([
    {
        foo: 'bar'
    },
    {
        bar: 'foo'
    }
]));

const s3 = {
    getObject: (params, callback) => {
        const mockData = { Body : mockBody };

        //const response = JSON.stringify(mockData);
        const response = mockData;
        callback(undefined, response);
    }
};

module.exports = {
    instance: () => s3
};