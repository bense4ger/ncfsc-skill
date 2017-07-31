"use strict";
const moment = require('moment');
const Speech = require('ssml-builder');
const templates = require('./messages');

//TODO: Break individual response categories into their own modules
//TODO: Less of the hardcoding of strings already.  Pop them in Dynamo or something!

const infoResponse = () => new Speech()
    .say(`Norwich City Fans Social Club is open to everyone who is a fan of Norwich City Football Club; whether you are a season ticket holder, a member,  
    someone who attends the occasional home or away game or a faraway fan who listens via the web in the middle of the night!`)
    .pause('250ms')
    .say('A team of volunteers organise events throughout the season aimed at getting fans together and bringing them closer to the club.')
    .pause('250ms')
    .say('Additionally the social club raises funds for the Community Sports Foundation')
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

const membershipResponse = () => new Speech()
    .say('There is no membership as such.  You don\'t join, you just join in!')
    .pause('250ms')
    .say('Some events carry an entrance fee, and these are advertised in advance. Typically they are around £3');

module.exports = {
    responseType: {
        info: 0,
        event: 1,
        membership: 2,
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
            case 2:
                return membershipResponse();
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