var express = require('express');

var app = express();
var env = process.env.NODE_ENV || 'prod';

var port = 3000;

var index = env === 'dev' ? '/index.html' : '/public/index.html';

if (env === 'dev') {
    require('chokidar-socket-emitter')({port: 8090});
    
    app.get('/', function(req, res) {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        res.sendFile(__dirname + index);
    });
} else {
    app.get('/', function(req, res) {
        res.sendFile(__dirname + index);
    });
}

// Enable Express to get dependency scripts
app.use('/', express.static(__dirname + '/'));

app.listen(port, function(error) {
	if (!error) {
		console.log('Listening on port ' + port + ' ' + env);
	} else {
		console.error(error);
	}
});