const should  = require('should');
const app     = require('../../app');
const request = require('supertest')(app);
const _       = require('lodash');
const knex    = require('knex')(require('../../knexfile').development);

knex.on('query', data => {
  console.dir(`QUERY ==> ${data.sql}`);
});

describe('User Controller', () => {
  describe('when finding all models', () => {

    it('should be successfull', (done) => {
      request
        .get('/users')
        .expect(200)
        .end( (err, response) => {
          if(err) {
            return done(err);
          }
          should.exist(response.body);
          response.body.should.be.Array();
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
        console.log(`first ${recordId}`);
        done();
      });
    });

    it('should return an updated record', (done) => {
      request
        .put(`/users/${recordId}`)
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
