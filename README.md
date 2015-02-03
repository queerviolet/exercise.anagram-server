# exercise.anagram-server
Make a couple of small HTTP servers that find and return anagrams.

## Introduction ##

Remember [making anagrams](https://github.com/nyc-squirrels-2015/anagrams-2-generating-anagrams-challenge)?

We're going to do that again, only now we're going to make an anagrams HTTP
server that you can query with a word and have it reply with all the anagrams
of that word.

## 1. The anagrams API ##

You're actually making a simple web API. Here's how it'll work:

To find all the anagrams of a word, `GET /anagrams?word=:word`. The result will be returned
as a JSON list.

So, if your server is running on `localhost` on port `9393` and you go to
`http://localhost:9393/anagrams?word=agnor`, the server should reply with all
the dictionary words that are anagrams of "agnor":

    ["Ronga","rogan","organ","orang","Orang","nagor","groan","grano","goran","argon","angor"]

Believe it or not, those are all real words in `/usr/share/dict/words`.

That's it! We'll set up the server to serve a little test page at `/` that
makes XMLHttpRequests for whatever we type into a text box and prints the
results.

## 2. Write it in Ruby with Sinatra ##

You can solve the anagrams problem however you like, even reusing your Phase 1
code if you want. I've gotten you started on the Sinatra code in
[app/controllers/anagrams.rb](app/controllers/anagrams.rb).

You can run your server with the `shotgun` command. Shotgun restarts your
server on every request, so you don't have to restart it after you make
changes.

When you have it working, you should be able to run your program with `ruby anagrams.rb`,
and make requests like: `http://localhost:9393/anagrams?word=this`.

The Sinatra skeleton is set up to serve files from [public](public). There's
an [index.html](public/index.html) there which will let you search for
anagrams.  Take a look at it, figure out how it's displaying search results,
then take your server for a spin.

## 3. Anagrams Instant Backend ##

If your server is anything like my first attempt, it's pretty slow. It took
about thirty seconds to handle one anagram query. I think that we can improve
on that a lot.

Let's think about where we're spending our time. Right now, every time we get
a query, we scan over the entire dictionary looking for other words with the
same canonical form. Maybe that's something we could do beforehand! Before we
dive into that, Let's do some back of the envelope calculations to see if it's
even remotely feasible.

  * We'll have to store every word in memory. There are 250k words in our
    dictionary. It looks like most words only have a few anagrams. Let's say the
    full set of anagrams for each word would be around 100 bytes (approximately 100
    characters). It's probably less than that. But even if it isn't, we would only
    have to store 250_000 * 100 bytes = 25_000_000 bytes = 25 MB
    of data in memory. Unless you're running your server on a wristwatch, that sort
    of memory use is not a problem. (And actually, most smart watches have at least
    512 MB of memory).

  * We'll also have to find all anagrams for every word in the dictionary. If we use
    our current method, it'll probably take about an hour to do that. That's bad, but
    it's not the end of the world. Our data is totally static, so we could generate
    all the anagrams once and save them in a data file to use later. But maybe we can also
    come up with a faster way of finding anagrams, one in which we only have to make
    one pass over the dictionary.

Now that we know it's feasible, let's think about how we should structure our index.

We want to do very fast lookups into a literal dictionary, so a hash seems
like a good choice. What should the keys and values be?

Let's start with the values: it's a good bet that the values should be what we
want to return, a list of words.

What should the keys be? Well, we'll be receiving a word as a query, so we
have to be able to derive the key from a word. It could just *be* the word,
but I think that would make building the index difficult, because then each
word in the dictionary will potentially exist under multiple keys, and as
we loop through the dictionary, how will we know which keys to shovel each
word into without looking at all the others? That's exactly what we don't
want to do!

What we really want is for all words which are anagrams of each other to
have the same key. 

I'll let you take it from here.

## 4. Anagrams Instant Frontend ##

Once you've got your anagrams server running (much, much) faster, let's make
our little test frontend page do search as you type. We're going to do this in
a very simple way: add an `oninput` attribute to the word input field, and
have it call `submit` on its parent form.