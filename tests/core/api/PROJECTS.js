'use strict';

var testSetup = require('../../../testSetup.js');
var backoff = require('backoff');

var testSuite = 'API_PROJECTS';
var testSuiteDesc = 'Github Organization Project API tests';
var test = util.format('%s - %s', testSuite, testSuiteDesc);

describe(test,
  function () {
    var ownerApiAdapter = null;
    var project = [];

    this.timeout(0);
    before(
      function (done) {
        async.series(
          [
            testSetup.bind(null)
          ],
          function (err) {
            if (err) {
              logger.error(test, 'Failed to setup tests. err:', err);
              return done(err);
            }

            ownerApiAdapter =
              global.newApiAdapterByToken(global.SHIPPABLE_API_TOKEN);

            return done();

          }
        );
      }
    );

    it('1. Owner can get their projects',
      function (done) {
        ownerApiAdapter.getProjects('',
          function (err, prjs) {
            if (err)
              return done(
                new Error(
                  util.format('User cannot get project',
                    query, err)
                )
              );
            project = _.first(prjs);

            assert.isNotEmpty(prjs, 'User cannot find the projects');
            return done();
          }
        );
      }
    );

    it('2. ProjectId field in project',
      function (done) {
        assert.isNotNull(project.id, 'Project Id cannot be null');
        assert.equal(typeof(project.id), 'number');
        return done();
      }
    );

    it('3. ProjectIsOrphaned field in project',
      function (done) {
        assert.equal(typeof(project.isOrphaned), 'boolean');
        return done();
      }
    );

    it('4. ProjectName field in project',
      function (done) {
        assert.isNotNull(project.name, 'Project name cannot be null');
        assert.equal(typeof(project.name), 'string');
        return done();
      }
    );

    // it('5. ProjectSystemPropertyBag field in project',
    //   function (done) {
    //     console.log("typeof(project.systemPropertyBag)", typeof(project.systemPropertyBag));
    //     return done();
    //   }
    // );

    it('6. ProjectProviderId field in project',
      function (done) {
        assert.isNotNull(project.providerId, 'Project provider Id cannot be null');
        assert.equal(typeof(project.providerId), 'number');
        return done();
      }
    );

    it('7. ProjectSourceId field in project',
      function (done) {
        assert.isNotNull(project.sourceId, 'Project source Id cannot be null');
        assert.equal(typeof(project.sourceId), 'string');
        return done();
      }
    );

    it('8. ProjectCreatedBy field in project',
      function (done) {
        assert.isNotNull(project.createdBy, 'Project created by cannot be null');
        assert.equal(typeof(project.createdBy), 'string');
        return done();
      }
    );

    it('9. ProjectUpdatedBy field in project',
      function (done) {
        assert.isNotNull(project.updatedBy, 'Project updated by cannot be null');
        assert.equal(typeof(project.updatedBy), 'string');
        return done();
      }
    );

    it('10. ProjectCreatedAt field in project',
      function (done) {
        assert.isNotNull(project.createdAt, 'Project created at cannot be null');
        assert.equal(typeof(project.createdAt), 'string');
        return done();
      }
    );

    it('11. ProjectUpdatedAt field in project',
      function (done) {
        assert.isNotNull(project.updatedAt, 'Project updated at cannot be null');
        assert.equal(typeof(project.updatedAt), 'string');
        return done();
      }
    );

    after(
      function (done) {
        return done();
      }
    );
  }
);
