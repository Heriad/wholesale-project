const responseStatus = require('../models/responseModel');

function responseController(success, data, message) {
    this.success = success;
    this.data = data;
    this.message = message;
}

module.exports.createResponseController = function (status, data, message) {
    if (!data) {
        data = {};
    }
    if (!message) {
        message = "No message";
    }
    switch(status) {
        case responseStatus.SUCCESS:
            return new responseController(true, data, message);
        case responseStatus.INVALID:
            return new responseController(false, data, message);
        case responseStatus.ERROR:
        default:
            return new responseController(false, data, message);
    }
}