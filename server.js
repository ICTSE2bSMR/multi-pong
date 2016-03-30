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
    switch (request.method) {
        case "GET":
            urlRequest(request.url, response);
            break;
        case "POST":
            joinRoom(request, response);
            break;
    }
}

function joinRoom(request, response) {
    request.on("data", function (data) {
        var roomNr = data.toString().split('=')[1];
        if (game[roomNr] == null || game[roomNr].player2 === undefined) {
            console.log(game[roomNr]);
            urlRequest("/", response);
        }
    });
}

function urlRequest(url, response) {
    var filePath = "";
    switch (url) {
        case "/":
        case "/index":
        case "/index.html":
            filePath = "app/index.html";
            break;
        default:
            filePath = "app" + url;
            break;
    }

    fileSystem.exists(filePath, function (exists) {
        if (exists) {
            fileSystem.readFile(filePath, function (error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                } else {
                    var ext = url.split(".")[1];
                    if (ext !== undefined) {
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
var game = {
    0: null,
    1: null,
    2: null
};

ios.sockets.on("connection", function (socket) {

    socket.send(socket.id);

    socket.on("disconnecting", function (data) {
        if (game.player1 === null && game.player2 === null)
            game = null;
        socket.broadcast.emit("playerdisconnectmessage", data);
    });

    socket.on("clientmessage", function (data) {
        // console.log(data);
        game[data.roomNumber] = data;
        socket.broadcast.emit("servermessage", data);
    });

    socket.on("clientupdate", function (data) {
        var targetRoom = game[data.roomNumber],
            updatedPlayer;

        if (targetRoom.game.player1 !== undefined && targetRoom.game.player1.id === data.player.id)
            updatedPlayer = targetRoom.game.player1;
        else if (targetRoom.game.player2 !== undefined && targetRoom.game.player2.id === data.player.id)
            updatedPlayer = targetRoom.game.player2;

        updatedPlayer.position = data.player.position;
        socket.broadcast.emit("updatemessage", {"roomNumber": data.roomNumber, "game": targetRoom});
    });

    socket.on("ballupdate", function (data) {
        // console.log(data.position);
        // game[data.roomNumber]
        game[data.roomNumber].game.projectile.x = data.projectile.x;
        game[data.roomNumber].game.projectile.y = data.projectile.y;
        socket.broadcast.emit("ballupdatemessage", data);
    });

    socket.on("newplayer", function (data) {
        // console.log("Player connected: ", socket.id);
        if (ios.sockets.connected[socket.id]) {
            console.log("New player wants to join room nr: ", data);
            console.log("sending info to new player...");
            ios.sockets.connected[socket.id].emit("servernewplayer", {"id": socket.id, "game": game[data]});
        }
    });

});