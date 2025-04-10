'use strict';

const hardhatNew = require('..');
const assert = require('assert').strict;

assert.strictEqual(hardhatNew(), 'Hello from hardhatNew');
console.info('hardhatNew tests passed');
