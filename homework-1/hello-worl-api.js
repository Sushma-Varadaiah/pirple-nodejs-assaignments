/*
Code for  Hello World RESTful JSON API that listens on a port 3000 and return a welcome message.
*/

//dependency
const http = require("http");

//creating a server
const server = http.createServer(function (req, res) {
    //get the url request from user and trim the url
    const url = req.url;
    const trimmedPath = url.replace(/^\/+|\/+$/g, "");

    //choose the handler based on the user request
    const chosenHandler = typeof (routes[trimmedPath]) !== "undefined" ? routes[trimmedPath] : handlers.notFound;

    //call the appropriate handler
    chosenHandler(function (status, msg) {
        const statusCode = typeof (status) === "number" ? status : 204;
        const msgs = typeof (msg) === "object" ? msg : {};

        res.setHeader("Content-Type", "application/json");
        res.writeHead(statusCode);
        res.end(JSON.stringify(msgs));
    });

});

//server is liestning on port 3000
server.listen(3000, function () {
    console.log("Server running on port 3000")
});

//define handlers object
const handlers = {};

//define handler to handle /hello api request
handlers.hello = function (callback) {
    callback(200, {
        message: "Welcome!"
    });
}

//define handler to handle /notFound api request
handlers.notFound = function (callback) {
    callback(404, {
        message: "Sorry!Not found!"
    });
}

//define routes
const routes = {
    "hello": handlers.hello,
};
