
var gamestate = "splash";
        window.addEventListener('keydown', this.doKeyDown, false);
        var menuHTML = "<div id='splash'><span id='header'>Multiplayer - Pong</span><br><ul class='menu_list'><li class='selected' id='play'>Play</li><li id='settings'>Settings</li><li id='testtabel'>Test Tabel</li></ul></div>";
        var lobbyHTML = "<div><span id='header'>lobbies</span><br><div id='lobby_div'><ul id='lobbies'><li class='lobby'>Naam:<br>Aantal spelers:<br>Toeganslichtje<br></li></ul></div><div id='lobcreate'><button onClick='newLobby()'>New Lobby</button></div></div>";
        var testHTML = "<div><table class='testTabel'><tr><td class='Strong'>website/opdracht</td><td colspan='6'>Client Eindproject</td></tr><tr><td class='Strong'>datum</td><td colspan='6'>31-03-2016</td></tr><tr><td class='Strong'>valide HTML5</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide CSS</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide JavaScript</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>Browser</td><td colspan='3' class='BrowseData'><img class='BrowserImage' src='https://www.bhosted.nl/blog/wp-content/uploads/2016/01/ie9-logo.jpg' alt='Alt'><br>IE</td><td class='BrowseData'><img class='BrowserImage' src='https://www.mozilla.org/media/img/styleguide/identity/firefox/guidelines-logo.7ea045a4e288.png' alt='Alt'><br>Firefox</td><td class='BrowseData'><img class='BrowserImage' src='http://www.motorefashion.it/wp-content/uploads/2015/08/Google-Chrome-Logo.png' alt='Alt'><br>Chrome</td><td class='BrowseData'><img class='BrowserImage' src='http://kens.appsin.net/Files/Files/Icons/IconOpera.jpg' alt='Alt'><br>Opera</td></tr><tr><td class='Strong'>Versie</td><td>8</td><td>9</td><td>10</td><td>25</td><td>31</td><td>18</td></tr><tr><td class='Strong'>Design</td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td></tr></table><h3>Legenda</h3><br><div class='Legenda'><article class='resultGreen'>Werkt goed</article><article class='resultYellow'>Werkt gedeeltelijk</article><article class='resultRed'>Werkt niet</article><article class='resultGray'>Niet getest</article></div><br><div><h3>Onderbouwing van resultaten</h3><p>We hebben een een online-multiplayer pong game gemaakt. We hebben het spel getest op verschillende browsers.<br>Op elke browser werkt het spel uitstekend. Op Firefox heeft het balletje een klein beetje vertraging ten opziche van andere browsers als: Chrome, IE en Opera.<br>We hebben een splash-pagina waar de gemaakt waar de gebruiker heen gaat als hij op de website komt. Wanneer hij eenmaal op de website is verandert<br>de gebruiker niet meer van pagina. We hebben dit gedaan door de HTML te veranderen in een variabele. Wanneer de speler op de splash-page komt<br>wordt aangegeven dat hij doormiddel van de spatiebalk naar de volgende pagina kan. Hier kan hij op play drukken om naar een pagina te gaan waar hij<br>een lobby kan kiezen om een spel te spelen. Wanneer de lobby is gevuld met twee personen begint het spel.<br>We hebben de HTML, CSS en JavaScript gevalideerd met de W3 validator. Deze gaf aan dat alle HTML en CSS code valide is.<br> JavaScript hebben we gevalideerd met de JavascriptLint validator, deze gaf een aantal onzinnige waarschuwing die voor ons niet belangrijk zijn.<br>Doormiddel van een NodeJS server en websockets hebben we een multiplayer game opgezet waarop zich kan aanmelden bij een lobby om een spel te starten.<br>Er kunnen zich twee spelers aanmelden op één lobby en wanneer dit het geval is zal het spel zelf van start gaan.<br>De code is voorzien van comments om het duidelijk te maken voor andere programmeurs.</p><h3>testcases</h3><span class='resultGreen'>Als gebruiker wil ik me kunnen aanmelden op een spel.</span><br><span class='resultGreen'>Als gebruiker wil ik een nette splash-pagina zien wanneer ik het spel start.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGray'>Als gebruiker wil ik het spel op meerdere devices kunnen spelen.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGreen'>Als programmeur wil ik goede en valide code scrhijven.</span><br><span class='resultGreen'>Als programmeur wil ik dat HTML, CSS en JS gescheiden worden zodat ik een goed overzicht heb.</span><br></div></div>";
        var canvasHTML = "<section><canvas id='myCanvas'></canvas></section>";
        var splashImage = document.getElementById("splash");
        function newLobby() {
        $("#lobcreate").html("<form id='createform' method='post'><br><label for='naam'>Naam:</label><input type='text' name='naam'><br><input type='submit' value='create!'>");
        }
