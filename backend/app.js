const http = require("http");
const { Response } = require("./modules/response.js");
const { MSGS, WORD_NOT_FOUND_ERR_KEY } = require("./lang/messages/en/user.js");

const URL_TEMPLATE = "http://%1";

class App {
    static DEFINITION_ROUTE = "/v1/definitions";
    static DEFINITION_PARAM = "word";

    constructor() {
        this.dictionary = {};
        this.req_num = 0;
        this.last_updated = new Date().toLocaleString();

        this.port = process.env.PORT || 8000;
        this.server = http.createServer((req, res) => {
            const req_url = new URL(req.url,
                URL_TEMPLATE.replace("%1", req.headers.host)
            );
        
            switch (req.method) {
                case "GET":
                    if(req_url.pathname.includes(App.DEFINITION_ROUTE)) {
                        const word = req_url.searchParams.get(App.DEFINITION_PARAM);
                        const data = this.processGetDefinition(word);
                        if (data) {
                            Response.successRes(res, data);
                        } else {
                            Response.notFoundError(res, MSGS[WORD_NOT_FOUND_ERR_KEY]);
                        }
                    } else {
                        Response.notFoundError(res)
                    }
                    break;
                case "POST":
                    if(req_url.pathname.includes(App.DEFINITION_ROUTE)) {
                        // TODO: send POST req confirmation
                    } else {
                        // TODO: Send error message.
                    }
                    break;
                default:
                    // TODO: Send error message.
                    break;
            }
        })
    }

    processGetDefinition(word) {
        if (word in this.dictionary) {
            return { 
                word: word,
                definition: this.dictionary[word] 
            }
        }
    }

    processPostDefinition(word) {

    }

    start() {
        this.server.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

const app = new App();
app.start();