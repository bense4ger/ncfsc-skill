/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const moment = require('moment');

describe('service', () => {
    let service;
    beforeAll(() => {
        jest.mock('../lib/repository');
        service = require('../lib/service');
    });

    test('getNextEvent gets the next event if there is one', () => {
        expect.assertions(1);

        return service.getNextEvent().then(response => expect(response).toBeDefined());
    });

    test('getEventDetail returns event detail', () => {
        expect.assertions(1);

        return service.getEventDetail(1).then(response => expect(response).toBe('details'));
    });
});