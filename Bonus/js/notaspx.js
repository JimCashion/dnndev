var runninginAPSX = false;
var gameID = "";

function getPrize(){

	// 1=north
	// 2=east
	// 3=south
    // 4=west
	// 5=east-noicon
	// 6=gap
	// 7=north-noicon
	// 8=west-noicon
	// 9=south-noicon

	//var a="352214418171" + "5161";  // 0
	var a="" + "5161";  // nothing
	a+="5231423222324275" + "5161"; // 5
	a+="51357581" + "5161";  // 1
	a+="51";  // space
	a+="3122324252324275" + "5161";  //  3
	a+="337222324252324275" + "5161";  // 9
	a+="9321728171" + "5161";  // .
	a+="3522124272228271" + "5161";  // 6
	a+="3122324252324275" + "5161";  // 3
	a+="5231423222324275" + "5161";  // 5
	a+="07"; //  New line (second digit is irrelevent)
	a+="352214418171" + "5161";  // 0
	a+="352214418171" + "5161";  // 0
	a+="3122324252324275" + "5161";  // 3
	a+="51";  // space
	a+="33221292328275" + "5161";  //  4
	a+="3322324211" + "715212418171" + "5161";  //  8
	a+="9321728171" + "5161";  // .
	a+="352214418171" + "5161";  // 0
	a+="337222324252324275" + "5161";  // 9
	a+="51357581" + "5161";  // 1

	return a;
}

function postback(arg, data) {
   
   // assume correct as the checksum will be correct.
   //  will perform an exact check when in ASPX mode
   
   bonustext = data;
   game.state.start(arg);
}

function getSecretCode(){

	var sc = "123456";

	return sc;
}

function getTitle(){

	var a = "DinoNanoNonagon BONUS";

	return a;
}

function getInstructions(){
	var a;
	
		a = "This is smiple to play and should be just as easy using a touch screen as a keyboard";
	
	return a;

}

function getMission(){
	
	var	a = "This is in three simple stages, complete each stage to progress to the next.";
	a+= "\nOnce the last stage is completed you will be given the coordinates to the bonus cache.";
	return a;

}

