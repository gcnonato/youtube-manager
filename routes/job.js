
/*
 * GET jobs listing.
 */

var mongodb = require('mongodb');
var Server = mongodb.Server;
var Db = mongodb.Db;
var BSON = mongodb.BSONPure;

var server = new Server('192.168.1.3', 27017, {auto_reconnect: true});
db = new Db('youtubemanager', server, {safe: true});

db.open(function(err, db) {
	debugger;
	if (!err) {
		console.log('connected to db');

	}
});

exports.findAll = function(req, res){
	db.collection('jobs', function(err, collection) {
		collection.find().toArray(function(err, items) {
			res.send(items);
		});
	});
}

exports.findById = function(req, res){
	var id = req.params.id;
	console.log('finding by id %s', id);
	db.collection('jobs', function(err, collection) {
		collection.findOne({'_id': new BSON.ObjectID(id)},function(err, item) {
			res.send(item);
		});
	});
}

exports.addJob = function(req, res){
	var job = req.body;
	console.log('adding job: %j', job);
	db.collection('jobs', function(err, collection) {
		collection.insert(job, {safe: true},function(err, result) {
			if (err) {
				res.send({'error': 'An error has occurred'});
			}
			else {
				res.send(result[0]);
			}
		});
	});
}
