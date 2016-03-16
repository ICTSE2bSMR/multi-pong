/**
 * Created by Robin on 3/16/2016.
 */

var Projectile = function(radius, speed, startPosition) {
    this.radius = radius;
    this.speed = speed;
    this.position = startPosition;
};

Projectile.prototype.getWidthHeight = function() {
    return this.radius*2;
};

Projectile.prototype.draw = function(canvas) {
    //TODO drawing logic here
};