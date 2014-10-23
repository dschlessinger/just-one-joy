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
    $('.graph').removeClass('graph-current')
    $('.graphContainer').fadeOut("slow")
    $('.joyContainer').fadeIn("slow")
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

// =============================================================

function createGraph() {
  var ctx = $(".graphContainer").get(0).getContext("2d");
  ctx.clearRect(0, 0, 900, 400);
  var data = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 80, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.5)",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 86, 27, 90]
          }
      ]
  };
  var options = {
      scaleBeginAtZero : true,
      scaleShowGridLines : true,
      scaleGridLineColor : "rgba(0,0,0,.05)",
      scaleGridLineWidth : 1,
      barShowStroke : true,
      barStrokeWidth : 2,
      barValueSpacing : 5,
      barDatasetSpacing : 1,
      legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
  }
  var myBarChart = new Chart(ctx).Bar(data, options);
  // canvas.onclick = function(evt){
  //   var activeBars = myBarChart.getBarsAtEvent(evt);
  // };
  // return myBarChart
}

function switchToGraph(){
  $(this).addClass('graph-current')
  $('.joyContainer').fadeOut("slow")
  setTimeout(function(){
    $('.graphContainer').css("width","900")
    $('.graphContainer').css("height","400")
    $('.graphContainer').css("display","block")
  }, 700)
}

$('.graph').click(function(){
  // var ctx = document.getElementsByClassName('graphContainer').getContext('2d')
  // ctx.clearRect(0, 0, 900, 400);
  switchToGraph();
  // if ($('.graphContainer').toDataURL() == document.getElementById('blank').toDataURL()) {
  createGraph();
  // }
});