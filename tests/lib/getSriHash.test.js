'use strict';

var fs = require('fs');
var path = require('path');
var test = require('tape');
var getSriHash = require('../../lib/getSriHash');

function readFixture(name) {
  var fixture = fs.readFileSync(path.resolve(__dirname, '../fixtures/' + name), 'utf8');
  return fixture;
}

test('getSriHash()', function(assert) {
  assert.plan(2);

  [
    {
      algo: 'sha384',
      fixture: 'jquery-1.10.2.min.js',
      sri: 'sha384-hK8q2gkBjirpIGHAH+sgqYMv6i6mfx2JVZWJ50jyYhkuEHASU6AS1UTWSo32wuGL'
    },
    {
      algo: 'sha256',
      fixture: 'jquery-1.10.2.min.js',
      sri: 'sha256-C6CB9UYIS9UJeqinPHWTHVqh/E1uhG5Twh+Y5qFQmYg='
    }
  ].forEach(function(scenario) {
    var fixture = readFixture(scenario.fixture);
    var actual = getSriHash(scenario.algo, fixture);
    var expected = scenario.sri;

    assert.equal(actual, expected,
      'should return (' + expected + ') for ' + scenario.fixture
    );
  });

  assert.end();
});
