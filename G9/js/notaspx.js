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


function postback(arg) {
   
   game.state.start(arg);
}


function getSecretCode(){

	var sc = "123456";

	return sc;
}

function getTitle(){

	var a = "DINONANONONAGON #1";

	return a;
}

function getInstructions(){
	var a;
	if (!IsMobile())
		a = "Traverse the maze and find caches before the dnos";
	else
		a = "Touch to the left or right of the player to move and above the player to jump";

	return a;

}

function getMission(){
	
	var a = "Collect xx caches";
	
	return a;

}

