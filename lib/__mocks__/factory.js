/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const s3 = {
    getObject: (params, callback) => {
        const mockData = { Body : [
            {
                foo: 'bar'
            },
            {
                bar: 'foo'
            }
        ]};

        const response = JSON.stringify(mockData);
        callback(undefined, response);
    }
};

module.exports = {
    instance: () => s3
};