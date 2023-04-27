var addButton = document.querySelector("#add-game-button");
console.log("#button 1", addButton);

addButton.onclick = function () {
	console.log("the add button was clicked");
	
	var gameNameInput = document.querySelector("#game-name");
	console.log("name input element:", gameNameInput);
	console.log("input element text:", gameNameInput.value);
	var gameConsoleInput = document.querySelector("#game-console");
	var maxPlayersInput = document.querySelector("#max-players");
	var splitscreenInput = document.querySelector("#splitscreen");
	var priceInput = document.querySelector("#price");
	
	createGameOnServer(gameNameInput.value, gameConsoleInput.value, maxPlayersInput.value, splitscreenInput.value, priceInput.value);
	
	gameNameInput.value = "";
	gameConsoleInput.value = "";
	maxPlayersInput.value = "";
	splitscreenInput.value = "";
	priceInput.value = "";
};

var addInput = document.getElementById("price");
addInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("add-game-button").click();
    };
});
	
var myGames = [];

var randomButton = document.querySelector("#random-game-button");
console.log("random button query", randomButton);

randomButton.onclick = function () {
	console.log("the random button was clicked");
	
	// random index to pick a game (0 to length of games)
	var randomIndex = Math.floor(Math.random() * myGames.length);
	console.log("random index =", randomIndex);
	// index my array of games: variable with the string
	var randomName = myGames[randomIndex];
	console.log("random name =", randomName);
	// query the span
	var randomNameSpan = document.querySelector("#random-game-name");
	// console.log("random name span =", randomNameSpan)
	// assign innerHTML of the span to be the game name string
	randomNameSpan.innerHTML = randomName.name;
};


var registerButton = document.getElementById('register-button');
var registerForm = document.getElementById('register-form');
var loginButton = document.getElementById('login-button');
var loginForm = document.getElementById('login-form');


loginButton.onclick = function() {
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    createSession(email, password);
};

var pwInput = document.getElementById("password");
pwInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        loginButton.click();
    };
});

registerButton.onclick = function() {
    registerForm.style.display = 'flex';
    loginForm.style.display = 'none';
};

var createUserButton = document.getElementById("create-user-button");

createUserButton.onclick = function() {
    var firstName = document.getElementById("first-name").value;
    var lastName = document.getElementById("last-name").value;
    var email = document.getElementById("email-new").value;
    var password = document.getElementById("password-new").value;
    
    createUserOnServer(firstName, lastName, email, password);
    
    firstName = "";
    lastName = "";
    email = "";
    password = "";
    
    registerForm.style.display = 'none';
    loginForm.style.display = 'flex';
};



function loadGamesFromServer () {


var mainArea = document.getElementById('main-area');
            
// when the page loads:
    // fetch resource collection
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/games", {
        credentials: 'include'
    }).then(function (response) {
    	response.json().then(function (data) {
        // if 401:
        if (response.status == 401) {
    		console.log("data received from server: ", data);    		
    		console.log("response status:", response.status);
            // not logged in
            // show login and register
            loginForm.style.display = 'flex';
            // hide resource stuff (games info)
            mainArea.style.visibility = 'hidden';
            // when login succeeds:
                // go back to fetch above
        // elif 200:
        } else if (response.status == 200) {
            // logged in
            // show resource stuff
            mainArea.style.visibility = 'visible';
            // hide login and register
            loginForm.style.display = 'none';

    		console.log("data received from server: ", data);    		
    		console.log("response status:", response.status);
    		
    		myGames = data;
    		
    		var gamesList = document.querySelector("#my-game-list");
    	    console.log("#my Games element:", myGames);
    	    gamesList.innerHTML = "";
    	    
    		
    		// for game in myGames
    		myGames.forEach(function (game) {
    		    console.log(game);
    		    var newItem = document.createElement("li");
                
                var nameDiv = document.createElement("div");
                nameDiv.innerHTML = game.name;
                nameDiv.classList.add("game-name");
                newItem.appendChild(nameDiv);
                
                var consoleDiv = document.createElement("div");
                consoleDiv.innerHTML = game.console;
                consoleDiv.classList.add("game-console");
                newItem.appendChild(consoleDiv);
                
                var maxPlayersDiv = document.createElement("div");
                maxPlayersDiv.innerHTML = 'Max players: ' + game.max_players;
                maxPlayersDiv.classList.add("max-players");
                newItem.appendChild(maxPlayersDiv);
                
                var splitscreenDiv = document.createElement("div");
                splitscreenDiv.innerHTML = 'Splitscreen: ' + game.splitscreen;
                splitscreenDiv.classList.add("splitscreen");
                newItem.appendChild(splitscreenDiv);
                
                var priceDiv = document.createElement("div");
                priceDiv.innerHTML = 'Price: $' + game.price;
                priceDiv.classList.add("price");
                newItem.appendChild(priceDiv);
                
                
                var deleteButton = document.createElement("button");
                deleteButton.innerHTML = "Delete";
                deleteButton.onclick = function () {
                    console.log("The delete button was clicked for", game.name);
                    if (confirm("Are you sure you want to delete " + game.name + "?")) {
                        console.log("Attempting to delete game...");
                        deleteGameFromServer(game.id);
                    };
                };
                newItem.appendChild(deleteButton);
                
                var editButton = document.createElement("button");
                editButton.innerHTML = "Edit";
                
                newItem.appendChild(editButton);

                editButton.onclick = function () {
                    // create input fields for game data
                    var nameInputField = document.createElement("input");
                    nameInputField.type = "text";
                    nameInputField.placeholder = "Game Name"
                    nameInputField.value = game.name; 
                    newItem.appendChild(nameInputField);
                    
                    var consoleInputField = document.createElement("input");
                    consoleInputField.type = "text";
                    consoleInputField.placeholder = "Console"
                    consoleInputField.value = game.console; 
                    newItem.appendChild(consoleInputField);
                    
                    var maxPlayersInputField = document.createElement("input");
                    maxPlayersInputField.type = "text";
                    maxPlayersInputField.placeholder = "Max Players"
                    maxPlayersInputField.value = game.max_players; 
                    newItem.appendChild(maxPlayersInputField);
                    
                    var splitscreenInputField = document.createElement("input");
                    splitscreenInputField.type = "text";
                    splitscreenInputField.placeholder = "Splitscreen?"
                    splitscreenInputField.value = game.splitscreen; 
                    newItem.appendChild(splitscreenInputField);
                    
                    var priceInputField = document.createElement("input");
                    priceInputField.type = "text";
                    priceInputField.placeholder = "Price"
                    priceInputField.value = game.price; 
                    newItem.appendChild(priceInputField);
                    
                    // create save button
                    var saveButton = document.createElement("button");
                    saveButton.innerHTML = "Save";
                    newItem.appendChild(saveButton);
                    
                    saveButton.onclick = function() {
                        // get updated game data from input fields
                        var updatedGameName = nameInputField.value;
                        var updatedGameConsole = consoleInputField.value;
                        var updatedMaxPlayers = maxPlayersInputField.value;
                        var updatedSplitscreen = splitscreenInputField.value;
                        var updatedPrice = priceInputField.value;
                        
                        // call editGameOnServer with updated data
                        editGameOnServer(game.id, updatedGameName, updatedGameConsole, updatedMaxPlayers, updatedSplitscreen, updatedPrice);
                    };
                };
                
    	        gamesList.appendChild(newItem);
    		});
    	}});
    });    
};

