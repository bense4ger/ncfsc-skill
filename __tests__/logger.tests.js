"use strict";
const mockLog = jest.fn();
const mockErr = jest.fn();

describe('logger', () => {
    let logger;
    beforeAll(() => {
        console.log = mockLog;
        console.error = mockErr;
        process.env['NODE_ENV'] = 'prod';

        logger = require('../lib/logger');
    });

    test('should log INFO correctly', () => {
        logger.log(logger.logType.INFO, 'someMessage');
        expect(mockLog.mock.calls.length).toBe(1);
    });

    test('should log ERR correctly', () => {
        logger.log(logger.logType.ERR, 'someMessage');
        expect(mockErr.mock.calls.length).toBe(1);
    });

});