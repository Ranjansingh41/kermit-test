'use strict';

var self = testSetup;
module.exports = self;

var chai = require('chai');
var nconf = require('nconf');
var fs = require('fs');
var backoff = require('backoff');

var ShippableAdapter = require('./_common/shippable/Adapter.js');
// var GithubAdapter = require('./_common/github/Adapter.js');

global.util = require('util');
global._ = require('underscore');
global.async = require('async');
global.assert = chai.assert;
global.expect = require('chai').expect;

// global.logger = require('./_common/logging/logger.js')(process.env.LOG_LEVEL);
// global.resourcePath = './conf.json';

global.config = {};
global.TIMEOUT_VALUE = 0;
global.DELETE_PROJ_DELAY = 5000;

global.config.apiUrl = process.env.SHIPPABLE_API_URL;
global.GH_API_URL = process.env.GH_API_URL;

global.TEST_GH_ORGNAME = process.env.TEST_GH_ORGNAME;

global.githubOwnerAccessToken = process.env.GITHUB_ACCESS_TOKEN_OWNER;

global.SHIPPABLE_API_TOKEN = process.env.SHIPPABLE_API_TOKEN;

global.GH_ORG_SUB_INT_GH = process.env.GH_ORG_SUB_INT_GH;

// each test starts off as a new process, setup required constants
function testSetup(done) {
  var who = util.format('%s|%s', self.name, testSetup.name);
  logger.debug(who, 'Inside');

  // global.suAdapter = new ShippableAdapter(process.env.SHIPPABLE_API_TOKEN);
  // global.pubAdapter = new ShippableAdapter(''); // init public adapter

  // global.stateFile = nconf.file(global.resourcePath);
  // global.stateFile.load();

  var bag = {
    systemCodes: null
  };

  // setup any more data needed for tests below
  async.parallel(
    [
      getSystemCodes.bind(null, bag)
    ],
    function (err) {
      if (err) {
        logger.error(who, 'Failed');
        return done(err);
      }
      global.systemCodes = bag.systemCodes;
      logger.debug(who, 'Completed');
      return done();
    }
  );
}

function getSystemCodes(bag, next) {
  var who = util.format('%s|%s', self.name, getSystemCodes.name);
  logger.debug(who, 'Inside');

  global.suAdapter.getSystemCodes('',
    function (err, systemCodes) {
      if (err) {
        logger.error(who, 'Failed');
        return next(err);
      }

      logger.debug(who, 'Completed');
      bag.systemCodes = systemCodes;
      return next();
    }
  );
}

global.newGHAdapterByToken = function (apiToken) {
  return new GithubAdapter(apiToken, global.GH_API_URL);
};

global.newApiAdapterByToken = function (apiToken) {
  return new ShippableAdapter(apiToken);
};
