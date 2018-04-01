var runninginAPSX = false;
var gameID = "";

function getPrize() {

    a = document.getElementById("tbprize").value;

    return a;
}

function postback(arg) {

    __doPostBack('bpostback', arg);
}
function getSecretCode(){

	var sc = "123456";

	return sc;
}

function getTitle(){

	var a = "DinoNanoNonagon #2";

	return a;
}

function getInstructions() {
    var a;
    if (!IsMobile())
        a = "Click on a picture fragement to move it into the space until the picture is re-assembled";
    else
        a = "Touch on a picture fragement to move it into the space until the picture is re-assembled";

    return a;

}



function getMission() {
    var a;

    a = "Re-assemble the picture to reveal an awesome Dinosaur picture and get the coordinates for the cache";

    return a;

}

