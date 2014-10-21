jQuery(document).ready(function($) {
  function updateCountdown() {
  		prelength = jQuery('.message').val().length
      var remaining = (500 + prelength) - jQuery('.message').val().length;
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
			$("#post-form").slideUp(600);
		}}).done(function(data){
	    post = "<h3 class='welcome'>" + data.body + "</h3>"
	    setTimeout(function(){$(".welcome").after($(post).fadeIn("slow"))},600)
		});
});
    // , function() {
    //      $(this).html("<img src='images/thanks.png'/>").slideDown(1000);
    // });