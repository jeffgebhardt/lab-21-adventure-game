'use strict';

module.exports = {
  setTotalHobbits(){
    return Math.floor(Math.random() * 10) + 1;
  },

  randomHobbit(){
    return Math.floor(Math.random() * 2) + 1;
  },

  randomTroll(){
    return Math.floor(Math.random() * 15) + 1;
  },
};
