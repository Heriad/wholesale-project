import responseStatus from '../models/responseModel';

function responseController(message, data, success) {
    this.message = message;
    this.data = data;
    this.success = success;
}

export function createResponseController(message, data, status) {
    if (!message) {
        message = "No message"
    }
    if (!data) {
        data = {}
    }
    switch(status) {
        case responseStatus.SUCCESS:
            return new responseController(message, data, true);
        case responseStatus.INVALID:
            return new responseController(message, data, false);
        case responseStatus.ERROR:
        default:
            return new responseController(message, data, false);
    }
}