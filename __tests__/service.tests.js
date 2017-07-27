/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const moment = require('moment');

describe('service', () => {
    let service;
    let expectedEvent;
    let mockRepo;
    beforeAll(() => {
        jest.mock('../lib/repository');
        mockRepo = require('../lib/repository');
        mockRepo.__createFakes(3);

        expectedEvent = mockRepo.__fakeEvents[0];

        service = require('../lib/service');
    });

    test('getNextEvent gets the next event if there is one', () => {
        expect.assertions(1);

        return service.getNextEvent().then(response => {
            expect(response).toBe(expectedEvent);
        });
    });


    test('getEventDetail returns event detail', () => {
        expect.assertions(1);

        return service.getEventDetail(1).then(response => expect(response).toBe(expectedEvent.details));
    });


    test('getNextEvent returns an empty object if there are no events', () => {
        mockRepo.__fakeEvents = [];
        expect.assertions(1);

        return service.getNextEvent().then(response => expect(response).toMatchObject({}));
    });
});