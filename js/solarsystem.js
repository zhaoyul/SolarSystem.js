$(document).ready(function(){
  //init html/js
  //slider bar functions
  $("#slider").slider(); //create slider bar
  var speed = 0;
  $("#slider").mousemove(function(){
    speed = +$('#slider').slider("option", "value");
    $("#speed_value").text("×"+speed);
  });
  $("#slider").hover(function(){
    $("#label").slideToggle();
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

  //draw Solar system
  var planets = new Array(9);
  var maximage_width = 10;
  var maximage_heigth = 10;
  var center_x = canvas.width/2 - maximage_width/2;
  var center_y = canvas.height/2 - maximage_heigth/2;
  var timer = 0;
  var cycle = [0.000001,0.24,0.62,1,1.88,11.86,29.46,84,165]; //first element should be zero, set to 0.000001 is to avoid divid by zero
  function drawing(){
    ctx.clearRect ( 0 , 0 , 500 , 500 );
    ctx.drawImage(backimg,0,0);
    for(i = 0; i < 9; i++){
      planets[i] = document.getElementById(i);
      var movement = Math.PI*(1/30)*timer/cycle[i];
      ctx.drawImage(planets[i],center_x+Math.cos(movement)*30*i,center_y+Math.sin(movement)*30*i, maximage_width, maximage_heigth);
      if(drawpath == true){
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="green";
        ctx.arc(center_x+maximage_width/2 ,center_y+maximage_heigth/2,i*30,0,360,false);
        ctx.stroke();
      }
    }
    timer += 1*(speed+1);
  }
  setInterval(function(){drawing()}, 100);



});
