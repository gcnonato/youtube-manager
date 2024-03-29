
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var job  = require('./routes/job');
var http = require('http');
var path = require('path');

var app = express();

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	//app.set('view engine', 'ejs');
	//app.set('view options', utils.merge(app.set('view options'), {open: '{{', close: '}}'}));
	//app.set('view options', {open: '{{', close: '}}'});
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser('your secret here'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
	app.use(express.errorHandler());
});

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/jobs', job.findAll);
app.get('/jobs/:id', job.findById);
app.post('/jobs', job.addJob);
/*
app.put('/jobs/:id', job.updateJob);
app.delete('/jobs/:id', job.deleteJob);
*/

http.createServer(app).listen(app.get('port'), function(){
	console.log("Express server listening on port " + app.get('port'));
});
