"use strict";
const moment = require('moment');
const logger = require('./logger');
const { ERROR_MESSAGE, SUCCESS_MESSAGE, EMPTY_MESSAGE } = require('./messages')['en-GB'].translation;

module.exports = {
    success(eventModel) {
        logger.log(logger.logType.INFO, `Success Response: ${JSON.stringify(eventModel)}`);

        let response;
        if (Object.keys(eventModel).length) {
            response = SUCCESS_MESSAGE;
            eventModel.date = moment(eventModel.date).format('Do MMMM YY');
            Object.keys(eventModel).map(k => { response = response.replace(`{${k}}`, eventModel[k]); });
        }
        else {
            response = EMPTY_MESSAGE;
        }

        return response;
    },
    failure() {
        logger.log(logger.logType.INFO, 'Failure Response');
        return ERROR_MESSAGE;
    }
};