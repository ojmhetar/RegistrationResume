
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fileupload = require('fileupload').middleware;
var fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('your secret here'));
app.use(express.session());
app.use(express.multipart());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));


// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/index', routes.index);
app.get('/users', user.list);
app.get('/form', routes.form2);
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/public/index.html');
});
app.post('/post', function(req, res, next){
	
 fs.readFile(req.files.resume.path, function (err, data) {
        var newPath = "./uploadDir" + req.files.resume.name;
        fs.writeFile(newPath, data, function (err) {
          res.send("Upload complete.");  
        });
    });

});






http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
