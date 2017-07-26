/**
 * Created by benseager on 16/07/2017.
 */
"use strict";

describe('repository', () => {
    let repo;
    beforeAll(() => {
        jest.mock('../lib/factory');
        repo = require('../lib/repository');
    });
    test('get should return a collection of event objects', () => {
        expect.assertions(1);
        return repo.get('events').then(data => expect(data).toBeDefined());
    });

    test('get should throw an error if passed an invalid key', () => {
        expect.assertions(1);
        const key = 'willFail';
        return repo.get(key).catch(err => expect(err.message).toBe(`Can't get ${key}`));
    });
});