/**
 * Created by Robin on 3/16/2016.
 */

/**
 *
 * @param {number} radius               The radius of the projectile.
 *
 * @param {Object} speed                The speed of the projectile.
 * @param {number} speed.dx
 * @param {number} speed.dy
 *
 * @param {Object} startPosition        Starting position.
 * @param {number} startPosition.x
 * @param {number} startPosition.y
 *
 * @constructor
 */
var Projectile = function (radius, speed, startPosition) {
    this.radius = radius;
    this.speed = speed;
    this.position = startPosition;
};
/**
 * This method simply returns radius*2, you could use this to get the width or height
 * of the projectile.
 *
 * @returns {number} Width or Height
 */
Projectile.prototype.getWidthHeight = function () {
    return this.radius * 2;
};

/**
 * Draws the projectile on the given canvas context.
 *
 * @param {Object} context              The context derived from the canvas.
 */
Projectile.prototype.draw = function (context) {
    //TODO drawing logic here
    context.fillStyle = "#000000";
    context.fillRect(this.position.x, this.position.y, this.radius * 2, this.radius * 2);
};

/**
 * Reviver function to create a new Projectile from the given Json.
 *
 * @param {Object} json
 * @returns {Projectile}
 */
Projectile.revive = function (json) {
    return new Projectile(json.radius, json.speed, json.position);
};

Projectile.prototype.move = function (canvas, players) {
    this.position.x += this.speed.dx;
    this.position.y += this.speed.dy;

    if (this.position.y <= 0) {
        this.position.y = 0;
        // leave current_y symmentrical
        this.position.y -= this.speed.dy;
        this.speed.dy *= -1;
    } else if (this.position.y >= canvas.height) {
        this.position.y = canvas.height;
        // leave current_y symmentrical
        this.position.y -= this.getWidthHeight();
        this.speed.dy *= -1;
    }


    if ((this.position.x >= (canvas.width - players[1].size.width + 5)) && (this.position.y >= players[1].position.y) && (this.position.y <= players[1].position.y + players[1].size.height)) {
        this.position.x = (canvas.width - players[1].size.width - this.speed.dx);
        this.speed.dx *= -1;
        this.ballDirection(players[1]);
    } else if ((this.position.x <= (players[0].size.width - 5)) && (this.position.y >= players[0].position.y) && (this.position.y <= (players[0].position.y + players[0].size.height))) {
        this.position.x = (players[0].size.width) - this.speed.dx;
        this.speed.dx *= -1;
        this.ballDirection(players[0]);
    }

    this.draw(canvas.getContext("2d"));
//    if (this.position.x > canvas.width || this.position.x < 0) {
//        var player_won = (this.position.x > canvas.width) ? 1 : 2;
//        window.player_id_having_the_ball = (player_won == 1) ? 2 : 1;
//        finish_round(player_won);
//        socket.json.emit("end_of_the_round", {player_won: player_won, room_id: window.room_id});
//    }

};

Projectile.prototype.ballDirection = function (player) {
    if (this.position.y < player.position.y + player.size.height / 2) {
        if (this.speed.dy > 0) {
            this.speed.dy *= -1;
        }
    } else if (this.position.y > player.position.y + player.size.height / 2) {
        if (this.speed.dy < 0) {
            this.speed.dy *= -1;
        }

    }
};
