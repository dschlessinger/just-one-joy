$('h1.welcome').css({ 'width':'100%', 'text-align':'center' });
var h1 = $('h1.welcome').height();
var h = h1/2;
var w1 = $(window).height();
var w = w1/2;
var m = w - h
$('h1.welcome').css("margin-top",m + "px")

$('.forgot-pass').click(function(event) {
  $(".pr-wrap").toggleClass("show-pass-reset");
});

$('.pass-reset-submit').click(function(event) {
  $(".pr-wrap").removeClass("show-pass-reset");
});