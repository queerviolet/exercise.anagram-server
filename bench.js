"use strict";

var http = require('http');
var microtime = require('microtime');
var words = require('./dict').words;

var stats = {
  reqs: 0,
  ok: 0,
  err: 0,
  time: 0,
  print: function() {
    if (this.reqs % 100 == 0) {
      console.log(1000 * this.reqs / this.time, 'kqps');      
    }
  },
}

var hammer = function() {
  var path = '/' + words[Math.floor(Math.random() * words.length)];
  var start = microtime.now();
  ++stats.reqs;
  http.get({host: '127.0.0.1', port: 4567, path: path, agent: false}, function(res) {
    stats.time += microtime.now() - start;
    res.on('data', function() { });    
    if (res.statusCode == 200)  {
      ++stats.ok;
    } else {
      ++stats.err;
    }
    stats.print();
    hammer();
  }).on('error', function(err) {
    stats.time += microtime.now() - start;
    console.log('error:', url, err);
    ++stats.err;
    stats.print();
    hammer();    
  });
};

var CONCURRENT_HAMMERS = 10;
while (--CONCURRENT_HAMMERS >= 0) {
  hammer();
}
