"use strict";

function PlayersManager() {
    var players = [];

    this.addPlayer = function (playerId, audioSrc) {
        players[playerId] = document.createElement('audio');
        players[playerId].setAttribute('src', audioSrc);
    };
    
    this.play = function (playerID) {
        for (var id in players) {
            if (playerID !== id) {
                players[id].pause();
            } else {
                players[id].currentTime = 0;
                players[id].play();
            }
        }
    }
}
