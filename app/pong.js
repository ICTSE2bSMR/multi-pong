/**
 * Created by Robin on 3/15/2016.
 */

var Pong = function() {
    this.players = [];
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