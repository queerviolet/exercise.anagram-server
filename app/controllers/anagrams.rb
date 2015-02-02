get '/:word' do |word|
  content_type :json
  # TODO: Return anagrams.
  [].to_json
end

get '/' do
  redirect '/index.html'
end