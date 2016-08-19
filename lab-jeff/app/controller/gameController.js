'use strict';

const angular = require('angular');
const adventureApp = angular.module('adventureApp');

adventureApp.controller('GameController', ['$log', GameController]);

function GameController() {
  this.map = require('../lib/map.js');

  this.history = ['Time to start searching for those sneaky hobbits!'];
  this.directions = ['north', 'south', 'east', 'west'];
  this.player = {
    name: 'Gandolf',
    location: 'shire',
  };

  this.moveDirection = function(direction) {
    if (this.map[this.player.location]) {
      let currentLocation = this.map[this.player.location];
      let nextRoom = currentLocation[direction];
      if (nextRoom !== 'blocked') {
        this.player.location = nextRoom;
        this.logHistory('You have entered ' + this.player.location);
        return;
      }
      this.logHistory('This route is blocked! Try another direction!');
    }
  };

  this.logHistroy = function() {
    this.history.push(`${this.player.name}`);
  };
}
