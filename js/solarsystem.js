$(document).ready(function(){
  //init html/js
  //slider bar functions
  $("#slider").slider(); //create slider bar
  $("#slider").on("mouseenter",function(){ //show slider bar info when mouse over
      $("#label").slideToggle();
  });
  $("#slider").on("mouseleave",function(){ //remove slider bar info when mouse leave
      $("#label").slideToggle();
  });
  var speed = 0;
  $("#slider").mousemove(function(){
    speed = +$('#slider').slider("option", "value");
    $("#speed_value").text("×"+speed);
  });
  //button click
  var drawpath = false; // set if draw the path
  $("#draw").click(function(){
    if(drawpath == false){
      drawpath = true;
      $("#draw").text("Erase Path");
    }
    else {
      drawpath = false;
      $("#draw").text("Draw Path");
    }
  });
  //canvas background
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  var backimg = new Image();
  backimg.src = "./img/space.jpg";
  backimg.onload = function(){
    ctx.drawImage(backimg,0,0);
    };

  //draw Solar system


});
