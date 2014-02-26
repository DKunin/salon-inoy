
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , fs = require('fs');

var app = express();

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');
app.locals.basedir = path.join(__dirname, '/app/views');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'app/')));
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

function writeJson(name,data){
  fs.writeFile(name, JSON.stringify(data, null, 4), function(err) {
      if(err) {
        console.log(err);
      } 
  }); 
}


app.get('/', function(req, res){
  res.render('index');
});
app.get('/edit', function(req, res){
  res.render('editor');
});
app.post('/savemap', function(req, res){  
  writeJson("newmap.json",req.body.secondPlan);
});
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
