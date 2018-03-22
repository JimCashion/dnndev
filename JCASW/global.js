pen = null;
pentext = null;
nl = "<br>";

pausegame = false;
playerbaddiedialog = null;

gate1out = null;
gate1 = null;
gate1in  = null;
gate1text = null;

gate2out = null;
gate2 = null;
gate2in  = null;
gate2text = null;

var c_sprites = [];
var win_continue = false;

gridsize = 4;
original = [];

var goody_properties = [];

var score = 0;
var winscore = 10;   //  number of nanos to collect
var scoreText;
var startvelocity_x = 0
var startvelocity_y = 0;

dog_proximity = 150;
dino_proximity = 100;
dino_minspeed = 5;
playerspeed = 150;
bounceperiod = 1;
baddiecount = 30;
velocitydampingfator = 0.5;


anglevar = 0.5;

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
