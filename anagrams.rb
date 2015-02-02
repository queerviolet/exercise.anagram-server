require 'sinatra'
require 'json'

require_relative 'dict'

# dict = open('dict.js')

get '/:word' do |word|
  content_type :json
  # TODO: Return anagrams.


def is_anagram?(word1, word2)
  canonical(word1) == canonical(word2)
end

def canonical(word)
  word.downcase.split("").sort
end

def anagrams_for(word1, words)
  anagrams_found = []
  words.each do |word|
    anagrams_found.push(word) if is_anagram?(word1, word)
  end
  return anagrams_found
end

  anagrams = anagrams_for(word, WORDS)

  anagrams.to_json
end


get '/' do
  send_file 'index.html'
end
