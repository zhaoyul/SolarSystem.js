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
  //button clicked
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
  //backimg.onload = function(){
    ctx.drawImage(backimg,0,0);
    //};

  //draw Solar system
  var planets = new Array(9);
  var center_x = canvas.width/2;
  var center_y = canvas.height/2;
  var timer = 0;
  var cycle = [0.000001,0.24,0.62,1,1.88,11.86,29.46,84,165];
  function drawing(){
    ctx.clearRect ( 0 , 0 , 500 , 500 );
    for(i = 0; i < 9; i++){
      planets[i] = document.getElementById(i);
      var movement = Math.PI*(1/30)*timer/cycle[i];
      ctx.drawImage(planets[i],center_x+Math.cos(movement)*30*i,center_y+Math.sin(movement)*30*i, 10, 10);
    }
    timer += 1*(speed+1);
  }
  setInterval(function(){drawing()}, 100);



});
