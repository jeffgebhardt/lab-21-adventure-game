'use strict';

const angular = require('angular');
const events = require('../lib/adventureEvents');
const adventureApp = angular.module('adventureApp');

adventureApp.controller('GameController', ['$log', GameController]);

function GameController() {
  this.map = require('../lib/map.js');
  this.totalHobbits = events.setTotalHobbits();
  this.randomTroll = 0;
  this.randomHobbit = 0;

  this.history = [{
    id: 0,
    newEvent: 'Time to start searching for those sneaky hobbits!',
  }];
  this.directions = ['north', 'south', 'east', 'west'];
  this.player = {
    name: 'Gandolf',
    location: 'shire',
    hobbitsFound: 0,
    stamina: 10,
    isDead: false,
    wonGame: false,
  };

  this.moveDirection = function(direction) {
    if (this.map[this.player.location]) {
      let currentLocation = this.map[this.player.location];
      let nextRoom = currentLocation[direction];
      if (nextRoom !== 'blocked') {
        this.player.location = nextRoom;
        this.player.stamina -= 1;
        if (this.player.stamina === 0) {
          /* istanbul ignore next */
          alert('You ran out of stamina, ' + this.player.name + ' has feinted...');
          return this.player.isDead = true;
        }

        this.randomTroll = events.randomTroll();
        if (this.randomTroll === 5) {
          /* istanbul ignore next */
          alert('A troll found you and smashed your brains in!');
          this.player.stamina = 0;
          return this.player.isDead = true;
        }

        this.randomHobbit = events.randomHobbit();
        if (this.randomHobbit === 1) {
          /* istanbul ignore next */
          alert('You found a hobbit, good job!');
          this.totalHobbits -= 1;
          if (this.totalHobbits === 0) {
            /* istanbul ignore next */
            alert('Great work ' + this.player.name + ', you found all the hobbits!');
            return this.player.wonGame = true;
          }
        }

        return this.logHistory({
          id: this.history.length,
          newEvent: this.player.name + ' has entered ' + this.player.location + '!',
        });
      }

      return this.logHistory({
        id: this.history.length,
        newEvent: 'This route is blocked! Try another direction!',
      });
    }
  };

  this.logHistory = function(eventOccured) {
    this.history.push(eventOccured);
  };
}
