jQuery(document).ready(function($) {
  function updateCountdown() {
      var remaining = 140 - jQuery('.message').val().length;
      jQuery('.countdown').text(remaining + ' characters remaining.');
  }

  updateCountdown();
  $('.message').change(updateCountdown);
  $('.message').keyup(updateCountdown);
});


$('#post-form').submit(function(e){
	e.preventDefault();
	$.ajax({
		url: '/posts',
		type: 'POST',
		data: $('#post-form').serialize(),
		dataType: 'json',
		beforeSend: function(){
			$(".wrapper").slideUp(700);
		}}).done(function(data){
			// $('h3.welcome').text("You're feeling joyful about...")
	    post = "<h3 class='welcome'><span class='post-date'>" + data.created_at + "</span> - " + data.body + "</h3>";
	    setTimeout(function(){$('h3.welcome').after($(post).fadeIn("slow"))},800);
	    $('h1.welcome').slideUp(700);
		});
});