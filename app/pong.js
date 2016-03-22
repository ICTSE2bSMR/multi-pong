/**
 * Created by Robin on 3/15/2016.
 */

var MAX_PLAYERS = 2;

/**
 *
 * @param {Element} canvas              The game its canvas.
 * @returns {Pong}
 * @constructor
 */
var Pong = function (canvas) {
    this.canvas = canvas;
    this.players = [];
    this.projectile = null;
    this.nextId = -1;

    return this; // Used for method chaining.
};

/**
 * Adds a player to this instance of the Pong game. It gives the player a gameID and
 * sets its position.x to either the left side of the canvas, of the right.
 *
 * @param {Object} player               The player to add.
 * @returns {*}
 */
Pong.prototype.addPlayer = function (player) {

    if (this.players.length >= MAX_PLAYERS)
        return false;

    player.gameID = ++this.nextId;

    if (player.gameID === 0) {
        player.position.x = 0;
    } else {
        player.position.x = this.canvas.width - player.size.width;
    }
    this.players.push(player);

    return this; // Used for method chaining, e.g. pong.addPlayer(player1).addPlayer(player2);
};

/**
 * Removes the given player from the current game.
 *
 * @param {Object} player               The player to remove.
 * @returns {Pong}
 */
Pong.prototype.removePlayer = function (player) {
    this.players = this.players.filter(function (p) {
        return p.gameID !== player.gameID;
    });

    return this;
};

/**
 * Calls the drawing methods from the game objects (players and projectile).
 */
Pong.prototype.draw = function () {
    // TODO clear canvas
    //console.log("Drawing...");
    // console.log("Players: ", this.players);
    var ctx = this.canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < this.players.length; i++) {
        //console.log(this.players[i]);
        this.players[i].draw(ctx);
    }
    this.projectile.draw(ctx);
};

/**
 * Starts the gameloop.
 */
Pong.prototype.start = function() {
    requestAnimationFrame(function() {
        this.update(this.canvas.getContext("2d"));
    });
};

/**
 * Updates the game.
 *
 * @param {Object} context
 * @author Sander
 */
Pong.prototype.update = function(context) {

    context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for(var i = 0; i < this.players.length; i++) {
        this.players[i].update();
    }
    this.projectile.move(this.canvas, this.players);
    this.draw();

    requestAnimationFrame(function() {
        this.update(context);
    });
};

Pong.prototype.contains = function(id) {
    for(var i = 0; i < this.players.length; i++) {
        console.log(this.players);
        if(id === this.players[i].gameID)
            return true;
    }
    return false;
};