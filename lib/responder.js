"use strict";
const createResponse = require('./response-factory').createResponse;

module.exports = {
    respond(type, model){
        const response = createResponse(type, model);
        return response.ssml(true);
    }
};