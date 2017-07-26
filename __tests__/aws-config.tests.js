/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const config = require('../lib/aws-config');

describe('aws config', () => {
    test('should error if no region is provided in environment variables', () => {
        expect(() => config.configure()).toThrow('Unable to configure AWS');
    });

    test('should configure correctly if region is provided in the environment vars', () => {
        process.env.BUCKET_REGION = 'foo';
        expect(() => config.configure()).not.toThrow('Unable to configure AWS');
    });
});
