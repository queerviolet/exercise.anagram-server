require 'sinatra'
require 'json'

get '/:word' do |word|
  content_type :json
  # TODO: Return anagrams.
  [].to_json
end

get '/' do
  send_file 'index.html'
end