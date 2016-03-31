
var gamestate = "splash";
        window.addEventListener('keydown', this.doKeyDown, false);
        var menuHTML = "<div id='splash'><span id='header'>Multiplayer - Pong</span><br><ul class='menu_list'><li class='selected' id='play'>Play</li><li id='settings'>Settings</li><li id='testtabel'>Test Tabel</li></ul></div>";
        var lobbyHTML = "<div><span id='header'>lobbies</span><br><div id='lobby_div'><ul id='lobbies'><li class='lobby'>Naam:<br>Aantal spelers:<br>Toeganslichtje<br></li></ul></div><div id='lobcreate'><button onClick='newLobby()'>New Lobby</button></div></div>";
        var testHTML = "<div><table class='testTabel'><tr><td class='Strong'>website/opdracht</td><td colspan='6'>Client Eindproject</td></tr><tr><td class='Strong'>datum</td><td colspan='6'>31-03-2016</td></tr><tr><td class='Strong'>valide HTML5</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide CSS</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>valide JavaScript</td><td colspan='6' class='resultGreen'></td></tr><tr><td class='Strong'>Browser</td><td colspan='3' class='BrowseData'><img class='BrowserImage' src='https://www.bhosted.nl/blog/wp-content/uploads/2016/01/ie9-logo.jpg' alt='Alt'><br>IE</td><td class='BrowseData'><img class='BrowserImage' src='https://www.mozilla.org/media/img/styleguide/identity/firefox/guidelines-logo.7ea045a4e288.png' alt='Alt'><br>Firefox</td><td class='BrowseData'><img class='BrowserImage' src='http://www.motorefashion.it/wp-content/uploads/2015/08/Google-Chrome-Logo.png' alt='Alt'><br>Chrome</td><td class='BrowseData'><img class='BrowserImage' src='http://kens.appsin.net/Files/Files/Icons/IconOpera.jpg' alt='Alt'><br>Opera</td></tr><tr><td class='Strong'>Versie</td><td>8</td><td>9</td><td>10</td><td>25</td><td>31</td><td>18</td></tr><tr><td class='Strong'>Design</td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td><td class='resultGreen'></td></tr></table><h3>Legenda</h3><br><div class='Legenda'><article class='resultGreen'>Werkt goed</article><article class='resultYellow'>Werkt gedeeltelijk</article><article class='resultRed'>Werkt niet</article><article class='resultGray'>Niet getest</article></div><br><div><h3>Onderbouwing van resultaten</h3><p>We hebben een een online-multiplayer pong game gemaakt. We hebben het spel getest op verschillende browsers.<br>Op elke browser werkt het spel uitstekend. Op Firefox heeft het balletje een klein beetje vertraging ten opziche van andere browsers als: Chrome, IE en Opera.<br>We hebben een splash-pagina waar de gemaakt waar de gebruiker heen gaat als hij op de website komt. Wanneer hij eenmaal op de website is verandert<br>de gebruiker niet meer van pagina. We hebben dit gedaan door de HTML te veranderen in een variabele. Wanneer de speler op de splash-page komt<br>wordt aangegeven dat hij doormiddel van de spatiebalk naar de volgende pagina kan. Hier kan hij op play drukken om naar een pagina te gaan waar hij<br>een lobby kan kiezen om een spel te spelen. Wanneer de lobby is gevuld met twee personen begint het spel.<br>We hebben de HTML, CSS en JavaScript gevalideerd met de W3 validator. Deze gaf aan dat alle HTML en CSS code valide is.<br> JavaScript hebben we gevalideerd met de JavascriptLint validator, deze gaf een aantal onzinnige waarschuwing die voor ons niet belangrijk zijn.<br>Doormiddel van een NodeJS server en websockets hebben we een multiplayer game opgezet waarop zich kan aanmelden bij een lobby om een spel te starten.<br>Er kunnen zich twee spelers aanmelden op één lobby en wanneer dit het geval is zal het spel zelf van start gaan.<br>De code is voorzien van comments om het duidelijk te maken voor andere programmeurs.</p><h3>testcases</h3><span class='resultGreen'>Als gebruiker wil ik me kunnen aanmelden op een spel.</span><br><span class='resultGreen'>Als gebruiker wil ik een nette splash-pagina zien wanneer ik het spel start.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGray'>Als gebruiker wil ik het spel op meerdere devices kunnen spelen.</span><br><span class='resultGreen'>Als gebruiker wil ik tegen andere online spelers kunnen spelen.</span><br><span class='resultGreen'>Als programmeur wil ik goede en valide code scrhijven.</span><br><span class='resultGreen'>Als programmeur wil ik dat HTML, CSS en JS gescheiden worden zodat ik een goed overzicht heb.</span><br></div></div>";
        var splashImage = document.getElementById("splash");
        function newLobby() {
        $("#lobcreate").html("<form id='createform' method='post'><br><label for='naam'>Naam:</label><input type='text' name='naam'><br><input type='submit' value='create!'>");
        }
;
        function onGamestateChange(gamestate) {
        switch (gamestate) {

        default:
                break;
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

