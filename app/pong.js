/**
 * Created by Robin on 3/15/2016.
 */

var Pong = function (canvas) {
    this.canvas = canvas;
    this.players = [];
    this.projectile = null;
    this.nextId = -1;
};

Pong.prototype.addPlayer = function (player) {
    player.gameID = ++this.nextId;
    if (player.gameID === 0) {
        player.position.x = 0;
    } else if (player.gameID === 1) {
        player.position.x = this.canvas.width - player.size.width;
    }
    this.players.push(player);
};

Pong.prototype.removePlayer = function (player) {
    this.players = this.players.filter(function (p) {
        return p.gameID !== player.gameID;
    });
};

Pong.prototype.draw = function () {
    // TODO clear canvas
    //console.log("Drawing...");
    console.log("Players: ", this.players);
    var ctx = this.canvas.getContext("2d");
    for (var i = 0; i < this.players.length; i++) {
        //console.log(this.players[i]);
        this.players[i].draw(ctx);
    }
    this.projectile.draw(ctx);
};