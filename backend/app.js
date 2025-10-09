const http = require("http");
const { Response } = require("./modules/response.js");
const { MSGS, WORD_NOT_FOUND_ERR_KEY, WORD_IN_DICT_WARN_KEY, NO_WORD_PARAM_ERR_KEY, NO_WORD_DEF_PARAM_ERR_KEY } = require("./lang/messages/en/user.js");

const URL_TEMPLATE = "http://%1";

class App {
    static DEFINITION_ROUTE = "/v1/definitions";
    static DEFINITION_PARAM = "word";

    constructor() {
        this.dictionary = {};
        this.req_num = 0;
        this.words_num = 0;
        this.last_updated = new Date().toLocaleString();

        this.port = process.env.PORT || 8000;
        this.server = http.createServer((req, res) => {

            // CORS MISSING ALLOW ORIGIN
            res.setHeader("Access-Control-Allow-Origin", "*"); // allow all origins
            res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
            res.setHeader("Access-Control-Allow-Headers", "Content-Type");

            const req_url = new URL(req.url,
                URL_TEMPLATE.replace("%1", req.headers.host)
            );

            // handle preflight OPTIONS request
            if (req.method === "OPTIONS") {
                res.writeHead(204); // No Content
                res.end();
                return;
            }

            switch (req.method) {
                case "GET":
                    if (req_url.pathname.includes(App.DEFINITION_ROUTE)) {
                        const word = req_url.searchParams.get(App.DEFINITION_PARAM);
                        if (!word) {
                            Response.badReqError(res, MSGS[NO_WORD_PARAM_ERR_KEY]);
                            break;
                        }

                        const data = this.processGetDefinition(word);
                        if (data) {
                            Response.successRes(res, data);
                        } else {
                            Response.notFoundError(res, MSGS[WORD_NOT_FOUND_ERR_KEY]);
                        }
                    } else {
                        Response.notFoundError(res);
                    }
                    break;
                case "POST":
                    this.handlePOST(req_url, req, res);
                    break;
                default:
                    Response.notFoundError(res);
                    break;
            }
        })
    }

    handlePOST(req_url, req, res) {
        if (req_url.pathname.includes(App.DEFINITION_ROUTE)) {
            let body_str = "";
            req.on("data", chunk => { body_str += chunk; });
            req.on("end", () => {
                try {
                    const body = JSON.parse(body_str);
                    const data = this.processPostDefinition(body.word, body.definition);

                    if (data) {
                        if (data.warning) Response.successRes(res, data);
                        else Response.createdRes(res, data);
                    } else {
                        Response.badReqError(res, MSGS[NO_WORD_DEF_PARAM_ERR_KEY]);
                    }
                } catch (err) {
                    Response.badReqError(res);
                }
            });
        } else {
            Response.notFoundError(res);
        }
    }

    processGetDefinition(word) {
        if (word in this.dictionary) {
            return {
                word: word,
                definition: this.dictionary[word]
            }
        }
    }

    processPostDefinition(word, definition) {
        if (!word || !definition) return;

        const data = {};
        if (word in this.dictionary) {
            data.warning = MSGS[WORD_IN_DICT_WARN_KEY];
        } else {
            this.words_num++;
            this.last_updated = new Date().toLocaleString();
            this.dictionary[word] = definition;
        }

        data.req_num = ++this.req_num;
        data.words_num = this.words_num;
        data.last_updated = this.last_updated;
        data.word = word;
        data.definition = definition;
        return data;
    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

const app = new App();
app.start();