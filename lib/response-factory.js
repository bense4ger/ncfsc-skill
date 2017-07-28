"use strict";
const moment = require('moment');
const Speech = require('ssml-builder');
const templates = require('./messages');

//TODO: Break individual response categories into their own modules
//TODO: Less of the hardcoding of string already.  Pop them in Dynamo or something!

const infoResponse = () => new Speech()
    .say(`Norwich City Fans Social is open to everyone who is a fan of Norwich City Football Club whether you are a season ticket holder, a member,  
    someone who attends the occasional home or away game or a faraway fan who listens via the web in the middle of the night!`)
    .pause('250ms')
    .say('for more information, please visit our website www.ncfsc.co.uk');


const eventReponse = {
    emptyEvent: () => new Speech().say('There are no upcoming events.  Check back later, and keep an eye on the social club website'),
    confirmedEvent: (model) => new Speech()
        .say('The next event is')
        .say(model.name)
        .say('which is on')
        .sayAs({ word: model.date, interpret: 'date' })
        .say('at').say(`${model.time}.`)
        .pause('250ms')
        .say('It is being held at')
        .say(model.location),
    unconfirmedEvent: (model) => new Speech()
        .say('The next event is')
        .say(model.name)
        .say('which is pencilled in for')
        .say(`${model.vagueDate}.`)
        .say('More details will be available soon')
};

module.exports = {
    responseType: {
        info: 0,
        event: 1,
        error: 99
    },
    createResponse(type, model) {
        //TODO: Replace switch with object key access
        switch (type) {
            case 0:
                return infoResponse();
            case 1:
                if (!Object.keys(model).length) return eventReponse.emptyEvent();

                if (model.isConfirmed) {
                    return eventReponse.confirmedEvent(model);
                }
                else {
                    return eventReponse.unconfirmedEvent(model);
                }
            case 99:
                return new Speech()
                    .say('I\'m sorry.  Something has gone wrong.  Please try again later.  If this problem persists, please let')
                    .sayAs({ word: 'NCFSC', interpret: 'characters'})
                    .say('know via Twitter, Facebook or Email.');
            default:
                break;
        }
    }
};