function createGameOnServer (gameName, gameConsole, maxPlayers, splitscreen, price) {
    console.log("Attempting to create game", gameName, "on server");
    
    var data = "name=" + encodeURIComponent(gameName);
    data += "&console=" + encodeURIComponent(gameConsole);
    data += "&max_players=" + encodeURIComponent(maxPlayers);
    data += "&splitscreen=" + encodeURIComponent(splitscreen);
    data += "&price=" + encodeURIComponent(price);
    
    console.log("Sending data to server", data);
    
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/games", {
        // request details
        method: "POST",
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
    }).then(function (response) {
        // when the server responds:
        if (response.status == 201) {
            loadGamesFromServer();
        } else {
            console.log("server responded with", response.status, "when trying to create a game");
        };
        
    });
};

function deleteGameFromServer(gameId) {
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/games/" + gameId, {
        method: "DELETE",
        credentials: 'include'
    }).then(function (response) {
        if (response.status == 200) {
            loadGamesFromServer();
        } else {
            console.log("server responded with", response.status, "when trying to delete a game");
        }
    });
};

function editGameOnServer(gameId, gameName, gameConsole, maxPlayers, splitscreen, price) {
    var data = "";
    if (gameName) {
        data += "name=" + encodeURIComponent(gameName);
    }
    if (gameConsole) {
        data += "&console=" + encodeURIComponent(gameConsole);
    }
    if (maxPlayers) {
        data += "&max_players=" + encodeURIComponent(maxPlayers);
    }
    if (splitscreen) {
        data += "&splitscreen=" + encodeURIComponent(splitscreen);
    }
    if (price) {
        data += "&price=" + encodeURIComponent(price);
    }
    
    console.log("Sending data to server", data);
    
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/games/" + gameId, {
        // request details
        method: "PUT",
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
    }).then(function (response) {
        // when the server responds:
        if (response.status == 200) {
            loadGamesFromServer();
        } else {
            console.log("server responded with", response.status, "when trying to update a game");
        };
        
    });
};

function createUserOnServer (first_name, last_name, email, password) {
    console.log("Attempting to create user", first_name, "on server");
    
    var data = "first_name=" + encodeURIComponent(first_name);
    data += "&last_name=" + encodeURIComponent(last_name);
    data += "&email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);
    
    console.log("Sending data to server", data);
    
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/users", {
        // request details
        method: "POST",
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
    }).then(function (response) {
        // when the server responds:
        if (response.status == 201) {
            console.log("response:", response.status);
        } else {
            console.log("server responded with", response.status, "when trying to create a user");
            alert("User with that email already exists.")
        };
    });
};

function createSession(email, password) {
    console.log("Attempting to create session with user email", email);
    
    var data = "email=" + encodeURIComponent(email);
    data += "&password=" + encodeURIComponent(password);
    
    console.log("sending data to server:", data);
    
    fetch("https://s23-deploy-tekoxvi-production.up.railway.app/sessions", {
        // request details
        method: "POST",
        body: data,
        credentials: 'include',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
        
    }).then(function (response) {
        // when the server responds:
        if (response.status == 201) {
            console.log("response:", response.status);
            loadGamesFromServer();
        } else {
            console.log("server responded with", response.status, "when trying create a session");
            alert("Invalid email or password.");
        };
    });
};

loadGamesFromServer();


// when the page loads:
    // fetch resource collection
    // if 401:
        // not logged in
        // show login and register
        // hide resource stuff (games info)
        // when login succeeds:
            // go back to fetch above
    // elif 200:
        // logged in
        // show resource stuff
        // hide login and register
        
        
// if email taken, 422


// register failed user (already taken)
// register new user
// bad email login
// good email login

// refresh and stay logged in