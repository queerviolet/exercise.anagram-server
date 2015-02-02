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

## 2. Write it in Ruby / Sinatra ##

You can solve the anagrams problem however, even reusing your Phase 1 code if
you like. I've gotten you started on the Sinatra code in
[anagrams.rb](anagrams.rb).

You might take this moment to see if you can improve your methodology at all,
or simplify your life in some other way. For example, I wrote a script to
convert the dictionary into a *giiiiiiiant* Ruby array literal, so I could just
`require_relative 'dict'`.

When you have it working, you should be able to run your program with `ruby anagrams.rb`,
and make requests like: `http://localhost:4567/this`.

## 3. Write the test page ##

The test page is in [index.html](index.html). It's not fancy. It's so not
fancy that it has no stylesheet, and the Javascript right there in the same
file with the HTML, lying together like cats and dogs.

You'll write simple little test pages like this a lot, and it's fine if they
look like this. They are the simplest answer to a simple problem. If the
problem grows, and they become much more complex, they'll start to look ugly
and hard to read. That's a good thing, because at that point, you'll know you
should do some refactoring.

The test page fetches results by constructing an `XMLHttpRequest` with the
appropriate URL. `XMLHttpRequest` is provided by the browser, and it lets web
pages make whatever HTTP requests they want (provided a whole set of security
checks pass) via Javascript.

I am actually going to make you construct and send an `XMLHttpRequest`
manually. There are nicer wrappers for it, but using the request object
manually isn't so bad. Here's the outline of it:

    var xhr = new XMLHttpRequest();
    xhr.onload = function() { doSomethingWith(xhr.response); };
    xhr.open('get', url, true);
    xhr.responseType = 'json';    
    xhr.send();

Since we set the responseType to `json`, the browser will parse the response
for us, and `xhr.response` will be a Javascript array. You can loop or `map`
over it as you like. (Search MDN for the Array methods if you're not sure what
they are—there are far fewer of them than Ruby provides, alas).

When you're done, you should have a test page that searches anagrams as you
type. Neat!

## 4. Benchmark it! ##

I've included a little node program [bench.js](bench.js) that hammers away at
an Anagrams server as fast as it can.

