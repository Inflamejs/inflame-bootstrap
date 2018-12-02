const should  = require('should');
const app     = require('../../app');
const request = require('supertest')(app);
const _       = require('lodash');
const knex    = require('knex')(require('../../knexfile').development);

describe('Person Controller', () => {
  describe('when finding all models', () => {

    it('should be successfull', (done) => {
      request
        .get('/persons')
        .expect(200)
        .end( (err, response) => {
          if(err) {
            return done(err);
          }
          console.log(response.body);
          should.exist(response.body.persons);
          response.body.persons.should.be.Array();
          return done();
        });
    });
  });

  describe('when updating a record', () => {
    let recordId;
    before(done => {
      knex('persons').insert({
        firstName: 'Naruto',
        lastName: 'Uzumaki',
        age: 16
      }).then( (result) => {
        recordId = _.first(result);
        done();
      });
    });

    it('should return an updated record', (done) => {
      request
        .put(`/persons/${recordId}`)
        .send({
          firstName: `Kushina`
        })
        .expect(200)
        .end( (error, response) => {
          if (error) {
            return done(error);
          }

          should.exist(response.body.user);
          response.body.user.firstName.should.be.equal(`Kushina`);
          return done();
        });
    });

  });
});
