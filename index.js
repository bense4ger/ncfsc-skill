"use strict";
const Alexa = require('alexa-sdk');
const service = require('./lib/service');
const logger = require('./lib/logger');
const responseType = require('./lib/response-factory').responseType;
const responder = require('./lib/responder');

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

        this.emit(':tell', responder(responseType.error));
    },
    GetEventIntent: function () {
        logger.log(logger.logType.INFO, 'Entered GetEventIntent');

        try{
            service.getNextEvent()
                .then(eventModel => {
                    logger.log(logger.logType.INFO, 'Returned event from service');

                    this.emit(':tell', responder.respond(responseType.event, eventModel));
                })
                .catch((err) => {
                    logger.log(logger.logType.ERR, 'Error in GetEventIntent');
                    logger.log(logger.logType.ERR, err);

                    this.emit(':tell', responder.respond(responseType.error));
                });
        }
        catch (err) {
            logger.log(logger.logType.ERR, 'Error in GetEventIntent');
            logger.log(logger.logType.ERR, err);

            this.emit(':tell', responder.respond(responseType.error));
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