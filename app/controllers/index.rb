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

get '/graph/all' do
  posts = Post.all.pluck(:sentiment)
  labels = (1..posts.length).to_a.each_with_index{|x,i| x = "Post #{i}"}
  averages = []
  posts.each_with_index{|score,index| averages << ((posts[0..index].inject(:+))/(index+1)) }
  content_type :json
  {averages: averages, posts: posts, labels: labels}.to_json
end

get '/graph/post' do
  post = Post.find(params[:id])
  content_type :json
  {post_score: post.sentiment, all_score: current_user.average, id: post.id}.to_json
end

get '/posts' do
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  erb :my_html, layout: false
end

post '/posts' do
  post = Post.create(params)
  @today = current_user.posts.where(updated_at: Date.yesterday.to_time...Time.current).order(updated_at: :desc)
  @posts = current_user.posts.order(updated_at: :desc)
  p "*"*100
  erb :my_html, layout: false
end

post '/star_post' do
  post = Post.find(params[:id])
  post.starred == true ? post.starred = false : post.starred = true
  post.save
  content_type :json
  return {id: post.id, boolean: post.starred}.to_json
end