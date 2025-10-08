const http = require("http");

const URL_TEMPLATE = "http://%1";

class App {
    static DEFINITION_ROUTE = "/v1/definitions";
    static DEFINITION_PARAM = "word";

    constructor() {
        this.port = process.env.PORT || 8000;
        this.server = http.createServer((req, res) => {
            const req_url = new URL(req.url,
                URL_TEMPLATE.replace("%1", req.headers.host)
            );
        
            switch (req.method) {
                case "GET":
                    if(req_url.pathname.includes(App.DEFINITION_ROUTE)) {
                        const word = req_url.searchParams.get(App.DEFINITION_PARAM);
                    } else {
                        // TODO: Send error message.
                    }
                    break;
                case "POST":
                    if(req_url.pathname.includes(App.DEFINITION_ROUTE)) {
                        // TODO: Get word from body param.
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