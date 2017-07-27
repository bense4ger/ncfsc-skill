/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
// const moment = require('moment');
//
// const evt = {
//     id: 1,
//     name: 'foo',
//     location: 'location',
//     date: moment().add(7, 'days'),
//     time: '7pm',
//     details: 'details'
// };
//
// const getEventData = jest.fn(() => [evt]);
//
// module.exports = {
//     get: (key) => {
//         return new Promise((resolve, reject) => {
//             resolve(getEventData());
//         });
//     }
// };
const moment = require('moment');

const mockRepo = jest.genMockFromModule('../repository');
mockRepo.__fakeEvents = [];

Object.defineProperty(mockRepo, 'fakeEvents', {
    get: function () { return this.__fakeEvents; },
    set: function (value) { this.__fakeEvents = value; }
});

mockRepo.__createFakes = function (count = 1) {
    for(let i = 0; i < count; ++i) {
        this.__fakeEvents.push({
            id: i,
            name: `event_${i}`,
            location: `location_${i}`,
            date: moment().add((i + 1) * 7, 'days'),
            time: '7pm',
            details: `details_${i}`
        });
    }
};

mockRepo.get = function (key) {
    return new Promise((resolve, reject) => {
        resolve(this.__fakeEvents);
    });
};

module.exports = mockRepo;