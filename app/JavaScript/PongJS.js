//Game state is used to navigate from the splashscreen to the game, etc
var gamestate = "splash";
//Event listener for key presses
        window.addEventListener('keydown', this.doKeyDown, false);
//Dynamic HTML pages.
        var menuHTML = "<div id='splash'><span id='header'>Multiplayer - Pong</span><br><ul class='menu_list'><li class='selected' id='play'>Play</li><li id='settings'>Settings</li><li id='testtabel'>Test Tabel</li></ul></div>";
        var testHTML = "<div><table class='testTabel'><tr><td class='Strong'>website/opdracht</td><td colspan='6'>Client Eindproject</td></tr><tr><td class='Strong'>datum</td><td colspan='6'>31-03-2016</td></tr><tr><td class='Strong'>valide HTML5</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide CSS</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide JavaScript</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>Browser</td><td colspan='3' class='BrowseData'><img class='BrowserImage' src='https://www.bhosted.nl/blog/wp-content/uploads/2016/01/ie9-logo.jpg' alt='Alt'><br>IE</td><td class='BrowseData'><img class='BrowserImage' src='https://www.mozilla.org/media/img/styleguide/identity/firefox/guidelines-logo.7ea045a4e288.png' alt='Alt'><br>Firefox</td><td class='BrowseData'><img class='BrowserImage' src='http://www.motorefashion.it/wp-content/uploads/2015/08/Google-Chrome-Logo.png' alt='Alt'><br>Chrome</td><td class='BrowseData'><img class='BrowserImage' src='http://kens.appsin.net/Files/Files/Icons/IconOpera.jpg' alt='Alt'><br>Opera</td></tr><tr><td class='Strong'>Versie</td><td>8</td><td>9</td><td>10</td><td>25</td><td>31</td><td>18</td></tr><tr><td class='Strong'>Design</td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td></tr></table><h3>Legenda</h3><br><div class='Legenda'><article class='resultGreen'>Werkt goed</article><article class='resultYellow'>Werkt gedeeltelijk</article><article class='resultRed'>Werkt niet</article><article class='resultGray'>Niet getest</article></div><br><div><h3>Onderbouwing van resultaten</h3><p>We hebben een een online-multiplayer pong game gemaakt. We hebben het spel getest op verschillende browsers.<br>Op elke browser werkt het spel uitstekend. Op Firefox heeft het balletje een klein beetje vertraging ten opziche van andere browsers als: Chrome, IE en Opera.<br>We hebben een splash-pagina waar de gemaakt waar de gebruiker heen gaat als hij op de website komt. Wanneer hij eenmaal op de website is verandert<br>de gebruiker niet meer van pagina. We hebben dit gedaan door de HTML te veranderen in een variabele. Wanneer de speler op de splash-page komt<br>wordt aangegeven dat hij doormiddel van de spatiebalk naar de volgende pagina kan. Hier kan hij op play drukken om naar een pagina te gaan waar hij<br>een lobby kan kiezen om een spel te spelen. Wanneer de lobby is gevuld met twee personen begint het spel.<br>We hebben de HTML, CSS en JavaScript gevalideerd met de W3 validator. Deze gaf aan dat alle HTML en CSS code valide is.<br> JavaScript hebben we gevalideerd met de JavascriptLint validator, deze gaf een aantal onzinnige waarschuwing die voor ons niet belangrijk zijn.<br>Doormiddel van een NodeJS server en websockets hebben we een multiplayer game opgezet waarop zich kan aanmelden bij een lobby om een spel te starten.<br>Er kunnen zich twee spelers aanmelden op één lobby en wanneer dit het geval is zal het spel zelf van start gaan.<br>De code is voorzien van comments om het duidelijk te maken voor andere programmeurs.</p><h3>testcases</h3><span class='resultGreen'>Als gebruiker wil ik me kunnen aanmelden op een spel.</span><br><span class='resultGreen'>Als gebruiker wil ik een nette splash-pagina zien wanneer ik het spel start.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGray'>Als gebruiker wil ik het spel op meerdere devices kunnen spelen.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGreen'>Als programmeur wil ik goede en valide code scrhijven.</span><br><span class='resultGreen'>Als programmeur wil ik dat HTML, CSS en JS gescheiden worden zodat ik een goed overzicht heb.</span><br></div></div>";
        var canvasHTML = "<section><span id='header'>Multiplayer - Pong</span><br><form action='http://localhost:8000' id='roomSelector' method='post'><input type='radio' name='room' value='0'> Room 0 <br><input type='radio' name='room' value='1'> Room 1 <br><input type='radio' name='room' value='2'> Room 2 <br><input type='submit' value='Join room'></form></section><section><div class='score-board'><div class='player'><p>0</p></div><div class='player'><p>0</p></div></div><canvas id='myCanvas'></canvas><div id='ready-section'><div class='player'><h3>Player 1:</h3><h3>Not ready</h3></div><div class='player'><h3>Player 2:</h3><h3>Not ready</h3></div><h3>Press space to set yourself to ready</h3></div><h2 id='waiting-label'>Waiting for more players</h2></section><audio autoplay loop><source src='JavaScript/pong.mp3' type='audio/mpeg'></audio>";
        var splashImage = document.getElementById("splash");
