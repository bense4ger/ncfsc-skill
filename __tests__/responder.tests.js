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

describe('responder', () => {
    let responder;
    beforeAll(() => {
        jest.mock('../lib/logger');
        jest.mock('../lib/messages');
        responder = require('../lib/responder');
    });

    test('should return the correct string for a success', () => {
        const result = responder.success(evt);
        expect(result).toEqual(`Our next event is foo which is on ${moment().add(7, 'days').format('Do MMMM YY')} at 7pm.  It is being held at location.`);
    });

    test('should return an error message if there is a failure', () => {
        const result = responder.failure();
        expect(result).toEqual('I\'m sorry, something has gone wrong. Please try again');
    });
});