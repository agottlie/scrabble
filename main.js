$(function() {

    //letters sourced from https://github.com/hanshuebner/html-scrabble/blob/master/client/javascript/scrabble.js
    var tileBag = [
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


    //creates a temporary bag giving each tile its own array item
    var tempBag = [];
    while (tileBag.length > 0) {
        tempBag.push(tileBag[0]);
        tileBag[0].count--;
        if (tileBag[0].count === 0) {
            tileBag.shift();
        }
    }


    //shuffles the bag
    var shuffledBag = [];
    while (tempBag.length > 0) {
        var rndm = Math.floor(tempBag.length * Math.random());
        shuffledBag.push(tempBag[rndm]);
        tempBag.splice(rndm, 1);
    }

    //checks the contents of the shuffled bag
    shuffledBag.forEach(function(tile) {
        console.log(tile.letter);
    });

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

    var playerOneRack = $('.playerOneTile');
    var playerTwoRack = $('.playerTwoTile');
    console.log("test: " + playerTwoRack[3]);

    //tallies up score and declares a winner
    var endGame = function() {};

    //given a player, will fill their rack with up to 7 tiles
    var loadRack = function(player) {
        for (i = player.rack.length; i < 7; i++) {
            player.rack.push(shuffledBag[0]);
            shuffledBag.shift();
        }

        for (j = 0; j < 7; j++) {
            if (player === playerOne) {
                $('.playerOneTile').eq(j).text(player.rack[j].letter);
            } else {
                $('.playerTwoTile').eq(j).text(player.rack[j].letter);
            }
        }
    }

    //ends a turn and starts a new one
    var turn = function() {
        loadRack(playerOne);
        loadRack(playerTwo);

        setTimeout(function() {
            $('.playerOneTiles').toggle();
            $('.playerOneTitle').toggle();
            $('.playerTwoTiles').toggle();
            $('.playerTwoTitle').toggle();
        }, 3000);
        $('.playerOneScore').text(playerOne.score);
        $('.playerTwoScore').text(playerTwo.score);
        $('.remainingTiles').text(shuffledBag.length);
    }

    //fade out instruction screen
    $('.start').click(function() {
        if (($('.playerOneName').val() !== "") && ($('.playerTwoName').val() !== "")) {
            $('.instructions').fadeOut(1000);
            turn();
        } else {
            alert("Please make sure both players have entered their names!");
        }
    })










});
