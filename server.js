var express = require('express');
var app = express();
var router = express.Router();
const path = require('path');
app.use(express.static(path.join(__dirname, 'build')));


router.all('/', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
router.all('/login', function(req, res){
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
router.all('*', function(req, res){
  res.send('Sorry, this is an invalid URL.');
});
app.use('/', router);

app.listen(8080,'192.168.1.1');