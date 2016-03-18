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
Projectile.prototype.move = function (context) {

};
