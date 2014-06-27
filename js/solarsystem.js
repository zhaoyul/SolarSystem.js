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
	ctx2.clearRect ( 0 , 0 , canvas_layer2.width , canvas_layer2.height );
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
	ctx2.clearRect ( 0 , 0 , canvas_layer2.width , canvas_layer2.height );
    if(geocentric == false){
      geocentric = true;
      $("#system").text("Geocentric");
    }
    else {
      geocentric = false;
      $("#system").text("Heliocentric");
    }
  });
  //canvas_layer1 background
  var canvas_layer1 = document.getElementById("canvas_layer1");
  var canvas_layer2 = document.getElementById("canvas_layer2");
  ctx1 = canvas_layer1.getContext("2d");
  ctx2 = canvas_layer2.getContext("2d");
  var backimg = document.getElementById("background");

  //draw Solar system
  var number_planet = 9;
  var planets = new Array(number_planet);
  var maximagesize = 15; // same width and heigth
  var center_x = canvas_layer1.width/2 - maximagesize/2;
  var center_y = canvas_layer1.height/2 - maximagesize/2;
  var planet_distance = 30;
  var timer = 0;
  var interval_time = 100;
  var earth_year = 6000; // how long a earth year on this canvas_layer1, unit is ms
  var orbit_portion = earth_year/interval_time;
  var cycle_H = [0.000001,0.24,0.62,1,1.88,11.86,29.46,84,165]; //first element should be zero, set to 0.000001 is to avoid divid by zero
  var cycle_G = [1,0.24,0.62,0.000001,1.88,11.86,29.46,84,165];
  var orbit_color = ["red","ivory","gold","deepskyblue","brown","darkcyan","khaki","powderblue","aqua"]    

  function drawing(){
    ctx1.clearRect ( 0 , 0 , canvas_layer1.width , canvas_layer1.height );
	ctx1.drawImage( backimg , 0 , 0 , canvas_layer1.width , canvas_layer1.height ); // no need to clear because of this
    for(i = 0; i < number_planet; i++){
      planets[i] = document.getElementById(i);
	  var x,y,new_x,new_y; //current x,y on canvas_layer1, and sun center for other planet
	  if(geocentric == false){
		  var movement = Math.PI*(1/orbit_portion)*timer/cycle_H[i];
		  x = center_x+Math.cos(movement)*planet_distance*i;
		  y = center_y+Math.sin(movement)*planet_distance*i;
		  ctx1.drawImage(planets[i], x, y, maximagesize, maximagesize);
	  }
	  else{
		  var movement = Math.PI*(1/orbit_portion)*timer/cycle_G[i];
		  if(i==0){ // sun
			x = center_x+Math.cos(movement)*planet_distance*(i-3);
			y = center_y+Math.sin(movement)*planet_distance*(i-3);
			ctx1.drawImage(planets[i], x, y, maximagesize, maximagesize);
			new_x = center_x+Math.cos(movement)*planet_distance*(i-3);
			new_y = center_y+Math.sin(movement)*planet_distance*(i-3);
		  }
		  else if(i==3){ // earth
			x = center_x+Math.cos(movement)*planet_distance*(i-3);
			y = center_y+Math.sin(movement)*planet_distance*(i-3);
			ctx1.drawImage(planets[i], x, y, maximagesize, maximagesize);
		  }			
		  else{
			x = new_x+Math.cos(movement)*planet_distance*i;
			y = new_y+Math.sin(movement)*planet_distance*i;
			ctx1.drawImage(planets[i], x, y, maximagesize, maximagesize);
			}
	  }
      if(drawpath == true){ //draw path if button clicked
        if(geocentric == false){
			ctx2.beginPath();
			ctx2.lineWidth="2";
			ctx2.strokeStyle=orbit_color[i];
			ctx2.arc(center_x+maximagesize/2 ,center_y+maximagesize/2,i*planet_distance,0,360,false);
			ctx2.stroke();
		}
		else{
			ctx2.fillStyle = orbit_color[i];
			ctx2.fillRect(x+maximagesize/2,y+maximagesize/2,2,2);
		}
      }
    }
    timer += 1*(speed+1);
  }
 
  //start rolling
  var myInterval = setInterval(function(){drawing()}, interval_time);
  $("#canvas_layer2").mouseover(function(){
	clearInterval(myInterval);
  });
  $("#canvas_layer2").mouseleave(function(){
	myInterval = setInterval(function(){drawing()}, interval_time);
  });

});
