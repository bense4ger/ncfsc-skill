"use strict";
const AWS = require('aws-sdk');
const factory = require('../lib/factory');

describe('factory', () => {
    beforeAll(() => {

    });
    test('should throw an error if no key is passed', () => {
        expect(() => factory.instance()).toThrow('No key passed to factory');
    });
    test('should throw an error if an incorrect key is passed', () => {
        const failKey = 'fail';
        expect(() => factory.instance(failKey)).toThrow(`Factory cannot create ${failKey}`);
    });
    test('should return a S3 if the correct key is passed', () => {
        const obj = factory.instance('s3');
        expect(obj).toBeDefined();
        expect(obj).toBeInstanceOf(AWS.S3);
    });
});