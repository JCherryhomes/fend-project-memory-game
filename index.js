var express = require('express');
var server = express();
var path = require('path');

server.use('/js', express.static(__dirname + '/js'));
server.use('/css', express.static(__dirname + '/css'));
server.use('/img', express.static(__dirname + '/img'));

server.get('/',function(req,res){
res.sendFile(path.join(__dirname+'/index.html'));
});

server.listen(3000, () => console.log('Listening on port 3000'));