;
        function onGamestateChange(gamestate) {
        switch (gamestate) {
        case "menu":
                clearBody();
                document.body.innerHTML = menuHTML;
                break;
                case "lobby":
                clearBody();
                document.body.innerHTML = lobbyHTML;
                break;
                case "testtabel":
                clearBody();
                document.body.innerHTML = testHTML;
                break;
                case "play":
                clearBody();
                document.body.innerHTML = canvasHTML;
                play();
                default:
                break;
        }
        };
        function clearBody() {
        document.body.innerHTML = "";
        }

function doKeyDown(e) {

//check if document is ready.
//Keycode 32 = the spacebar, if it is pressed the player, will continue to the menu screen.
if (gamestate === "splash") {
if (e.keyCode === 32) {
clearBody();
        //link to menu
        gamestate = "menu";
        onGamestateChange(gamestate);
        }
} else if (gamestate === "menu") {

if (e.keyCode === 13) {//if pressed key = enter  
$(".selected").each(function () {
var id = $(this).attr("id");
        if (id === "play") {
gamestate = "lobby";
        onGamestateChange(gamestate);
        } else if (id === "testtabel") {
gamestate = "testtabel";
        onGamestateChange(gamestate);
        }
});
        } else if (e.keyCode === 38) {//if pressed key = up

$(".selected").each(function () {
var id = $(this).attr("id");
        $(this).removeClass("selected");
        if (id === "play") {
$("#testtabel").addClass("selected");
        } else if (id === "testtabel") {
$("#settings").addClass("selected");
        } else if (id === "settings") {
$("#play").addClass("selected");
        }

});
        } else if (e.keyCode === 40) { //if pressed key = down
$(".selected").each(function () {
var id = $(this).attr("id");
        $(this).removeClass("selected");
        if (id === "play") {
$("#settings").addClass("selected");
        } else if (id === "testtabel") {
$("#play").addClass("selected");
        } else if (id === "settings") {
$("#testtabel").addClass("selected");
        }
});
}
}
}


