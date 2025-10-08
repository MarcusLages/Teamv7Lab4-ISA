const { MSGS, DEFAULT_BAD_REQ_ERR_KEY, DEFAULT_NOT_FOUND_ERR_KEY } = require("../lang/messages/en/user.js")

exports.Response = class Response {
    static successRes(data, code) {
        return {
            status: "success",
            code: code || 200,
            data: data
        }
    }

    static errorRes(err_msg, err_code) {
        return {
            status: "error",
            code: err_code || 400,
            data: err_msg
        }
    }

    static badReqError(err_msg) {
        return {
            status: "error",
            code: 402,
            data: err_msg || MSGS[DEFAULT_BAD_REQ_ERR_KEY]
        }
    }

    static notFoundError(err_msg) {
        return {
            status: "error",
            code: 404,
            data: err_msg || MSGS[DEFAULT_NOT_FOUND_ERR_KEY]
        }
    }
}