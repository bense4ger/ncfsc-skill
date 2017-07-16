/**
 * Created by benseager on 16/07/2017.
 */
"use strict";
const _ = require('lodash/collection');
const moment = require('moment');
const repo = require('./repository');

const cache = {};

const getEvent = (dataSource, compareDate) => _.sortBy(dataSource, e => moment(e.date)).find(e => compareDate.isSameOrBefore(e.date));

module.exports = {
    getNextEvent: function (currentDate)  {
        const compareDate = currentDate || moment();

        return new Promise((resolve, reject) => {
            if (cache.events !== undefined) {
                resolve(getEvent(cache.events, compareDate));
            }
            else {
                repo.get('events')
                    .then(eventData => {
                        cache['events'] = eventData;
                        resolve(getEvent(cache.events, compareDate));
                    })
                    .catch(err => reject(err));
            }
        });
    },
    getEventDetail: function ()  {
        const self = this;
        return new Promise((resolve, reject) => {
            if (cache.events !== undefined) {
                resolve(getEvent(cache.events, moment()).details);
            }
            else {
                self.getNextEvent()
                    .then(evt => resolve(evt.details))
                    .catch(err => reject(err));
            }

        });
    }
};