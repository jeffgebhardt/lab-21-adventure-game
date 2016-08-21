'use strict';

describe('game controller testing', function() {
  beforeEach(() => {
    angular.mock.module('adventureApp');
    angular.mock.inject(($controller) => {
      this.gameCtrl = $controller('GameController');
    });
  });

  beforeEach(() => {
    this.gameCtrl.history = [{
      id: 0,
      newEvent: 'Time to start searching for those sneaky hobbits!',
    }];
    this.gameCtrl.player = {
      name: 'Gandolf',
      location: 'shire',
      hobbitsFound: 0,
      stamina: 10,
    };
  });

  it('should set random # of hobbits between 1 and 10', () => {
    this.gameCtrl.totalHobbits;
    expect(this.gameCtrl.totalHobbits).not.toBeLessThan(1);
    expect(this.gameCtrl.totalHobbits).not.toBeGreaterThan(10);
  });

  it('should move in a valid direction', () => {
    this.gameCtrl.moveDirection('south');
    expect(this.gameCtrl.player.location).toBe('rohan');
    expect(this.gameCtrl.history[1].newEvent).toBe('Gandolf has entered rohan!');
  });

  it('should move in an invalid direction', () => {
    this.gameCtrl.moveDirection('west');
    expect(this.gameCtrl.player.location).toBe('shire');
    expect(this.gameCtrl.history[1].newEvent).toBe('This route is blocked! Try another direction!');
  });
});
