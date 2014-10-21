helpers do
  def current_user
    if session[:user_id] != nil
      @current_user ||= User.find_by_id(session[:user_id])
    end
  end

  def logged_in?
    !current_user.nil?
  end
end
