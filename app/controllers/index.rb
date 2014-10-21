get '/' do
	if logged_in?
		erb :index
	else
		erb :_log_in
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

post '/users' do
  new_user = User.new(params[:user])
  if new_user.save
  	session[:user_id] = new_user.id
  end
  redirect '/'
end

delete '/sessions/:id' do
  session.clear
  redirect '/'
end