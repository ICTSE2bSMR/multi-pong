/**
 * Created by Robin on 3/15/2016.
 */

/**
 *
 * @param {string} name
 * @param {string} side
 *
 * @param {Object} position             Position of the player.
 * @param {number} position.x
 * @param {number} position.y
 *
 * @param {Object} size                 Size of the player
 * @param {number} size.width
 * @param {number} size.height
 *
 * @param {string} shape
 * @param {string} color                Color of the player, e.g. "#FF0000" or "red".
 *
 * @constructor
 */
var Player = function (position, size, color, speed) {
    this.id = null;
    this.size = size;
    this.position = position;
    this.color = color;
    this.speed = speed;
    this.score = 0;
    this.ready = false;
};

/**
 * Draws the player on the given canvas context.
 *
 * @param {Object} context
 */
Player.prototype.draw = function (context) {
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
};

/**
 * Reviver function to create a new Player from the given Json.
 *
 * @param {Object} json
 * @returns {Player}
 */
Player.revive = function (json) {
    var newPlayer = new Player(json.position, json.size, json.color, json.speed);
    newPlayer.id = json.id;
    return newPlayer;
};

/**
 * @author Sander
 * @param {number} y
 * @param {Object} canvas
 */
Player.prototype.move = function (y, canvas) {
    this.position.y += y;
    this.speed = y;
    if (this.position.y < 0) {
        this.position.y = 0;
        this.speed = 0;
    } else if (this.position.y + this.size.height > canvas.height) {
        this.position.y = canvas.height - this.size.height;
        this.speed = 0;
    }
};

var keysDown = {};

window.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
});

/**
 * @author Sander
 */
Player.prototype.update = function (canvas, room, socket) {
    var oldY = this.position.y;
    var oldReady = this.ready;
//Keycode 40 = the arrowdown key, if it is pressed the player, obviously, will move down.
    //There is also a check to prevent the player from leaving the playing field.
    // console.log("Update... Keys -> ", keysDown);
    // console.log("Y: ", this.position.y);
    for (var key in keysDown) {
        var value = Number(key);
        if (value === 40) {
            this.move(7, canvas);
            //Keycode 38 = the arrowup key, if it is pressed the player, obviously, will move up.
        } else if (value === 38) {
            this.move(-7, canvas);
        } else if (value === 32) {
            this.ready = true;
        } else {
            this.move(0, canvas);
        }
    }

    // console.log(oldReady, this.ready);
    if (this.position.y !== oldY || this.ready !== oldReady) {
        socket.emit("playerupdate", {"roomNumber": room, "player": this});
    }
};