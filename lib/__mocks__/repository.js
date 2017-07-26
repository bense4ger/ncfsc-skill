/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const moment = require('moment');

const evt = {
    id: 1,
    name: 'foo',
    location: 'location',
    date: moment().add(7, 'days'),
    time: '7pm',
    details: 'details'
};

const getEventData = jest.fn(() => [evt]);

module.exports = {
    get: (key) => {
        return new Promise((resolve, reject) => {
            resolve(getEventData());
        });
    }
};