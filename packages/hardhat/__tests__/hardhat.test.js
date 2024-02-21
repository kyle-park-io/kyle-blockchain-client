'use strict';

const hardhat = require('..');
const assert = require('assert').strict;

assert.strictEqual(hardhat(), 'Hello from hardhat');
console.info('hardhat tests passed');
