var req = new XMLHttpRequest();
req.addEventListener("load", setupColourPalette);
req.open("GET", "colours.json");
req.send();

var selectedColour;

function setupColourPalette () {
  var colours = (JSON.parse(this.responseText)).colours
  var paletteDiv = document.getElementById("colour-palette");
  for(var i = 0; i < colours.length; i++) {
	  colourDiv = document.createElement("div");
	  colourDiv.className = "tool";
	  colourDiv.style.backgroundColor = colours[i].colour;
	  toolIconPositioningDiv = document.createElement("div");
	  toolIconPositioningDiv.className = "toolIconPositioning";
	  toolIconPositioningDiv.appendChild(colourDiv);
	  toolButton = document.createElement("div");
	  toolButton.className = "toolButton";
	  toolButton.addEventListener("click", function(){
		  console.log(this.classList);
		  console.log(selectedColour);
		  if(selectedColour != this.firstChild.firstChild.style.backgroundColor) {
			  buttons = document.getElementById("colour-palette").getElementsByClassName("toolButton");
			  console.log(buttons)
			  for (var button = 0; button < buttons.length; button++) 
				  buttons[button].classList.remove("selected");
			  this.classList.add("selected");
			  selectedColour = this.firstChild.firstChild.style.backgroundColor;
		  }
	  });
	  toolButton.appendChild(toolIconPositioningDiv);
	  if(i==0) {
	    toolButton.classList.add("selected");
	    selectedColour = toolButton.firstChild.firstChild.style.backgroundColor;
	  }
	  paletteDiv.appendChild(toolButton);
  }
}