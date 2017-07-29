"use strict";
const Speech = require('ssml-builder');
const { responseType, createResponse } = require('../lib/response-factory');

describe('response-factory', () => {

    test('when passed a type of info it should create the correct info response', () => {
        const result = createResponse(responseType.info);
        expect(result).toBeInstanceOf(Speech);
    });

    test('when passed an event model with a full date it should create the success response correctly', () => {
        const model = {
            id: 1,
            name: 'foo',
            location: 'location',
            date: '20170101',
            time: '7pm',
            details: 'some details',
            isConfirmed: true
        };

        const result = createResponse(responseType.event, model);

        expect(result).toBeInstanceOf(Speech);
        expect(result._elements).toHaveLength(9);
        expect(result._elements[1]).toBe(model.name);
        expect(result._elements[3]).toContain(model.date);
        expect(result._elements[5]).toContain(model.time);
        expect(result._elements[8]).toBe(model.location);
    });

    test('when passed an event model without a full date it should create the partial success response correctly', () => {
        const model = {
            id: 1,
            name: 'foo',
            date: '20170101',
            vagueDate: 'sometime',
            isConfirmed: false
        };

        const result = createResponse(responseType.event, model);

        expect(result).toBeInstanceOf(Speech);
        expect(result._elements).toHaveLength(5);
        expect(result._elements[1]).toBe(model.name);
        expect(result._elements[3]).toContain(model.vagueDate);
    });

    test('when passed an empty event model it should create the correct empty response', () => {
        const model = {};

        const result = createResponse(responseType.event, model);

        expect(result).toBeInstanceOf(Speech);
        expect(result._elements[0]).toBe('There are no upcoming events.  Check back later, and keep an eye on the social club website');
    });

    test('when passed a details model it should create the full details response correctly', () => {

    });

    test('when passed a membership type it should create the correct membership response', () => {
        const result = createResponse(responseType.membership);

        expect(result).toBeInstanceOf(Speech);
        expect(result._elements).toHaveLength(3);
    });

    test('when passed an error type it should create an error response correctly', () => {
        const result = createResponse(responseType.error);

        expect(result).toBeInstanceOf(Speech);
    });
});