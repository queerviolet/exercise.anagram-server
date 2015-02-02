var express = require('express')
var app = express()

app.use(express.static('.')); // serve index.html (and all our code, as it happens).

app.get('/:word', function(req, res) {
  // res.json(x) will return x as json.
  // Always call res.end() when you're done.
  // TODO: find some anagrams
  res.json([]);
  res.end();
});

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Anagrams listening at http://%s:%s', host, port)
});