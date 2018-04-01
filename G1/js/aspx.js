var runninginAPSX = false;
var gameID = "";

function getPrize(){

    a = document.getElementById("tbprize").value;
  
	return a;
}

function postback(arg) {
   
       __doPostBack('bpostback', arg);
}

function getTitle() {

    var a = "DinoNanoNonagon #1";

    return a;
}

function getInstructions() {
    var a;
    if (!IsMobile())
        a = "Use the Arrow keys on your keyboard to move left or right and the up arrow to jump";
    else
        a = "Touch to the left or right of the player to move and above the player to jump";

    return a;

}

function getMission() {

    var a = "Collect 200 nano caches and avoid the dinosaurs.  Be warned, some are just nasty and will push you around, others will simply kill you!!";

    return a;

}

