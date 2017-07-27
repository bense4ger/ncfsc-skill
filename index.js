"use strict";
const Alexa = require('alexa-sdk');
const service = require('./lib/service');
const logger = require('./lib/logger');
const { responseType, createResponse } = require('./lib/response-factory');

const handlers = {
    LaunchRequest: function () {
        const welcome = this.t('WELCOME_MESSAGE');
        const reprompt = this.t('WELCOME_REPROMPT');

        this.emit(':ask', welcome, reprompt);
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = this.t('HELP_MESSAGE');
        const reprompt = this.t('HELP_MESSAGE');
        this.emit(':ask', speechOutput, reprompt);
    },
    'AMAZON.CancelIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    'AMAZON.StopIntent': function () {
        this.emit(':tell', this.t('STOP_MESSAGE'));
    },
    Unhandled: function () {
        logger.log(logger.logType.ERR, 'Unhandled');
        logger.log(logger.logType.ERR, this.args);

        this.emit(':tell', this.t('ERROR_MESSAGE'));
    },
    GetEventIntent: function () {
        logger.log(logger.logType.INFO, 'Entered GetEventIntent');

        try{
            service.getNextEvent()
                .then(evt => {
                    logger.log(logger.logType.INFO, 'Returned event from service');
                    const response = createResponse(responseType.event, evt);

                    this.emit(':tell', response);
                })
                .catch((err) => {
                    logger.log(logger.logType.ERR, 'Error in GetEventIntent');
                    logger.log(logger.logType.ERR, err);

                    this.emit(':tell', this.t('ERROR_MESSAGE'));
                });
        }
        catch (err) {
            logger.log(logger.logType.ERR, 'Error in GetEventIntent');
            logger.log(logger.logType.ERR, err);

            this.emit(':tell', this.t('ERROR_MESSAGE'));
        }
    }
};

exports.handler = (event, context, callback) => {
    logger.log(logger.logType.INFO, 'Entered Handler');

    const alexa = Alexa.handler(event, context);
    alexa.APP_ID = 'amzn1.ask.skill.bcd37ddc-e0e7-40a5-9643-e852475fd98a';
    alexa.resources = require('./lib/messages');
    alexa.registerHandlers(handlers);

    logger.log(logger.logType.INFO, 'Alexa Execute');
    alexa.execute();
};