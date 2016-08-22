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

  it('should set random # for troll spawn', () => {
    this.gameCtrl.moveDirection('south');
    expect(this.gameCtrl.randomTroll).not.toBeLessThan(1);
    expect(this.gameCtrl.randomTroll).not.toBeGreaterThan(15);

    if (this.gameCtrl.randomTroll === 5) {
      expect(this.gameCtrl.player.isDead).toBe(true);
    }
  });

  it('should set random # for hobbit spawn', () => {
    this.gameCtrl.moveDirection('south');
    expect(this.gameCtrl.randomHobbit).not.toBeLessThan(1);
    expect(this.gameCtrl.randomHobbit).not.toBeGreaterThan(2);
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
