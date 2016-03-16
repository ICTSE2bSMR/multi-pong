/**
 * Created by Robin on 3/15/2016.
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

Player.prototype.draw = function(context) {
    // TODO drawing logic here
    console.log("Drawing player ", this.gameID, " width: ", this.size["width"]);
    context.fillStyle = this.color;
    context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
};
