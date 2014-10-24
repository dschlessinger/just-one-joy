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
// $('.joyContainer').delegate('.plus', 'click', function(e){
//   graphContainer = $(this).closest('div').find('canvas').attr('id')
//   e.preventDefault();
//   $.ajax({
//     url: '/graph/post',
//     data: {id: $(this).closest('.thumbnail').attr('id')}
//   }).done(function(data){
//     console.log(data)
//     var graphData = {
//         labels: ["Post"],
//         datasets: [
//             {
//                 label: "This",
//                 fillColor: "rgba(220,220,220,0.5)",
//                 strokeColor: "rgba(220,220,220,0.8)",
//                 highlightFill: "rgba(220,220,220,0.75)",
//                 highlightStroke: "rgba(220,220,220,1)",
//                 data: [data.this_score]
//             },
//             {
//                 label: "All",
//                 fillColor: "rgba(151,187,205,0.5)",
//                 strokeColor: "rgba(151,187,205,0.8)",
//                 highlightFill: "rgba(151,187,205,0.75)",
//                 highlightStroke: "rgba(151,187,205,1)",
//                 data: [data.all_score]
//             }
//         ]
//     };
//     $('#' + graphContainer).css("display","block")
//     $('#' + graphContainer).show( "slide",
//       {direction: "down", distance: "200px"}, 1000 );
//     });
//     $('#' + graphContainer).css("","block")
//     createGraph(graphData, graphContainer);
//   });
// });
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
        datasetFill : true,
        legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    };
    var myChart = new Chart(ctx).Line(data, options);
  } else {
    var options = {
      scaleOverride: true,
      scaleStartValue: 0,
      scaleStepWidth: 10,
      scaleSteps: 10,
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
    var myChart = new Chart(ctx).Bar(data, options);
  }
}

function switchToGraph(){
  $(this).addClass('graph-current')
  $('.joyContainer').fadeOut("slow")
  setTimeout(function(){
    // $('.graphContainer').css("width","900")
    $('#graphContainer').css("display","block")
  }, 700)
}

function numberArray(i){return i?numberArray(i-1).concat(i):[]}

$('.graph').click(function(e){
  e.preventDefault();
  switchToGraph();
  $.ajax({
    url: '/graph/all'
  }).done(function(data){
    dataArray = data.posts
    dataArray.push(data.average)
    labels = numberArray(dataArray.length - 1)
    labels.push("Overall")
    var graphData = {
        labels: labels,
        datasets: [
            {
                label: "This vs. All",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: dataArray
            }
        ]
    };
    createGraph(graphData, 'graphContainer', 'line');
  });
});