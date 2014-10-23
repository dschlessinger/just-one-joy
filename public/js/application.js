$(document).ready(function() {
  function updateCountdown() {
    var remaining = 140 - $('.message').val().length;
    $('.countdown').text(remaining + ' characters remaining.');
  }

  updateCountdown();
  $('.message').change(updateCountdown);
  $('.message').keyup(updateCountdown);


  $('a[data-filter]').on('click', function(e){
    $('.joyFilter .current').removeClass('current');
    $(this).addClass('current');
    $('.joyContainer').isotope({ filter: $(this).data('filter') });
  });
});

  // var $container = $('.joyContainer');

  // $container.isotope({
  //   itemSelector: '.thumbnail',
  //   masonry: {
  //     columnWidth: 296
  //   }
  // })

// $(function(){
// $('.joyContainer').delegate('.plus', 'click', function(){
//   var slider = $(this).parent().parent()
//   slider.toggle("slide", {direction: "down", distance: "296px"});
// });
// })

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

$('.joyContainer').delegate('.star', 'click', function(e) {
  e.preventDefault();
  $.ajax({
    url: '/star_post',
    type: 'POST',
    data: {id: $(this).closest('.thumbnail').attr('id')}
  }).done(function(data) {
    var $span = $('#star' + data.id)
    if (data.boolean === true) {
      $span.attr('class','glyphicon glyphicon-star')
    } else {
      $span.attr('class','glyphicon glyphicon-star-empty')
    }
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