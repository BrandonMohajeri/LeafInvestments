

getElements();
function getElements(){
  // console.log(get['firstName']);

}



var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code,
    assert = require('assert');

  var db = new Db('test', new Server('localhost', 27017));
  db.open(function(err, db) {
    var collection = db.collection("users");

  // collection.insert(
  // {
  //  firstName:"Brandon",
  //  lastName:"Mohajeri",
  //   emailAddress:"brandon.mohajeri@gmail.com",
  //   password:"testpaswrd!!!"
  // })


  setTimeout(function() {

      collection.find({}).toArray(function(err, item) {

      console.log(item);

      db.close();
    })


  }, 100);
});
