## Synopsis

This is the board game Scrabble, created with HTML, CSS, Javascript & JQuery.  This version closely mimics the real life game, although it does not check if words are real or not, nor does it contain letter/word multipliers.  It does contain logic for correctly adding score and having the appropriate turn based mechanisms.


## Code Examples

**HTML**

<!-- <div class="playerOneScoreBox textBox">
    <h3 class="playerOneDisplayName">Player 1 Score</h3>
    <div class="playerOneScore"></div>
</div> -->

The HTML provided the basic structure of the game.  I chose to create the longer lists and grids in JS in order to keep this file readable.


**CSS**

.instructions {
    text-align: center;
    border: 1px solid black;
    position: absolute;
    background-color: rgba(0, 0, 0, 0.9);
    left: 50%;
    top: 50%;
    margin-top: -300px;
    margin-left: -450px;
    width: 900px;
    height: 600px;
    color: white;
    z-index: 5;
}

The styling for this game was not overly fussy - mostly just providing a clean game environment with easy to read text and no distractions.

**Javascript**

var submitWord = function() {
        correctOrientation();
        if ($('.tempInPlay').length > 0 && (firstTurn || permanentAdjacent()) && ($('.tempInPlay').length === 1 || correctOrientation()) && allTouching()) {
            if (isItPlayerOnesTurn()) {
                tallyScore(players[0]);
            } else {
                tallyScore(players[1]);
            }
            $('.tempInPlay').addClass('permInPlay');
            $('.tempInPlay').removeClass('tempInPlay');
            turn();
            firstTurn = false;
            sameColumn = true;
            sameRow = true;
        }
    }

The JS file is arranged with variables and functions at the top of the page, function deployment immediately afterwards, and event listeners at the bottom. The vast majority of the DOM manipulation was done with JQuery - I've become pretty comfortable using this and usually prefer it to vanilla JS except in a few cases.  All event listeners use JQuery.

There is a fair amount of logic at each step of this game, hence the code can be a bit dense with conditionals.  I've tried to consolidate as much as possible, and name variables as clearly as possible, but the flow can be a bit cumbersome at times.  I've tried to comment everything as much as possible to indicate what is happening at each step.


## Motivation

This is a project assigned for the unit 1 project of Web Development Intensive at General Assembly.  We were tasked with creating a simple game, using HTML, CSS, & JS.  I wanted something that wouldn't be overwhelming visually, but would be a solid challange on the backend.  While the MVP would've been just a simple turn-based word check, I wanted to push myself as much as possible and get the game as close to the original as I could.

## Wireframes

Landing Page: https://wireframe.cc/WGeEnP
Game Page: https://wireframe.cc/UDcNmp

##Approach

This was a complex game that needed to be broken down into pieces each step of the way.  The instruction screen was easy enough to build out, and completing that along with HTML layout and CSS styling was the first thing I completed.

For the JS gameplay logic, I first initialized the players, created the gameboard (as a grid), and created the randomized tile bag.  From there I created functions that allowed each player to load their racks, select and play a tile, and submit a word to end their turn.  Next was making all the buttons functional using event listeners - from the letter key to refreshing the rack, and returning all tiles to the rack.

The next section involved creating the logic for valid placement of tiles.  This included writing functions that checked adjacency rules and word orientation.  The conditionals started piling up, and I'll admit it was tricky to keep track of everything.  Later on I was able to clean some code up to reduce some of the redundancy and separate actions into distinct functions. 

The last, and most difficult, task was to create the logic for scoring.  The directional aspect of this was tough to crack, but I eventually was able to create a function that successfully determined the direction of a word and how to add it to a player's score.

## Unsolved Problems

I was not able to get to any of my more complex reach goals.  Doing a word checker against an API is beyond my ability at this time.  Adding blank tiles and letter/word multipliers would have been feasible, but I ran out of time and preferred to focus my time on squashing bugs and cleaning up code.

## Installation

The game can be accessed and played at https://agottlie.github.io/scrabble/