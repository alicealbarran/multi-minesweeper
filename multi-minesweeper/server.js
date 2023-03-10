const http = require("http");
const WebSocketServer = require("websocket").server


const host = 'localhost';
const port = 8118;

const clients = {};

const httpserver = http.createServer(function (request, response) {
    console.log("Recieved request");
});

httpserver.listen(port, function () { console.log("Server is listening on port " + port) });



const websocket = new WebSocketServer({
    httpServer: httpserver
});


websocket.on('request', function (request) {
    const connection = request.accept(null, request.orgin);
    connection.on("open", () => console.log("opened!"))
    connection.on("close", () => console.log("closed!"))
    connection.on("message", function (message) {
        const messageContents = JSON.parse(message.utf8Data)
        console.log("recieved message");

        if (messageContents.method === "newGame") {
            console.log("recieved request to make a new game");
        }
    })


    const clientId = guid();
    clients[clientId] = {
        "connection": connection
    }

    const payLoad = {
        "method": "connect",
        "clientId": clientId
    }

    connection.send(JSON.stringify(payLoad));
})








function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

// then to call it, plus stitch in '4' in the third group
const guid = () => (S4() + S4() + "-" + S4() + "-4" + S4().substr(0, 3) + "-" + S4() + "-" + S4() + S4() + S4()).toLowerCase();