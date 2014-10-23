$(document).ready(function() {
  function updateCountdown() {
    var remaining = 140 - $('.message').val().length;
    $('.countdown').text(remaining + ' characters remaining.');
  }

  updateCountdown();
  $('.message').change(updateCountdown);
  $('.message').keyup(updateCountdown);


  // $('a[data-filter]').on('click', function(e){
  //   e.preventDefault();
  //   $('.joyContainer').html($('.' + $(this).data('filter'))
  //   // $('.' + $(this).data('filter').css("display","none");
  // })
});

$('#post-form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/posts',
    type: 'POST',
    data: $('#post-form').serialize(),
    beforeSend: function() {
      setTimeout(function(){
        $("h1.welcome").fadeOut(700);
      }, 0)
      $(".wrapper").fadeOut(700);
      $("h3.welcome").eq(0).fadeOut(700);
    }
  }).done(function(data) {
    $('.joy-outer-container').css("display","block")
    $('.joy-outer-container').animate({
      opacity: 1
    }, 500);
    $('.joyContainer').append(data);
  });
});

$('#display-posts-button').click(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/posts',
    beforeSend: function() {
      setTimeout(function(){
        $("h1.welcome").fadeOut(700);
      }, 0)
      $(".wrapper").fadeOut(700);
      $("h3.welcome").eq(0).fadeOut(700);
    }
  }).done(function(data) {
    setTimeout(function(){
      $('.joy-outer-container').css("display","block");
    },0)
    $('.joy-outer-container').animate({
      opacity: 1
    }, 500);
    $('.joyContainer').append(data);
  });
});