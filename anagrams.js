var express = require('express')
var words = require('./dict').words
var app = express()

var canonical = function(word) {
  return word.toLowerCase().split('').sort().join('')
};

var anagrams = {};
var maxClusterSize = 0, maxCluster;
var i = words.length;
while (--i >= 0) {
  var word = words[i];
  var c = canonical(word);
  anagrams[c] = anagrams[c] || [];
  anagrams[c].push(word);
  if (anagrams[c].length > maxClusterSize) {
    maxCluster = c;
    maxClusterSize = anagrams[c].length;
  }
}

console.log('Largest anagrams cluster is:', maxCluster, 'size:', maxClusterSize);

app.use(express.static('.'));

app.get('/:word', function(req, res) {
  // res.json(x) will return x as json.
  // Always call res.end() when you're done.
  res.json(anagrams[canonical(req.params.word)]);
  res.end();
});

var server = app.listen(3000, 'localhost', function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Anagrams listening at http://%s:%s', host, port)
});