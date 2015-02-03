get '/anagrams' do
  content_type :json
  # TODO: Return anagrams for params[:word]
  ['foo', 'bar', 'baz', params[:word]].to_json
end

get '/' do
  redirect '/index.html'
end