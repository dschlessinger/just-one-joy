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

post '/posts' do
  Post.create(params)
  midnight = Time.now.midnight.utc
  @today = current_user.posts.where("user_id = ? AND updated_at >= ? AND updated_at < ?", current_user.id, midnight, midnight.advance(:days => 1)).reverse
  @posts = Post.where("user_id = ?", current_user.id).reverse
  erb :my_html, layout: false
end