$(document).ready(function(){
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
		 	event.preventDefault();
		 	return false;
		}
	});
});

$('#form').on('keyup change', 'input, select, textarea', function(){
    getInput();
});

const alphabet = Array("A","Ä","B","C","D","E","F","G","H","I","J","K","L","M","N","O","Ö","P","Q","R","S","T","U","Ü","V","W","X","Y","Z"," ");
const natoAlphabet = Array("alpha","?","bravo","charlie","delta","echo","foxtrot","golf","hotel","india","juliet","kilo","lima","mike","november","oscar","?","papa","quebec","romeo","sierra","tango","uniform","?","victor","whiskey","x-ray","yankee","zulu","-","?");
const germanAlphabet = Array("anton","ärger","berta","cäsar","dora","emil","friedrich","gustav","heinrich","ida","julius","kaufmann","ludwig","martha","nordpol","otto","ökonom","paula","quelle","richard","samuel","theodor","ulrich","übermut","viktor","wilhelm","xanthippe","ypsilon","zacharias","-","?");

function getInput() {
	text = document.getElementById("text").value.toUpperCase();
	printResult();
}

function getLetterID(letter) {
	for (var counter = 0; counter <= alphabet.length; counter++) {
		if (letter == alphabet[counter]) {
			return(counter);
		}
	}
	return(alphabet.length);
}

function printResult() {
	var result = document.getElementById("result");
	while (result.firstChild) {
    	result.removeChild(result.firstChild);
	}
	for (var i = 0; i < text.length; i++) {
		var letterID = getLetterID(text[i]);
		switch(document.getElementById("alphabets").value) {
    		case "nato alphabet":
     	   		var letterWord = document.createTextNode(natoAlphabet[letterID]);
     	   		var alphabet = natoAlphabet;
    		    break;
  			case "german alphabet":
        		var letterWord = document.createTextNode(germanAlphabet[letterID]);
        		var alphabet = germanAlphabet;
        		break;
		}
		var newSpan = document.createElement("div");
		var bgColor = document.createAttribute("style");
		var divClass = document.createAttribute("class");

		bgColor.value = "background-color: " + getColor(letterID);
		divClass.value = "letterWord";

		newSpan.setAttributeNode(bgColor);
		newSpan.setAttributeNode(divClass)
		newSpan.appendChild(letterWord);
		result.appendChild(newSpan);
	}
}

function getColor(letterID) {
	var rWidth = 50; // 0-256
	var gWidth = 40;
	var bWidth = 50;

	var rOffsetX = 60; // 0-100
	var gOffsetX = 30;
	var bOffsetX = 10;

	var rOffsetY = 256; // 0-256
	var gOffsetY = 256;
	var bOffsetY = 256;

	// var rWidth = document.getElementById("rWidth").value;
	// var gWidth = document.getElementById("gWidth").value;
	// var bWidth = document.getElementById("bWidth").value;

	// var rOffsetX = document.getElementById("rOffsetX").value;
	// var gOffsetX = document.getElementById("gOffsetX").value;
	// var bOffsetX = document.getElementById("bOffsetX").value;

	// var rOffsetY = document.getElementById("rOffsetY").value;
	// var gOffsetY = document.getElementById("gOffsetY").value;
	// var bOffsetY = document.getElementById("bOffsetY").value;

	var rHex = calculateColor(rWidth,rOffsetX,rOffsetY);
	var gHex = calculateColor(gWidth,gOffsetX,gOffsetY);
	var bHex = calculateColor(bWidth,bOffsetX,bOffsetY);

	function calculateColor(width,offsetX,offsetY) {
		var sinX = Math.abs((letterID / alphabet.length + offsetX / 100) * 3.14159 * 2);
		var sinY = Math.abs(256 * Math.sin(sinX) * width / 256 + Math.min(offsetY , 256 - width));
		var c = Math.round(sinY);

		// console.log("letterID: " + letterID);
		// console.log("sinX: " + sinX);
		// console.log("sinY: " + sinY);
		// console.log("c: " + c);

		var cHex = c.toString(16);
		if (cHex.length < 2) {
		 	cHex = "0" + cHex;
		}
		if (cHex == "100") {
			cHex = "ff";
		}
		return cHex;
	}

	var color = "#";
	color = color + rHex + gHex + bHex;
	console.log(color);

    return color;
}