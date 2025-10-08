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
            // TODO: User facing message.
            data: err_msg || "Bad request."
        }
    }

    static notFoundError(err_msg) {
        return {
            status: "error",
            code: 404,
            // TODO: User facing message.
            data: err_msg || "Resource or page not found."
        }
    }
}