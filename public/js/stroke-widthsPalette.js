var req = new XMLHttpRequest();
req.addEventListener("load", setupStrokeWidthsPalette);
req.open("GET", "stroke-widths.json");
req.send();

var selectedWidth;

function setupStrokeWidthsPalette () {
  var widths = (JSON.parse(this.responseText)).widths
  var paletteDiv = document.getElementById("stroke-widths-palette");
  for(var i = 0; i < widths.length; i++) {
	  svgLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
	  svgLine.setAttribute("x1",15);
	  svgLine.setAttribute("y1",0);
	  svgLine.setAttribute("x2",15);
	  svgLine.setAttribute("y2",30);
	  svgLine.setAttribute("style", "stroke:rgb(0,0,0);stroke-width:" + widths[i].width);
	  widthsvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	  widthsvg.setAttribute("height",30);
	  widthsvg.setAttribute("width",30);
	  widthsvg.appendChild(svgLine)
	  widthDiv = document.createElement("div");
	  widthDiv.className = "tool";
	  widthDiv.appendChild(widthsvg);
	  toolIconPositioningDiv = document.createElement("div");
	  toolIconPositioningDiv.className = "toolIconPositioning";
	  toolIconPositioningDiv.appendChild(widthDiv);
	  toolButton = document.createElement("div");
	  toolButton.className = "toolButton";
	  toolButton.addEventListener("click", function(){
		  console.log(this.firstChild.firstChild.firstChild.firstChild.style.strokeWidth);
		  if(selectedWidth != this.firstChild.firstChild.firstChild.firstChild.style.strokeWidth) {
			  buttons = document.getElementById("stroke-widths-palette").getElementsByClassName("toolButton");
			  console.log(buttons)
			  for (var button = 0; button < buttons.length; button++) 
				  buttons[button].classList.remove("selected");
			  this.classList.add("selected");
			  selectedWidth = this.firstChild.firstChild.firstChild.firstChild.style.strokeWidth;
			  console.log(selectedWidth);
		  }
	  });
	  toolButton.appendChild(toolIconPositioningDiv);
	  if(i==0) {
	    toolButton.classList.add("selected");
	    selectedWidth = toolButton.firstChild.firstChild.firstChild.firstChild.style.strokeWidth;
	  }
	  paletteDiv.appendChild(toolButton);
  }
}