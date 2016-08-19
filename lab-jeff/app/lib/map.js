'use strict',

module.exports = {
  shire: {
    north: 'blocked',
    east: 'mordor',
    south: 'rohan',
    west: 'blocked',
  },
  mordor: {
    north: 'blocked',
    east: 'blocked',
    south: 'gondor',
    west: 'shire',
  },
  rohan: {
    north: 'shire',
    east: 'gondor',
    south: 'blocked',
    west: 'blocked',
  },
  gondor: {
    north: 'mordor',
    east: 'blocked',
    south: 'blocked',
    west: 'rohan',
  },
};
