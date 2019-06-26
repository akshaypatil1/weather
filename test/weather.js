const supertest = require("supertest");
const should = require("should");

// This agent refers to PORT where program is runninng.
const server = supertest.agent("http://localhost:8080");

// UNIT test begin
describe("weather route unit test",function(){

  it("should give weather report",function(done){
    //calling api
    server
    .get('/api/weather/pune/2')
    .expect("Content-type",/json/)
    .expect(200)
    .end(function(err,res){
      res.status.should.equal(200);
      done();
    });
  });

  it("should give not prime date error",function(done){
    //calling api
    server
    .get('/api/weather/pune/4')
    .expect("Content-type",/json/)
    .expect(403)
    .end(function(err,res){
      res.status.should.equal(403);
      res.body.error.should.equal('Date is not prime so no date');
      done();
    });
  });

  it("should give city not found error",function(done){
    //calling api
    server
    .get('/api/weather/cityname/2')
    .expect("Content-type",/json/)
    .expect(404)
    .end(function(err,res){
      res.status.should.equal(404);
      res.body.error.should.equal('city not found');
      done();
    });
  });

});
