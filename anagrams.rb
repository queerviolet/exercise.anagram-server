require 'sinatra'
require 'json'
require_relative 'dict'

def canonical(word)
  word.downcase.split('').sort.join
end

ANAGRAMS = {}
WORDS.each do |word|
  c = canonical(word)
  ANAGRAMS[c] = ANAGRAMS[c] || []
  ANAGRAMS[c].push(word)
end

get '/:word' do |word|
  content_type :json
  ANAGRAMS[canonical(word)].to_json
end

get '/' do
  send_file 'index.html'
end