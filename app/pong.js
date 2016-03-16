/**
 * Created by Robin on 3/15/2016.
 */

var Pong = function() {
    this.players = [];
    this.projectile = null;
    this.nextId = -1;
};

Pong.prototype.addPlayer = function(player) {
    player.gameID = ++this.nextId;
    this.players.push(player);
};

Pong.prototype.removePlayer = function(player) {
    this.players = this.players.filter(function(p) {
        return p.gameID !== player.gameID;
    });
};

Pong.prototype.draw = function(canvas) {
    // TODO clear canvas
    for(var i = 0; i < this.players.length; i++)
        this.players[i].draw(canvas);

    this.projectile.draw(canvas);
};