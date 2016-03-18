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
var Player = function(name, side, position, size, shape, color) {
    this.gameID = null;
    this.name = name;
    this.side = side;
    this.shape = shape;
    this.size = size;
    this.position = position;
    this.color = color;
};

/**
 * Draws the player on the given canvas context.
 *
 * @param {Object} context
 */
Player.prototype.draw = function(context) {
    // TODO drawing logic here
    //console.log("Drawing player ", this.gameID, " width: ", this.size["width"]);
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
};

/**
 * Reviver function to create a new Player from the given Json.
 * 
 * @param {Object} json
 * @returns {Player}
 */
Player.revive = function(json){
    var newPlayer = new Player(json.name, json.side, json.position, json.size, json.shape, json.color);
    newPlayer.gameID = json.gameID;
    return newPlayer;
};