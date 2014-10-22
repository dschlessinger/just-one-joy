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
		beforeSend: function(){
			$(".wrapper").slideUp(700);
		}}).done(function(data){
			$('.wrapper').after(data);
		});
});