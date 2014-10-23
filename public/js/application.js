$(document).ready(function() {
  function updateCountdown() {
    var remaining = 140 - $('.message').val().length;
    $('.countdown').text(remaining + ' characters remaining.');
  }

  updateCountdown();
  $('.message').change(updateCountdown);
  $('.message').keyup(updateCountdown);

  $('#post-form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      url: '/posts',
      type: 'POST',
      data: $('#post-form').serialize(),
      beforeSend: function() {
        setTimeout(function() {
          $(".wrapper").fadeOut(700);
        }, 0);
        $($("h1.welcome")[0]).fadeOut(700);
      }
    }).done(function(data) {
      $('.joy-outer-container').animate({
        opacity: 1
      }, 500);
      $('.joyContainer').append(data);
    });
  });
});