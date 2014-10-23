require 'time'
require 'date'

get '/' do
	if logged_in?
		erb :index
	else
		erb :log_in
	end
end

post '/sessions' do
  user = User.find_by email: params[:email]
  if user && user.password == params[:password]
    session[:user_id] = user.id
  end
  redirect '/'
end

#----------- USERS -----------

get '/users/new' do
	erb :sign_up
end

post '/users/new' do
  new_user = User.new(params)
  if new_user.save
  	session[:user_id] = new_user.id
  end
  redirect '/'
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end

#----------- POSTS -----------

get '/posts' do
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end

post '/posts' do
  result = Alchemy.new(API_KEY, params[:body]).text_analysis ||=
  Post.create(params.merge(sentiment: result))
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end