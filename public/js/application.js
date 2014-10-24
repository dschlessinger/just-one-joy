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
    $('#graphContainer').fadeOut("slow")
    $('.joyContainer').fadeIn("slow")
    $(this).addClass('current');
    $('.joyContainer').isotope({ filter: $(this).data('filter') });
  });
});



// var $container = $('.joyContainer');

// $('.joyContainer').isotope({
//   itemSelector: '.thumbnail',
//   getSortData: {
//     joyScore: function( itemElem ) {
//       var joyScore = $( itemElem ).find('.joyScore').text();
//       return parseFloat( weight.replace( /[\(\)]/g, '') );
//     }
//   }
// })

// $('.joyContainer').on( 'click', 'button', function() {
//   var sortValue = $(this).attr('data-sort-value');
//   $('.joyContainer').isotope({ sortBy: sortValue });
// });

// $(function(){
$('.joyContainer').delegate('.plus', 'click', function(e){
  smallGraphContainer = $(this).closest('div').find('canvas').attr('id')
  e.preventDefault();
  $.ajax({
    url: '/graph/post',
    data: {id: $(this).closest('.thumbnail').attr('id')}
  }).done(function(data){
    label = 'Post ' + data.id + ' vs. Overall'
    console.log(data)
    var graphData = {
        labels: [label],
        datasets: [
            {
                label: label,
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [data.post_score]
            },
            {
                label: "Overall",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [data.all_score]
            }
        ]
    };
    $('#' + data.id).css("height","500")
    $('#' + data.id).css("width","500")
    $('#' + data.id).css("margin-left","49px")
    $('#' + data.id).css("margin-right","49px")
    $('#' + data.id).css("background-color","rgba(245, 245, 245, 1)")
    $('#' + smallGraphContainer).css("display","block")
    $('#' + smallGraphContainer).css("width","200")
    $('#' + smallGraphContainer).css("height","200")
    createGraph(graphData, smallGraphContainer, 'bar');
  });
});
// })

$('#post-form').submit(function(e) {
  e.preventDefault();
  $.ajax({
    url: '/posts',
    type: 'POST',
    data: $('#post-form').serialize(),
    dataType: 'json',
    beforeSend: function() {
      setTimeout(function(){
        $("h1.welcome").fadeOut(700);
      }, 0)
      $(".wrapper").fadeOut(700);
      $("h3.welcome").eq(0).fadeOut(700);
    }
  }).done(function(data) {
    $('.joyContainer').append(data);
    $('.joy-outer-container').css("display","block")
    $('.joy-outer-container').animate({
      opacity: 1
    }, 500);
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
    $('.joyContainer').append(data);
    setTimeout(function(){
    $('.joy-outer-container').css("display","block");
    },500)
    $('.joy-outer-container').animate({
      opacity: 1
    }, 500);
    // setTimeout(function(){
      // $('.joy-outer-container').animate({'marginTop': '-=5%'}, 2000);
    // }, 2000)
  });
});

// =============================================================




function createGraph(graphData, container, type) {
  var ctx = $('#' + container).get(0).getContext("2d");
  var data = graphData
  if (type == 'line') {
    var options = {
        scaleShowGridLines : true,
        scaleGridLineColor : "rgba(0,0,0,.05)",
        scaleGridLineWidth : 1,
        bezierCurve : true,
        bezierCurveTension : 0.4,
        pointDot : true,
        pointDotRadius : 4,
        pointDotStrokeWidth : 1,
        pointHitDetectionRadius : 20,
        datasetStroke : true,
        datasetStrokeWidth : 2,
        datasetFill : false,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
    myChart = new Chart(ctx).Line(data, options);
  } else {
    var options = {
      scaleOverride: true,
      scaleStartValue: 0,
      scaleStepWidth: 20,
      scaleSteps: 5,
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
    myChart = new Chart(ctx).Bar(data, options);
  }
}

function switchToGraph(){
  $(this).addClass('graph-current')
  $('.joyContainer').fadeOut("slow")
  setTimeout(function(){
    $('#graphContainer').css("width","900")
    $('#graphContainer').css("height","400")
    $('#graphContainer').css("display","block")
  }, 700)
}

function numberArray(i){return i?numberArray(i-1).concat(i):[]}
function createAverageArray(numberArrayLength, number){
  var averageArray = []
  for(var i=0; i < numberArrayLength; i++){
    averageArray.push(number)
  }
  return averageArray
}

$('.graph').click(function(e){
  e.preventDefault();
  switchToGraph();
  // $('#graphContainer').css("width","900")
  // $('#graphContainer').css("height","400")
  $.ajax({
    url: '/graph/all'
  }).done(function(data){
    dataArray = data.posts
    averageArray = createAverageArray((dataArray.length), data.average)
    postArray = numberArray(dataArray.length)
    var graphData = {
        labels: data.labels,
        datasets: [
            {
              label: "Individual Post Score",
              fillColor: "rgba(220,220,220,0.5)",
              strokeColor: "rgba(220,220,220,0.8)",
              highlightFill: "rgba(220,220,220,0.75)",
              highlightStroke: "rgba(220,220,220,1)",
              data: data.posts
            },
            {
              label: "Overall Score",
              fillColor: "rgba(151,187,205,0.5)",
              strokeColor: "rgba(151,187,205,0.8)",
              highlightFill: "rgba(151,187,205,0.75)",
              highlightStroke: "rgba(151,187,205,1)",
              data: data.averages
          }
        ]
    };
    // if (typeof(myChart) === 'object') {
    //   myChart.destroy();
    // }
    createGraph(graphData, 'graphContainer', 'line');
  });
});