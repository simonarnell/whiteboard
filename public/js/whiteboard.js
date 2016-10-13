window.onload = function() { 
var canvas = document.getElementById('workspace')
var context = canvas.getContext("2d");
canvas.width  = canvas.parentNode.offsetWidth;
canvas.height = canvas.parentNode.parentNode.parentNode.offsetHeight-parseInt(getComputedStyle(canvas.parentNode.parentNode.parentNode).marginBottom);
console.log(canvas.parentNode.parentNode.parentNode.offsetHeight)
console.log(parseInt(getComputedStyle(canvas.parentNode.parentNode.parentNode).marginBottom),10)
var stroke = new Object();
var drawing = false;

var socket = io.connect('/whiteboard');
socket.on("draw", remoteDraw);
socket.on("clear", function() {
	clear(true);
});

window.scrollTo(0, 1);



canvas.addEventListener("mousedown", function(event) {
	draw("mousedown", event)
  });
canvas.addEventListener("mouseup", function(event) {
	draw("mouseup", event)
  });
canvas.addEventListener("mousemove", function(event) {
	draw("mousemove", event)
  });
canvas.addEventListener("mouseout", function(event) {
	draw("mouseout", event)
  });
canvas.addEventListener("touchstart", function(event) {
	draw("touchstart", event)
  });
canvas.addEventListener("touchend", function(event) {
	draw("touchend", event)
  });
canvas.addEventListener("touchmove", function(event) {
	event.preventDefault();
	draw("touchmove", event)
  });
canvas.addEventListener("touchcancel", function(event) {
	draw("touchcancel", event)
  });
document.getElementById("clear-palette").getElementsByClassName("toolButton")[0].addEventListener("click", function() {
	clear(false);
});

function clear(remote) {
	context.clearRect(0,0,canvas.width,canvas.height);
	if(remote == false)
		socket.emit("clear", "clear")
}

function remoteDraw(event) {
  draw("remoteDraw", event);
}

function draw(eventType, event) {
	if(eventType == "remoteDraw") {
	  stroke = JSON.parse(event);
	  console.log("remotedraw");
	} else {
		stroke.previousX = stroke.x;
		stroke.previousY = stroke.y;
		stroke.canvasWidth = canvas.width;
		stroke.canvasHeight = canvas.height;
		stroke.style = selectedColour;
		stroke.lineWidth = selectedWidth.substring(0,selectedWidth.length-2);
	}
	
	if(eventType.substring(0,5) == "mouse") {
	  stroke.x = event.clientX - canvas.offsetLeft;	
	  stroke.y = event.clientY - canvas.offsetTop;
	} else if(eventType.substring(0,5) == "touch" && eventType.substring(5,eventType.length) != "end")  {
	  stroke.x = event.touches[0].clientX - canvas.offsetLeft;	
	  stroke.y = event.touches[0].clientY - canvas.offsetTop;
	}
	
	if(eventType == "mousedown" || eventType == "touchstart")
		drawing = true;
	
	if(drawing && (eventType == "mousemove" || eventType == "touchmove")) {
	drawStroke(stroke);
	socket.emit("draw",JSON.stringify(stroke));
	}
	
	if(eventType == "remoteDraw") {
	  stroke.previousX = stroke.previousX * (canvas.width / stroke.canvasWidth);
	  stroke.previousY = stroke.previousY * (canvas.height / stroke.canvasHeight);
	  stroke.x = stroke.x * (canvas.width / stroke.canvasWidth);
	  stroke.y = stroke.y * (canvas.height / stroke.canvasHeight);
	  drawStroke(stroke);
	}
	
	if(eventType == "mouseup" || eventType == "mouseout" || eventType == "touchend" || eventType == "touchcancel" )
		drawing = false;
}

function drawStroke(stroke) {
    context.beginPath();
    context.moveTo(stroke.previousX, stroke.previousY);
    context.lineTo(stroke.x, stroke.y);
    context.strokeStyle = stroke.style;
    context.lineWidth = stroke.lineWidth;
    context.stroke();
    context.closePath();
}
};