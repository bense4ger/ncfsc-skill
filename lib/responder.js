"use strict";
const moment = require('moment');
const logger = require('./logger');
const { ERROR_MESSAGE, SUCCESS_MESSAGE } = require('./messages')['en-GB'].translation;

const isValid = (model) => {
    return ;
};

module.exports = {
    success(eventModel) {
        logger.log(logger.logType.INFO, `Success Response: ${JSON.stringify(eventModel)}`);

        if (!eventModel && !Object.keys(eventModel).length) throw new Error('Invalid model passed');
        let response = SUCCESS_MESSAGE;

        eventModel.date = moment(eventModel.date).format('Do MMMM YY');

        Object.keys(eventModel).map(k => { response = response.replace(`{${k}}`, eventModel[k]); });

        return response;
    },
    failure() {
        logger.log(logger.logType.INFO, 'Failure Response');
        return ERROR_MESSAGE;
    }
};