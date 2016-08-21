'use strict';

const angular = require('angular');
const events = require('../lib/adventureEvents');
const adventureApp = angular.module('adventureApp');

adventureApp.controller('GameController', ['$log', GameController]);

function GameController() {
  this.map = require('../lib/map.js');
  this.totalHobbits = events.setTotalHobbits();

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
  };

  this.moveDirection = function(direction) {
    if (this.map[this.player.location]) {
      let currentLocation = this.map[this.player.location];
      let nextRoom = currentLocation[direction];
      if (nextRoom !== 'blocked') {
        this.player.location = nextRoom;
        this.player.stamina -= 1;
        if (this.player.stamina === 0) {
          alert('You ran out of stamina, ' + this.player.name + ' has feinted...');
          return this.logHistory({
            id: this.history.length,
            newEvent: 'Game over...',
          });
        }

        if (events.randomTroll === 5) {
          alert('A troll found you and smashed your brains in!');
          this.player.stamina = 0;
          return this.logHistory({
            id: this.history.length,
            newEvent: 'Game over...',
          });
        }

        if (events.randomHobbit() === 1) {
          alert('You found a hobbit, good job!');
          this.totalHobbits -= 1;
          if (this.totalHobbits === 0) {
            alert('Great work ' + this.player.name + ', you found all the hobbits!');
            return this.logHistory({
              id: this.history.length,
              newEvent: 'You won!!!',
            });
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
