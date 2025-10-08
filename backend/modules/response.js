const { MSGS, DEFAULT_BAD_REQ_ERR_KEY, DEFAULT_NOT_FOUND_ERR_KEY } = require("../lang/messages/en/user.js")

exports.Response = class Response {
    
    static RES_CONTENT_TYPE = "application/json";
    
    static sendResponse(res, code, data) {
        res.writeHead(code, { "Content-Type": this.RES_CONTENT_TYPE });
        res.end(data);
    } 

    static successRes(res, data, code) {
        const res_data = {
            status: "success",
            code: code || 200,
            data: data
        };
        this.sendResponse(res, res_data, code);
    }

    static createdRes(res, data) {
        this.sendResponse(res, data, 201);
    }

    static errorRes(res, err_msg, err_code) {
        const res_data = {
            status: "error",
            code: err_code || 400,
            data: err_msg
        };
        this.sendResponse(res, res_data, res_data.code);
    }

    static badReqError(res, err_msg) {
        this.errorRes(
            res,
            err_msg || err_msg || MSGS[DEFAULT_BAD_REQ_ERR_KEY],
            402
        );
    }
    
    static notFoundError(res, err_msg) {
        this.errorRes(
            res,
            err_msg || err_msg || MSGS[DEFAULT_NOT_FOUND_ERR_KEY],
            404
        );
    }
}