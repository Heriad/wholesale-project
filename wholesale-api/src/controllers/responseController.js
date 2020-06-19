import responseStatus from '../models/responseModel';

class ResponseController {
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}

export function createResponseController(status, message, data) {
    if (!message) {
        message = "No message";
    }
    if (!data) {
        data = {};
    }
    switch(status) {
        case responseStatus.SUCCESS:
            return new ResponseController(true, message, data);
        case responseStatus.INVALID:
            return new ResponseController(false, message, data);
        case responseStatus.ERROR:
        default:
            return new ResponseController(false, message, data);
    }
}