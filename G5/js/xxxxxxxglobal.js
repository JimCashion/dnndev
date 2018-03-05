

var goody_properties = [];

var score = 0;
var winscore = 200;
var scoreText;
var startvelocity_x = 0;
var startvelocity_y = 0;

dog_proximity = 150;
dino_proximity = 100;
dino_minspeed = 5;
playerspeed = 150;
bounceperiod = 1;
baddiecount = 30;
velocitydampingfator = 0.5;


anglevar = 1;

//  obsticles

debug = false;
hint = false;

boltduration = 10;
bolttrigger = 10;

pencount = 0;

//gate1incount = 0;
gate1count = 0;
//gate1outcount = 0;
//gate2incount = 0;
gate2count = 0;
//gate2outcount = 0;

targets = [{name: 'gate1in', revert: 0},
           {name: 'gate1', revert: -1},
           {name: 'gate1out', revert: -2},
           {name: 'gate2in', revert: 0},
           {name: 'gate2', revert: -1},
           {name: 'gate2out', revert: -2},
           {name: 'pen', revert: 0}]

//, 'gate1', 'gate1out', 'ground','gate2in', 'gate2', 'gate2out', 'ground','pen'];