//Navigate to a certain html page
        function onGamestateChange(gamestate) {
        switch (gamestate) {
        case "menu":
                clearBody();
                document.body.innerHTML = menuHTML;
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
console.log("KeyDown functie");
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

if (e.keyCode === 13) { //if pressed key = enter
$(".selected").each(function() {
var id = $(this).attr("id");
        if (id === "play") {
gamestate = "play";
        onGamestateChange(gamestate);
        } else if (id === "testtabel") {
gamestate = "testtabel";
        onGamestateChange(gamestate);
        }
});
        } else if (e.keyCode === 38) { //if pressed key = up

$(".selected").each(function() {
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
$(".selected").each(function() {
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
function play() {
//Definition of player class/object
var Player = function(position, size, color, speed) {
this.id = null;
        this.size = size;
        this.position = position;
        this.color = color;
        this.speed = speed;
        this.score = 0;
        this.ready = false;
        };
        /**
         * Draws the player on the given canvas context.
         *
         * @param {Object} context
         */
        Player.prototype.draw = function(context) {
        context.fillStyle = this.color;
                context.fillRect(this.position.x, this.position.y, this.size.width, this.size.height);
        };
        /**
         * Reviver function to create a new Player from the given Json.
         *
         * @param {Object} json
         * @returns {Player}
         */
        Player.revive = function(json) {
        var newPlayer = new Player(json.position, json.size, json.color, json.speed);
                newPlayer.id = json.id;
                return newPlayer;
        };
        /**
         * @author Sander
         * @param {number} y
         * @param {Object} canvas
         */
        Player.prototype.move = function(y, canvas) {
        this.position.y += y;
                this.speed = y;
                //If the player reaches the top of the playing field his Y position stays 0, so he can't leave the field.
                if (this.position.y < 0) {
        this.position.y = 0;
                this.speed = 0;
                //If the player reaches the bottom of the playing field his Y position is set to the canvas height - the height of the player.	
        } else if (this.position.y + this.size.height > canvas.height) {
        this.position.y = canvas.height - this.size.height;
                this.speed = 0;
        }
        };
        var keysDown = {};
        window.addEventListener("keydown", function(event) {
        keysDown[event.keyCode] = true;
        });
        window.addEventListener("keyup", function(event) {
        delete keysDown[event.keyCode];
        });
        /**
         * @author Sander
         */
        Player.prototype.update = function(canvas, room, socket) {
        var oldY = this.position.y;
                var oldReady = this.ready;
                //Keycode 40 = the arrowdown key, if it is pressed the player, obviously, will move down.
                //There is also a check to prevent the player from leaving the playing field.
                // console.log("Update... Keys -> ", keysDown);
                // console.log("Y: ", this.position.y);
                for (var key in keysDown) {
        var value = Number(key);
                if (value === 40) {
        this.move(7, canvas);
                //Keycode 38 = the arrowup key, if it is pressed the player, obviously, will move up.
        } else if (value === 38) {
        this.move( - 7, canvas);
        } else if (value === 32) {
        this.ready = true;
        } else {
        this.move(0, canvas);
        }
        }

        // console.log(oldReady, this.ready);
        if (this.position.y !== oldY || this.ready !== oldReady) {
        socket.emit("playerupdate", {
        "roomNumber": room,
                "player": this
        });
        }
        };
        //Definition of the Projectile class/object.
        var Projectile = function(radius, speed, startPosition) {
        this.radius = radius;
                this.speed = speed;
                this.position = startPosition;
                this.gameOver = false;
        };
        Projectile.prototype.update = function(canvas, players, room, socket) {
        var oldX = this.position.x,
                oldY = this.position.y;
                this.move(canvas, players);
                if ((this.position.x !== oldX || this.position.y !== oldY) || this.gameOver) {
        this.gameOver = false;
                socket.emit("ballupdate", {
                "roomNumber": room,
                        "projectile": this
                });
        }

        };
        /**
         * This method simply returns radius*2, you could use this to get the width or height
         * of the projectile.
         *
         * @returns {number} Width or Height
         */
        Projectile.prototype.getWidthHeight = function() {
        return this.radius * 2;
        };
        /**
         * Draws the projectile on the given canvas context.
         *
         * @param {Object} context              The context derived from the canvas.
         */
        Projectile.prototype.draw = function(context) {
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
        Projectile.revive = function(json) {
        return new Projectile(json.radius, json.speed, json.position);
        };
        /**
         * @param {Element} canvas
         * @param {Object[]} players
         * @author Sander
         */
        Projectile.prototype.move = function(canvas, players) {
        this.position.x += this.speed.dx;
                this.position.y += this.speed.dy;
                //If the ball touches the top wall, reverse the y speed, so it will go down.
                if (this.position.y <= 0) {
        this.position.y = 0;
                this.position.y -= this.speed.dy;
                this.speed.dy *= - 1;
                //If the ball touches the bottom wall, reverse the y speed, so it will go up.
        } else if (this.position.y >= canvas.height) {
        this.position.y = canvas.height;
                this.position.y -= this.getWidthHeight();
                this.speed.dy *= - 1;
        }

        //Checks if the ball has collision with a player, if so, the ball x speed is reversed
        if ((this.position.x + this.getWidthHeight() >= (canvas.width - players[1].size.width + 5)) && (this.position.y >= players[1].position.y) && (this.position.y <= players[1].position.y + players[1].size.height)) {
        this.position.x = (canvas.width - players[1].size.width * 2 - this.speed.dx);
                this.speed.dx *= - 1;
                this.position.x += this.speed.dx;
        } else if ((this.position.x - this.getWidthHeight() <= (players[0].size.width - 5)) && (this.position.y >= players[0].position.y) && (this.position.y <= (players[0].position.y + players[0].size.height))) {
        this.position.x = (players[0].size.width * 2) - this.speed.dx;
                this.speed.dx *= - 1;
                this.position.x += this.speed.dx;
        }

        //Checks on which side the ball touches the wall and gives points to a player.
        if (this.position.x > canvas.width || this.position.x < 0) {
        if (this.position.x > canvas.width)
                players[0].score++;
                if (this.position.x < 0)
                players[1].score++;
                this.finishRound(canvas, players);
        }
        };
        //Reset the game.
        Projectile.prototype.finishRound = function(canvas, players) {
        for (var i in players) {
        players[i].ready = false;
                this.position.x = canvas.width / 2;
                this.position.y = canvas.height / 2;
        }
        this.gameOver = true;
        };
        //Create all the variables, classes, etc that are needed to run the game.
        var scoreboard = document.getElementsByClassName("score-board")[0],
        playerScores = scoreboard.getElementsByClassName("player"),
        player1Score = playerScores[0].getElementsByTagName('p')[0],
        player2Score = playerScores[1].getElementsByTagName('p')[0];
        var readySection = document.getElementById("ready-section"),
        player1Ready = readySection.getElementsByClassName("player")[0].getElementsByTagName("h3")[1],
        player2Ready = readySection.getElementsByClassName("player")[1].getElementsByTagName("h3")[1];
        var waitingLabel = document.getElementById("waiting-label");
        var socket = io.connect("http://localhost:8000");
        var instance = {};
        var room;
        var width = $("#myCanvas").css("width").split("p");
        var canvas = document.getElementById("myCanvas");
        canvas.width = width[0];
        canvas.height = width[0];
        var playerheight = width[0] / 10;
        var y = (width[0] / 2) - (playerheight / 2);
        var ball = new Projectile(10, {
        "dx": 3,
                "dy": 2
        }, {
        "x": 100,
                "y": 100
        });
        var player = new Player({
        "x": 10,
                "y": y
        }, {
        "width": 10,
                "height": playerheight
        }, "#FF0000", 20);
        $("#roomSelector").submit(function(e) {
e.preventDefault();
        var url = $(this).attr("action"),
        method = $(this).attr("method"),
        selected = this.querySelector("input[name='room']:checked");
        if (instance.player1 !== undefined) {
instance = {};
        socket.emit("disconnecting", {
        "roomNumber": room,
                "player": player
        });
        player1Score.innerHTML = 0;
        player2Score.innerHTML = 0;
        }

$.ajax({
url: url,
        type: method,
        data: "room=" + selected.value,
        success: function(data) {
        room = selected.value;
                init();
        }
});
        });
        $(window).on('resize', function(e) {
// TODO resize projectile and players etc.
});
        function init() {
        socket.emit("newplayer", room);
        }


if (socket !== undefined) {

/**
 * Checks if we have to create a new instance of the game, or if there's already an instance present on the server.
 * If there's an instance present on the server, it adds the entities from that instance.
 */
socket.on("servernewplayer", function(data) {
//            console.log("SERVERNEWPLAYER", data);
if (data.instance === null) {
// This means that we have to create a new game
instance.player1 = player;
        player.position.x = player.size.width;
        } else {
instance.player1 = Player.revive(data.instance.player1);
        instance.player2 = player;
        player.position.x = canvas.width - player.size.width * 2;
        ball = Projectile.revive(data.instance.projectile);
        }
//The ball is drawn in the middle of the canvas.
ball.position = {
"x": canvas.width / 2,
        "y": canvas.height / 2
        };
        ball.speed = {
        "dx": 3,
                "dy": 2
        };
        player.id = data.id;
        player.score = 0;
        instance.projectile = ball;
        // Make sure the other players gets us as well.
        socket.emit("clientmessage", {
        "roomNumber": room,
                "instance": instance
        });
        requestAnimationFrame(mainLoop);
        });
        /**
         * We receive this message when player2 sends a clientmessage to the server.
         */
        socket.on("servermessage", function(data) {
        instance.player2 = Player.revive(data.instance.player2);
        });
        /**
         * Update the players
         */
        socket.on("playerupdatemessage", function(data) {
        if (instance.player1 !== undefined && instance.player2 !== undefined) {
        if (data.player1.id !== player.id) {
        instance.player1.position = data.player1.position;
                instance.player1.score = data.player1.score;
                instance.player1.ready = data.player1.ready;
        } else {
        instance.player2.position = data.player2.position;
                instance.player2.score = data.player2.score;
                instance.player2.ready = data.player2.ready;
        }
        }
        });
        /**
         * Updates the projectile.
         * Checks if the difference is greater than 2, as to not create unnecessary updates.
         */
        socket.on("ballupdatemessage", function(data) {

        if (data.projectile !== undefined && ball.position.x - data.projectile.position.x >= 2 &&
                ball.position.y - data.projectile.position.y >= 2) {
        ball.position = data.projectile.position;
        }
        });
        socket.on("playerdisconnectmessage", function(data) {
        if (data.player1 === undefined)
                instance.player1 = undefined;
                else if (data.player2 === undefined)
                instance.player2 = undefined;
        });
        }
//Update the ready/not ready labels of the players.
function updateLabels() {
if (instance.player1 !== undefined || instance.player2 !== undefined) {
waitingLabel.style.display = "none";
        }
if (instance.player1 === undefined || instance.player2 === undefined)
        waitingLabel.style.display = "block";
        if (instance.player1 !== undefined) {
if (instance.player1.ready) {
player1Ready.style.color = "green";
        player1Ready.innerHTML = "Ready";
        } else {
player1Ready.style.color = "red";
        player1Ready.innerHTML = "Not ready";
        }
}
if (instance.player2 !== undefined) {
if (instance.player2.ready) {
player2Ready.style.color = "green";
        player2Ready.innerHTML = "Ready";
        } else {
player2Ready.style.color = "red";
        player2Ready.innerHTML = "Not ready";
        }
}
}

//The mainloop of the game, here is where it all happens. Players are drawn, positions are updated, etc.
function mainLoop() {
var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        updateLabels();
        if (((instance.player1 !== null && instance.player1 !== undefined) &&
                (instance.player2 !== null && instance.player2 !== undefined)) &&
                (instance.player1.ready && instance.player2.ready)) {
ball.update(canvas, [instance.player1, instance.player2], room, socket);
        // Update scores if needed
        if (parseInt(player1Score.innerHTML) < instance.player1.score)
        player1Score.innerHTML = instance.player1.score;
        if (parseInt(player2Score.innerHTML) < instance.player2.score)
        player2Score.innerHTML = instance.player2.score;
        }

player.update(canvas, room, socket);
        // Draw entities on screen.
        if (instance.player1 !== null && instance.player1 !== undefined)
        instance.player1.draw(ctx);
        if (instance.player2 !== null && instance.player2 !== undefined)
        instance.player2.draw(ctx);
        if (instance.projectile !== null && instance.projectile !== undefined)
        instance.projectile.draw(ctx);
        // Call gameloop again
        requestAnimationFrame(mainLoop);
        }


$(window).on('beforeunload', function() {
for (var o in instance) {
if (o.id === player.id) {
o = null;
        }
}
if (socket !== undefined) {
socket.close();
        }
});
}