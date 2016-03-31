/**
 * Created by Robin on 3/15/2016.
 */

var http = require('http'),
    socket = require('socket.io'),
    fileSystem = require('fs'),
    path = require('path'),
    server = http.createServer(requestListener),
    port = process.env.PORT || 8000;

server.listen(port);
console.log("Listening on port", port);

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
            // console.log(game[roomNr]);
            urlRequest("/", response);
        }
    });
}

function urlRequest(url, response) {
    var filePath = __dirname;
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

function sendToOtherPlayer(sender, updateType, objectToSend, roomNumber, socket) {
    // console.log("Sender: ", sender, " UpdateType: ", updateType, " Current game: ", game);
    // console.log(objectToSend);
    if(game[roomNumber] !== null) {
        var receiverId = (game[roomNumber].player1 !== undefined && game[roomNumber].player1 !== null &&
        game[roomNumber].player1.id !== sender)             // Check if the sender is not player1
            ? game[roomNumber].player1.id                                       // if so, the receiver is player1.
            : ((game[roomNumber].player2 !== undefined)                         // Else, if player2 is not undefined
            ? game[roomNumber].player2.id                                       // the receiver is player2
            : undefined);                                                       // if player2 is undefined, set var to undefined

        if (receiverId !== undefined)                                           // If the receiver is undefined, we don't have to send an update
            socket.broadcast.to(receiverId).emit(updateType, objectToSend);
    }
}

ios.sockets.on("connection", function (socket) {

    socket.send(socket.id);

    socket.on("disconnecting", function (data) {
        var room = game[data.roomNumber];
        if (data.player.id === room.player1.id)
            room.player1 = undefined;
        else if (data.player.id === room.player2.id)
            room.player2 = undefined;

        // console.log(room);
        if(room.player1 === undefined && room.player2 === undefined)
            game[data.roomNumber] = null;
        sendToOtherPlayer(socket.id, "playerdisconnectmessage", room, data.roomNumber, socket);
        // socket.broadcast.emit("playerdisconnectmessage", data);
    });

    socket.on("clientmessage", function (data) {
        // console.log(data);
        game[data.roomNumber] = data.instance;
        sendToOtherPlayer(socket.id, "servermessage", data, data.roomNumber, socket);
        // socket.broadcast.emit("servermessage", data);
    });

    socket.on("playerupdate", function (data) {
        var targetRoom = game[data.roomNumber],
            updatedPlayer;
        if(targetRoom !== null) {
            if (targetRoom.player1 !== undefined && targetRoom.player1.id === data.player.id)
                updatedPlayer = targetRoom.player1;
            else if (targetRoom.player2 !== undefined && targetRoom.player2.id === data.player.id)
                updatedPlayer = targetRoom.player2;

            // console.log(data);
            if (updatedPlayer !== undefined) {
                updatedPlayer.position = data.player.position;
                sendToOtherPlayer(data.player.id, "playerupdatemessage", targetRoom, data.roomNumber, socket);
            }
        }
        // console.log(data);

        // socket.broadcast.emit("updatemessage", {"roomNumber": data.roomNumber, "instance": targetRoom});
    });

    socket.on("ballupdate", function (data) {
        // console.log(data.position);
        // game[data.roomNumber]
        // console.log(game);
        if (game[data.roomNumber] !== null && game[data.roomNumber].projectile !== undefined && game[data.roomNumber].projectile.x !== undefined && game[data.roomNumber].projectile.y !== undefined) {
            game[data.roomNumber].projectile.x = data.projectile.x;
            game[data.roomNumber].projectile.y = data.projectile.y;
        }
        sendToOtherPlayer(socket.id, "ballupdatemessage", data, data.roomNumber, socket);
    });

    socket.on("newplayer", function (data) {
        // console.log("Player connected: ", socket.id);
        if (ios.sockets.connected[socket.id]) {
            if(game[data] === null || (game[data].player1 === undefined || game[data].player2 === undefined)) {
                console.log("New player wants to join room nr: ", data);
                console.log("sending info to new player...");

                ios.sockets.connected[socket.id].emit("servernewplayer", {"id": socket.id, "instance": game[data]});
            }
        }
    });

});