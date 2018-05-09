var express = require('express');
var bodyParser = require('body-parser');

var ObjectID = require('mongodb').ObjectID
var MongoClient = require('mongodb').MongoClient;

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/test', function(req, res){
	res.end("hello world")
})

app.get('/gettest/:id', function (req, res_get) {
    var idString  = req.params.id
    MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) throw err;
    var dbo = db.db("runoob");
    var whereStr = {"_id": new ObjectID(idString)};
    dbo.collection("site").find(whereStr).toArray(function(err, result) {
        if (err) throw err;
        console.log(result[0]);
		res_get.end(JSON.stringify(result[0]))
        db.close();
    });
   });
})

app.post('/posttest', function(req, res_post){
	var now = Date.now()
	var myo = {x: req.body.x, y: req.body.y, createTime: now}
	MongoClient.connect('mongodb://localhost:27017/', function(err, db) {
    if (err) throw err;
    var dbo = db.db('runoob');
    var myobj = myo;
    dbo.collection('site').insertOne(myobj, function(err, res) {
        if (err) throw err;
		db.close();
		console.log(res['insertedId'])
		res_post.end(res['insertedId'].toString())
    });
  });
})

var server = app.listen(8081, function () {

  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)

})