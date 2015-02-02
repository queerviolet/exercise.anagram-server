# exercise.anagram-server
Make a couple of small HTTP servers that find and return anagrams.

## Introduction ##

Remember [making anagrams](https://github.com/nyc-squirrels-2015/anagrams-2-generating-anagrams-challenge)?

We're going to do that again, only now we're going to make an anagrams HTTP
server that you can query with a word and have it reply with all the anagrams
of that word.

## 1. The anagrams API ##

You're actually making a simple web API. Here's how it'll work:

To find all the anagrams of a word, `GET /:word`. The result will be returned
as a JSON list.

So, if you go to `http://localhost:3000/agnor`, the server should reply:

    ["Ronga","rogan","organ","orang","Orang","nagor","groan","grano","goran","argon","angor"]

That's it! We'll set up the server to serve a little test page at `/` that
makes XMLHttpRequests for whatever we type into a text box and prints the
results.

## 2. Write it in Ruby with Sinatra ##

You can solve the anagrams problem however, even reusing your Phase 1 code if
you like. I've gotten you started on the Sinatra code in
[app/controllers/anagrams.rb](app/controllers/anagrams.rb).

You can run your server with the `shotgun` command. Shotgun restarts
your server on every request, so you don't have to keep doing it.

You might take this moment to see if you can improve your methodology at all,
or simplify your life in some other way. For example, I wrote a script to
convert the dictionary into a *giiiiiiiant* Ruby array literal, so I could just
`require_relative 'dict'`.

When you have it working, you should be able to run your program with `ruby anagrams.rb`,
and make requests like: `http://localhost:9393/this`.

The Sinatra skeleton is set up to serve files from [public](public). There's an
[index.html](index.html) there which will query your server for anagrams as you type.

## 3. Benchmark it! ##

I've included a little node program [bench.js](bench.js) that hammers away at
an Anagrams server as fast as it can.

First, you'll need to run `npm install` to download the
dependencies. This is equivalent to `bundle install`, and you only
have to do it once.

Next, if you're running your server under shotgun, kill it with ^C and start
it with `rackup` instead, running on port 4567:

    rackup -p 4567

Why? Remember, `shotgun` restarts your server each time a new
connection comes in. You don't want to be doing that in the middle of
a benchmark.

Finally, run the benchmark with `node bench.js` and see what results
you get!

bench.js reports results in kqps—that is, thousands of queries per second. My
Sinatra program was able to handle about 0.75kqps—that is, 750,000 anagram
lookups per second on my laptop.

On the lab machines, you should see better performance than that. If you're
not, maybe you can change your server to be faster somehow. I'll give you a
hint: my server does almost no work at all when serving anagrams, but it
probably takes longer to start up and consumes more memory than yours.

That 0.75kqps number is with a maximum of one request in flight. One request
in flight means that the benchmark is sending a request, waiting for it to
come back, then sending another. If you set `CONCURRENT_HAMMERS` in bench.js
to a higher number, it'll send out more requests at a time. If I set it to 2,
I get around 0.42kqps. If I set it to 5, it drops to 0.17kqps. If I set it to
10, I get around 0.087kqps—a measley 87,000 queries per second. As we increase
the number of concurrent requests, performace is plummeting precipitiously.

Why do you suppose this is?

## 4. Write it in Javascript with Express ##

Now do it again, this time in Javascript. [Express](http://expressjs.com/) is
a small web framework for Node. It's inspired by Sinatra, so the code will
look somewhat similar. I've started you off in [anagrams.js](anagrams.js).
Also, it's your lucky day: since bench.js requires a word dictionary, I've
included my `dict.js` in the repository, so you can use it. It's already
required by the code in [anagrams.js](anagrams.js). `words` there is an array
of words taken from `/usr/share/dict/words` on my computer.

## 5. Test it out ##

Since both of your anagrams servers have the same interface, you shouldn't
have to change `index.html` at all to get it to work with the JS server. It
doesn't know or care what it's talking to—it only cares that it can `GET /some_word`
and get a JSON response.

## 6. Race! ##

Now, for fun, edit [bench.js](bench.js) to point at your Node server.

My Javascript server is about 50% faster than my Ruby server, because the
Javascript engine that powers Node and Chrome (named V8) is faster at this
task (and most tasks) than the Ruby interpreter. Speed is by no means
everything, so that's not the end of the world, but it's good to know.

The performance of the JS server also drops off pretty fast when I scale the
number of concurrent connections. What does that tell us?
