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
  var geocentric = false;
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
  $("#system").click(function(){
    if(geocentric == false){
      geocentric = true;
      $("#system").text("Geocentric");
    }
    else {
      geocentric = false;
      $("#system").text("Heliocentric");
    }
  });
  //canvas background
  var canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  var backimg = document.getElementById("background");

  //draw Solar system
  var number_planet = 9;
  var planets = new Array(number_planet);
  var maximagesize = 15; // same width and heigth
  var center_x = canvas.width/2 - maximagesize/2;
  var center_y = canvas.height/2 - maximagesize/2;
  var planet_distance = 30;
  var timer = 0;
  var interval_time = 100;
  var earth_year = 3000; // how long a earth year on this canvas, unit is ms
  var orbit_portion = earth_year/interval_time;
  var cycle = [0.000001,0.24,0.62,1,1.88,11.86,29.46,84,165]; //first element should be zero, set to 0.000001 is to avoid divid by zero
  function drawing(){
    ctx.clearRect ( 0 , 0 , canvas.width , canvas.height );
    ctx.drawImage( backimg , 0 , 0 , canvas.width , canvas.height );
    for(i = 0; i < number_planet; i++){
      planets[i] = document.getElementById(i);
      var movement = Math.PI*(1/orbit_portion)*timer/cycle[i];
      ctx.drawImage(planets[i],center_x+Math.cos(movement)*planet_distance*i,center_y+Math.sin(movement)*planet_distance*i, maximagesize, maximagesize);
      if(drawpath == true){ //draw path if button clicked
        ctx.beginPath();
        ctx.lineWidth="1";
        ctx.strokeStyle="green";
        ctx.arc(center_x+maximagesize/2 ,center_y+maximagesize/2,i*planet_distance,0,360,false);
        ctx.stroke();
      }
    }
    timer += 1*(speed+1);
  }
 
	//start rolling
  var myInterval = setInterval(function(){drawing()}, interval_time);
  $("canvas").mouseover(function(){
	clearInterval(myInterval);
  });
  $("canvas").mouseleave(function(){
	myInterval = setInterval(function(){drawing()}, interval_time);
  });



});
