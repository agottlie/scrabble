$(function() {


//-------BEGIN VARIABLE DECLARATIONS------
    //resets everything
    var resetGame = function() {
        //global variables
        var shuffledBag = [];
        var tempBag = [];
        var selected = false;
        var tabCounter = 0;
        var firstTurn = true;
        var sameColumn = true;
        var sameRow = true;

        //player objects
        var playerOne = {
            name: "",
            score: 0,
            rack: []
        }
        var playerTwo = {
            name: "",
            score: 0,
            rack: []
        }
    }

    //letters sourced from https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js
    var createBag = function() {
        tileBag = [
            { letter: "E", score: 1, count: 12 },
            { letter: "A", score: 1, count: 9 },
            { letter: "I", score: 1, count: 9 },
            { letter: "O", score: 1, count: 8 },
            { letter: "N", score: 1, count: 6 },
            { letter: "R", score: 1, count: 6 },
            { letter: "T", score: 1, count: 6 },
            { letter: "L", score: 1, count: 4 },
            { letter: "S", score: 1, count: 4 },
            { letter: "U", score: 1, count: 4 },
            { letter: "D", score: 2, count: 4 },
            { letter: "G", score: 2, count: 3 },
            { letter: "B", score: 3, count: 2 },
            { letter: "C", score: 3, count: 2 },
            { letter: "M", score: 3, count: 2 },
            { letter: "P", score: 3, count: 2 },
            { letter: "F", score: 4, count: 2 },
            { letter: "H", score: 4, count: 2 },
            { letter: "V", score: 4, count: 2 },
            { letter: "W", score: 4, count: 2 },
            { letter: "Y", score: 4, count: 2 },
            { letter: "K", score: 5, count: 1 },
            { letter: "J", score: 8, count: 1 },
            { letter: "X", score: 8, count: 1 },
            { letter: "Q", score: 10, count: 1 },
            { letter: "Z", score: 10, count: 1 }
        ]
    }

    //create physical game board
    var createBoard = function() {
        for (i = 0; i < 15; i++) {
            var newRow = $('<div class="row"></div>');
            for (j = 0; j < 15; j++) {
                var newBox = $('<div class="box"></div>');
                newBox.attr("data-row", i);
                newBox.attr("data-column", j);
                newRow.append(newBox);
            }
            $('.gameBoard').append(newRow);
        }
    }

    //creates the letter values key
    var createLetterKey = function() {
        tileBag.forEach(function(tile) {
            var newListing = $('<li>');
            newListing.text(tile.letter + ": " + tile.score + " points");
            $('.letterValueList').append(newListing);
        });
    }

    //creates a temporary bag giving each tile its own array item
    var createTileBag = function() {
        while (tileBag.length > 0) {
            tempBag.push(tileBag[0]);
            tileBag[0].count--;
            if (tileBag[0].count === 0) {
                tileBag.shift();
            }
        }
    }

    //shuffles the bag
    var shuffleBag = function() {
        while (tempBag.length > 0) {
            var rndm = Math.floor(tempBag.length * Math.random());
            shuffledBag.push(tempBag[rndm]);
            tempBag.splice(rndm, 1);
        }
    }

    //tallies up score and declares a winner
    var endGame = function() {
        //deducts remaining tile values from each player
        playerOne.rack.forEach(function(tile) {
            playerOne.score -= tile.score;
        });
        playerTwo.rack.forEach(function(tile) {
            playerTwo.score -= tile.score;
        });

        //re-initializes the game board
        $('.tempInPlay').text("");
        $('.permInPlay').text("");
        $('.permInPlay').removeClass('permInPlay');
        $('.playerOneTile').remove();
        $('.playerTwoTile').remove();
        $('.playerOneTiles').hide();
        $('.playerOneTitle').hide();
        $('.playerTwoTiles').show();
        $('.playerTwoTitle').show();
        $('.playerOneTilesRow').hide();
        $('.playerTwoTilesRow').hide();

        //winning conditions
        if (playerOne.score > playerTwo.score) {
            alert(playerOne.name + " is the winner!\nFinal score:\n" + playerOne.name + ": " + playerOne.score + " points\n" + playerTwo.name + ": " + playerTwo.score + " points");
        } else if (playerOne.score < playerTwo.score) {
            alert(playerTwo.name + " is the winner!\nFinal score:\n" + playerOne.name + ": " + playerOne.score + " points\n" + playerTwo.name + ": " + playerTwo.score + " points");
        } else {
            alert("It's a tie game!");
        }

        //sets up for another game
        createBag();
        resetGame();
        $('.container').hide();
        $('.letterValuesBox').hide();
        $('.playAgain').show();
    };

    //determines whose turn it is
    var isItPlayerOnesTurn = function() {
        if ($('.playerOneTiles').css("display") !== 'none') {
            return true;
        } else {
            return false;
        }
    }

    //given a player, will fill their rack with up to 7 tiles
    var loadRack = function(player) {
        //adds tiles to the player's rack array until it's either at 7 or until the bag is empty
        for (i = player.rack.length; i < 7; i++) {
            if (shuffledBag.length > 0) {
                player.rack.push(shuffledBag[0]);
                shuffledBag.shift();
                if (player === playerOne) {
                    var newTileBox = $('<div class="playerOneTile tileBox"></div>');
                    $('.playerOneTilesRow').append(newTileBox);
                } else {
                    var newTileBox = $('<div class="playerTwoTile tileBox"></div>');
                    $('.playerTwoTilesRow').append(newTileBox);
                }
            }
        }

        //updates the DOM to display the correct text on the player's rack
        if (player === playerOne) {
            for (j = 0; j < $('.playerOneTile').length; j++) {
                $('.playerOneTile').eq(j).text(player.rack[j].letter);
            }
        } else {
            for (j = 0; j < $('.playerTwoTile').length; j++) {
                $('.playerTwoTile').eq(j).text(player.rack[j].letter);
            }
        }
    }

    //returns the score value of a given tile
    var letterValue = function(tile) {
        var selectedLetter = tile.text();
        createBag();
        var selectedTile = tileBag.find(function(x) {
            return x.letter === selectedLetter;
        });
        return selectedTile.score;
    }

    //given 2 tiles, returns the direction the 'adjacent' one is to the 'original' one
    var direction = function(original, adjacent) {
        if (original.attr('data-row') < adjacent.attr('data-row')) {
            return "bottom";
        } else if (original.attr('data-row') > adjacent.attr('data-row')) {
            return "top";
        } else if (original.attr('data-column') < adjacent.attr('data-column')) {
            return "right";
        } else {
            return "left";
        }
    }

    //tallies the score from a given turn and adds it to the player's total
    var tallyScore = function() {
        var counter = 0;
        $(".counted").removeClass('counted');
        if (isItPlayerOnesTurn()) {
            for (var i = 0; i < $('.tempInPlay').length; i++) {
                playerOne.score += letterValue($('.tempInPlay').eq(i));
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(i).attr('data-row')), parseInt($('.tempInPlay').eq(i).attr('data-column')), true, true, true, true);
                for (j = 0; j < adjacentToMe.length; j++) {
                    if (adjacentToMe[j].hasClass('permInPlay') && !(adjacentToMe[j].hasClass('counted'))) {
                        playerOne.score += letterValue(adjacentToMe[j]);
                        adjacentToMe[j].addClass('counted');
                        if ((sameRow && (adjacentToMe[j].attr('data-column') === $('.tempInPlay').eq(i).attr('data-column'))) || (sameColumn && (adjacentToMe[j].attr('data-row') === $('.tempInPlay').eq(i).attr('data-row')))) {
                            playerOne.score += letterValue($('.tempInPlay').eq(i));
                        }
                        var stop = false;
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "left") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) - dirCounter, false, false, true, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerOne.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "right") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) + dirCounter, false, false, false, true);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerOne.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "top") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) - dirCounter, parseInt(adjacentToMe[j].attr('data-column')), true, false, false, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerOne.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "bottom") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) + dirCounter, parseInt(adjacentToMe[j].attr('data-column')), false, true, false, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerOne.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
            }
            while (counter < playerOne.rack.length) {
                if ($('.playerOneTile').eq(counter).css("display") === 'none') {
                    playerOne.rack.splice(counter, 1);
                    $('.playerOneTile').eq(counter).remove();
                } else {
                    counter++;
                }
            }
        } else {
            for (var i = 0; i < $('.tempInPlay').length; i++) {
                playerTwo.score += letterValue($('.tempInPlay').eq(i));
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(i).attr('data-row')), parseInt($('.tempInPlay').eq(i).attr('data-column')), true, true, true, true);
                for (j = 0; j < adjacentToMe.length; j++) {
                    if (adjacentToMe[j].hasClass('permInPlay') && !(adjacentToMe[j].hasClass('counted'))) {
                        playerTwo.score += letterValue(adjacentToMe[j]);
                        adjacentToMe[j].addClass('counted');
                        if ((sameRow && (adjacentToMe[j].attr('data-column') === $('.tempInPlay').eq(i).attr('data-column'))) || (sameColumn && (adjacentToMe[j].attr('data-row') === $('.tempInPlay').eq(i).attr('data-row')))) {
                            playerTwo.score += letterValue($('.tempInPlay').eq(i));
                        }
                        var stop = false;
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "left") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) - dirCounter, false, false, true, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerTwo.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "right") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')), parseInt(adjacentToMe[j].attr('data-column')) + dirCounter, false, false, false, true);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerTwo.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "top") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) - dirCounter, parseInt(adjacentToMe[j].attr('data-column')), true, false, false, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerTwo.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                        if (direction($('.tempInPlay').eq(i), adjacentToMe[j]) === "bottom") {
                            var dirCounter = 0;
                            while (stop === false) {
                                var nextOne = adjacentTiles(parseInt(adjacentToMe[j].attr('data-row')) + dirCounter, parseInt(adjacentToMe[j].attr('data-column')), false, true, false, false);
                                if (nextOne.length > 0 && nextOne[0].hasClass("permInPlay") && !(nextOne[0].hasClass('counted'))) {
                                    playerTwo.score += letterValue(nextOne[0]);
                                    nextOne[0].addClass("counted");
                                    dirCounter++;
                                } else {
                                    stop = true;
                                }
                            }
                        }
                    }
                }
            }
            while (counter < playerTwo.rack.length) {
                if ($('.playerTwoTile').eq(counter).css("display") === 'none') {
                    playerTwo.rack.splice(counter, 1);
                    $('.playerTwoTile').eq(counter).remove();
                } else {
                    counter++;
                }
            }
        }
    }

    //ends a turn and starts a new one
    var turn = function() {
        $('.playerOneTilesRow').hide();
        $('.playerTwoTilesRow').hide();
        $('.showTiles').show();
        if (shuffledBag.length > 0) {
            loadRack(playerOne);
            loadRack(playerTwo);
        }

        if (playerOne.rack.length === 0 || playerTwo.rack.length === 0) {
            endGame();
        } else {
            $('.playerOneTiles').toggle();
            $('.playerOneTitle').toggle();
            $('.playerTwoTiles').toggle();
            $('.playerTwoTitle').toggle();

            $('.playerOneScore').text(playerOne.score);
            $('.playerTwoScore').text(playerTwo.score);
            $('.remainingTiles').text(shuffledBag.length);
        }
    }

    var returnToRack = function() {
        if (isItPlayerOnesTurn()) {
            $('.playerOneTile').css("display", "inline-block");
        } else {
            $('.playerTwoTile').css("display", "inline-block");
        }
        $('.tempInPlay').text("");
        $('.tempInPlay').removeClass('tempInPlay');
    }

    var adjacentTiles = function(row, column, justAbove, justBelow, justLeft, justRight) {
        var allAdjacents = [];
        if (justAbove && row > 0) {
            var above = $("[data-row=\'" + (row - 1) + "\'][data-column=\'" + column + "\']");
            allAdjacents.push(above);
        }
        if (justBelow && row < 14) {
            var below = $("[data-row=\'" + (row + 1) + "\'][data-column=\'" + column + "\']");
            allAdjacents.push(below);
        }
        if (justLeft && column > 0) {
            var left = $("[data-row=\'" + row + "\'][data-column=\'" + (column - 1) + "\']");
            allAdjacents.push(left);
        }
        if (justRight && column < 14) {
            var right = $("[data-row=\'" + row + "\'][data-column=\'" + (column + 1) + "\']");
            allAdjacents.push(right);
        }
        return allAdjacents;
    }

    var correctOrientation = function() {
        var row = $('.tempInPlay').eq(0).attr('data-row');
        var column = $('.tempInPlay').eq(0).attr('data-column');
        for (i = 0; i < $('.tempInPlay').length; i++) {
            if ($('.tempInPlay').eq(i).attr('data-column') !== column) {
                sameColumn = false;
            }
            if ($('.tempInPlay').eq(i).attr('data-row') !== row) {
                sameRow = false;
            }
        }
        return (sameRow || sameColumn);
    }

    var permanentAdjacent = function() {
        for (i = 0; i < $('.tempInPlay').length; i++) {
            var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(i).attr('data-row')), parseInt($('.tempInPlay').eq(i).attr('data-column')), true, true, true, true);
            for (j = 0; j < adjacentToMe.length; j++) {
                if (adjacentToMe[j].hasClass('permInPlay')) {
                    return true;
                }
            }
        }
        return false;
    }

    var allTouching = function() {
        var counter = 0;
        if (sameRow) {
            for (l = 0; l < $('.tempInPlay').length; l++) {
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(l).attr('data-row')), parseInt($('.tempInPlay').eq(l).attr('data-column')), false, false, true, true);
                for (x = 0; x < adjacentToMe.length; x++) {
                    if (!(adjacentToMe[x].hasClass('permInPlay') || adjacentToMe[x].hasClass('tempInPlay'))) {
                        counter++;
                    }
                }
                if (parseInt($('.tempInPlay').eq(l).attr('data-column')) === 0 || parseInt($('.tempInPlay').eq(l).attr('data-column')) === 14) {
                    counter++;
                }
            }

        } else if (sameColumn) {
            for (l = 0; l < $('.tempInPlay').length; l++) {
                var adjacentToMe = adjacentTiles(parseInt($('.tempInPlay').eq(l).attr('data-row')), parseInt($('.tempInPlay').eq(l).attr('data-column')), true, true, false, false);
                for (x = 0; x < adjacentToMe.length; x++) {
                    if (!(adjacentToMe[x].hasClass('permInPlay') || adjacentToMe[x].hasClass('tempInPlay'))) {
                        counter++;
                    }
                }
                if (parseInt($('.tempInPlay').eq(l).attr('data-row')) === 0 || parseInt($('.tempInPlay').eq(l).attr('data-row')) === 14) {
                    counter++;
                }
            }
        }
        if (counter > 2) {
            return false;
        }
        return true;
    }

    var submitWord = function() {
        correctOrientation();
        console.log("permanent adjacent?: " + permanentAdjacent());
        console.log("correct Orientation?: " + correctOrientation());
        console.log("all Touching?: " + allTouching());
        console.log("same row?: " + sameRow);
        console.log("same column?: " + sameColumn);
        if ($('.tempInPlay').length > 0 && (firstTurn || permanentAdjacent()) && ($('.tempInPlay').length === 1 || correctOrientation()) && allTouching()) {
            tallyScore();
            $('.tempInPlay').addClass('permInPlay');
            $('.tempInPlay').removeClass('tempInPlay');
            turn();
            firstTurn = false;
            sameColumn = true;
            sameRow = true;
        }
    }

    var refreshTiles = function() {
        returnToRack();
        if (isItPlayerOnesTurn()) {
            playerOne.rack.forEach(function(tile) {
                shuffledBag.splice(Math.floor(Math.random() * shuffledBag.length), 0, tile);
            });
            while (playerOne.rack.length > 0) {
                playerOne.rack.pop();
            }
            $('.playerOneTile').remove();
        } else {
            playerTwo.rack.forEach(function(tile) {
                shuffledBag.splice(Math.floor(Math.random() * shuffledBag.length), 0, tile);
            });
            while (playerTwo.rack.length > 0) {
                playerTwo.rack.pop();
            }
            $('.playerTwoTile').remove();
        }
        turn();
    }

    var showTiles = function() {
        if (isItPlayerOnesTurn()) {
            $('.playerOneTilesRow').show();
        } else {
            $('.playerTwoTilesRow').show();
        }
        $('.showTiles').hide();
    }

    var tabClick = function() {
        if (tabCounter % 2 === 0) {
            $('.letterValuesBox').removeClass('slideRight');
            $('.letterValuesBox').addClass('slideLeft');
        } else {
            $('.letterValuesBox').removeClass('slideLeft');
            $('.letterValuesBox').addClass('slideRight');
        }
        tabCounter++;
    }

    var startGame = function() {
        if (($('.playerOneName').val() !== "") && ($('.playerTwoName').val() !== "")) {
            $('.instructions').fadeOut(1000);
            playerOne.name = $('.playerOneName').val();
            playerTwo.name = $('.playerTwoName').val();
            $('.playerOneDisplayName').text(playerOne.name + "\'s Score");
            $('.playerTwoDisplayName').text(playerTwo.name + "\'s Score");
            turn();
        } else {
            alert("Please make sure both players have entered their names!");
        }
    }

    var startingProcedure = function() {
        $('.playAgain').hide();
        $('.container').show();
        $('.letterValuesBox').show();
        $('.instructions').fadeIn();
        createTileBag();
        shuffleBag();
    }

    createBoard();
    createLetterKey();
    createTileBag();
    shuffleBag();
    startingProcedure();

    //fade out instruction screen


    $(document.body).on('click', '.tileBox', function() {
        $('.tileBox').removeClass('selected');
        $(this).addClass('selected');
        selected = true;
    });

    $(document.body).on('click', '.box', function() {
        if (selected) {
            if (!($(this).hasClass('permInPlay')) && (!$(this).hasClass('tempInPlay'))) {
                $(this).text($('.selected').text());
                $(this).addClass('tempInPlay')
                $('.selected').hide();
                $('.selected').removeClass('selected');
                selected = false;
            }
        }
    });

    $('.start').click(startGame);

    $('.submitWord').click(submitWord);

    $('.refreshTiles').click(refreshTiles);

    $('.backToRack').click(returnToRack);

    $('.showTiles').click(showTiles);

    $('.tab').click(tabClick);

    $('.playAgain').click(startingProcedure);

});