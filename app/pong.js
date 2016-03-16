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
    console.log("Drawing...");
    var ctx = canvas.getContext("2d");
    for(var i = 0; i < this.players.length; i++) {
        console.log(this.players[i]);
        this.players[i].draw(ctx);
    }

    this.projectile.draw(ctx);
};