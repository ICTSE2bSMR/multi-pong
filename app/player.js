/**
 * Created by Robin on 3/15/2016.
 */

var Player = function(name, side, position, shape) {
    this.gameID = null;
    this.name = name;
    this.side = side;
    this.shape = shape;
    // position could look like: [{'x': 50, 'y' 100}] depending on the shape
    this.position = position;
};
