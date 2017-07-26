/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const _ = require('lodash/collection');
const moment = require('moment');
const repo = require('./repository');
const logger = require('./logger');


const getEvent = (dataSource, compareDate) => _.sortBy(dataSource, e => moment(e.date)).find(e => compareDate.isSameOrBefore(e.date));

module.exports = {
    getNextEvent: function (currentDate)  {
        logger.log(logger.logType.INFO, 'getNextEvent');
        const compareDate = currentDate || moment();

        return new Promise((resolve, reject) => {
            logger.log(logger.logType.INFO, 'getNextEvent - from repo');
            repo.get('events')
                .then(eventData => {
                    logger.log(logger.logType.INFO, 'getNextEvent - resolving data');
                    resolve(getEvent(eventData, compareDate));
                })
                .catch(err => {
                    logger.log(logger.logType.ERR, 'getNextEvent - Error');
                    reject(err);
                });
        });
    },
    getEventDetail: function ()  {
        const self = this;
        return new Promise((resolve, reject) => {
            self.getNextEvent()
                .then(evt => resolve(evt.details))
                .catch(err => reject(err));
        });
    }
};