// IN GAME JAVASCRIPT
//
// IN GAME JAVASCRIPT
//
// IN GAME JAVASCRIPT
function play(){

var Player = function (position, size, color, speed) {
this.id = null;
        this.size = size;
        this.position = position;
        this.color = color;
        this.speed = speed;
        };
        /**
         * Draws the player on the given canvas context.
         *
         * @param {Object} context
         */
        Player.prototype.draw = function (context) {
        // TODO drawing logic here
        context.fillStyle = this.color;
                context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        };
        /**
         * Reviver function to create a new Player from the given Json.
         *
         * @param {Object} json
         * @returns {Player}
         */
        Player.revive = function (json) {
        var newPlayer = new Player(json.position, json.size, json.color, json.speed);
                newPlayer.id = json.id;
                return newPlayer;
        };
        /**
         * @author Sander
         * @param {number} y
         * @param {Object} canvas
         */
        Player.prototype.move = function (y, canvas) {
        this.position.y += y;
                this.speed = y;
                if (this.position.y < 0) {
        this.position.y = 0;
                this.speed = 0;
        } else if (this.position.y + this.size.height > canvas.height) {
        this.position.y = canvas.height - this.size.height;
                this.speed = 0;
        }
        };
        var keysDown = {};
        if (gamestate === "play"){

window.addEventListener("keydown", function (event) {
console.log("Keydown");
        keysDown[event.keyCode] = true;
});
        window.addEventListener("keyup", function (event) {
        delete keysDown[event.keyCode];
        });
        }
/**
 * @author Sander
 */
Player.prototype.update = function () {
//Keycode 40 = the arrowdown key, if it is pressed the player, obviously, will move down.
//There is also a check to prevent the player from leaving the playing field.
// console.log("Update... Keys -> ", keysDown);
// console.log("Y: ", this.position.y);
for (var key in keysDown) {
var value = Number(key);
        if (value === 40) {
this.move(7, 0);
        //Keycode 38 = the arrowup key, if it is pressed the player, obviously, will move up.
        } else if (value === 38) {
this.move( - 7, 0);
        } else {
this.move(0, 0);
        }
}
};
//Canvas JS
//
//Canvas JS
//
//Canvas JS

        var Projectile = function (radius, speed, startPosition) {
        this.radius = radius;
                this.speed = speed;
                this.position = startPosition;
                this.gameOver = false;
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
        context.beginPath();
                context.arc(this.position.x, this.position.y, this.radius, 2 * Math.PI, false);
                context.fillStyle = "#000000";
                context.fill();
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
        /**
         * @param {Element} canvas
         * @param {Object[]} players
         * @author Sander
         */
        Projectile.prototype.move = function (canvas, players) {
        this.position.x += this.speed.dx;
                this.position.y += this.speed.dy;
                if (this.position.y <= 0) {
        this.position.y = 0;
                this.position.y -= this.speed.dy;
                this.speed.dy *= - 1;
        } else if (this.position.y >= canvas.height) {
        this.position.y = canvas.height;
                this.position.y -= this.getWidthHeight();
                this.speed.dy *= - 1;
        }

        if ((this.position.x + this.getWidthHeight() >= (canvas.width - players[1].size.width + 5)) && (this.position.y >= players[1].position.y) && (this.position.y <= players[1].position.y + players[1].size.height)) {
        this.position.x = (canvas.width - players[1].size.width * 2 - this.speed.dx);
                // this.speed.dy += (players[1].speed / 2);
                this.speed.dx *= - 1;
                this.position.x += this.speed.dx;
        } else if ((this.position.x - this.getWidthHeight() <= (players[0].size.width - 5)) && (this.position.y >= players[0].position.y) && (this.position.y <= (players[0].position.y + players[0].size.height))) {
        this.position.x = (players[0].size.width * 2) - this.speed.dx;
                // this.speed.dy += (players[0].speed / 2);
                this.speed.dx *= - 1;
                this.position.x += this.speed.dx;
        }

        // this.draw(canvas.getContext("2d"));
        if (this.position.x > canvas.width || this.position.x < 0) {
        this.gameOver = true;
//        var player_won = (this.position.x > canvas.width) ? 1 : 2;
//        window.player_id_having_the_ball = (player_won == 1) ? 2 : 1;
//        finish_round(player_won);
//        socket.json.emit("end_of_the_round", {player_won: player_won, room_id: window.room_id});
        }
        };
        Projectile.prototype.finishRound = function (player) {

        };
        //EventListener for keydown, will send it to the function doKeyDown()
        var width = $("#myCanvas").css("width").split("p");
        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");
        //Set the width and height of the canvas
        c.width = width[0];
        c.height = width[0];
        //The playerLength is 1/10 of the with/height of the field
        var playerheight = width[0] / 10;
        //Initial starting position of the player, var y will also be used for movement of the player.
        var y = (width[0] / 2) - (playerheight / 2);
        balletje = new Projectile(10, {"dx": 3, "dy": 2}, {"x": 100, "y": 100});
        balletje.draw(ctx);
        player1 = new Player();
        player1.position = {"x": 10, "y": y};
        player1.size = {"width": 10, "height": playerheight};
        player1.speed = 20;
        player2 = new Player();
        player2.position = {"x": (c.width - 20), "y": y};
        player2.size = {"width": 10, "height": playerheight};
        player2.speed = 20;
        function clearCanvas() {
        ctx.clearRect(0, 0, c.width, c.height);
        }
var requestId;
        requestAnimationFrame(mainLoop);
        function mainLoop() {
        clearCanvas();
                player1.update();
                player2.update();
                balletje.move(c, [player1, player2]);
                player1.draw(ctx);
                player2.draw(ctx);
                balletje.draw(ctx);
                requestId = window.requestAnimationFrame(mainLoop);
                if (balletje.gameOver) {
        stop();
                console.log('heuj');
        }
        }

function start() {
if (!requestId) {
mainLoop();
        }
}

function stop() {
if (requestId) {
window.cancelAnimationFrame(requestId);
        requestId = undefined;
        }
}
}
