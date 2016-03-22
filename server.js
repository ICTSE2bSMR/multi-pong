/**
 * Created by Robin on 3/15/2016.
 */

var http = require('http'),
    socket = require('socket.io'),
    fileSystem = require('fs'),
    path = require('path'),
    server = http.createServer(requestListener);

server.listen(8000);
console.log("Listening on port 8000");

function requestListener(request, response) {
    switch(request.method) {
        case "GET":
            urlRequest(request.url, response);
            break;
    }
}

function urlRequest(url, response) {
    var filePath = "";
    switch(url) {
        case "/":
        case "/index":
        case "/index.html":
            filePath = "app/index.html";
            break;
        default:
            filePath = "app" + url;
            break;
    }

    fileSystem.exists(filePath, function(exists) {
        if(exists) {
            fileSystem.readFile(filePath, function(error, content) {
                if(error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    var ext = url.split(".")[1];
                    if(ext !== undefined) {
                        response.writeHead(200, {"Content-Type": "text/" + ext});
                    } else {
                        response.writeHead(200, {"Content-Type": "text/html"});
                    }
                    response.end(content, "utf-8");
                }
            });
        } else {
            response.writeHead(404);
            response.end();
        }
    });
}

var ios = socket.listen(server);
var game = null;

ios.sockets.on("connection", function(socket) {

    socket.on("disconnecting", function(data) {
        game = data;
        // console.log(game);
        socket.broadcast.emit("servermessage", game);
    });

    socket.on("disconnect", function() {
        console.log("Player disconnected: ", socket.id);
    });

    socket.on("clientmessage", function(data) {
        // console.log(socket.id, ": ", data);
        console.log("Received message from: " , socket.id);
        game = data;
        socket.broadcast.emit("servermessage", data);
    });

    socket.on("newplayer", function() {
        console.log("Player connected: ", socket.id);
        if(ios.sockets.connected[socket.id]) {
            console.log("sending info to new player...");
            ios.sockets.connected[socket.id].emit('servernewplayer', game);
        }
    });
});