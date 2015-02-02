var words = require('./dict').words  // from /usr/share/dict/words
var express = require('express')
var app = express()

app.use(express.static('.'));

app.get('/:word', function(req, res) {
  // TODO: find anagrams for req.params.word
  res.json([]);
  // Always call res.end() when you're done.  
  res.end();
});

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Anagrams listening at http://%s:%s', host, port)
});