
function IsMobile() {
    
    if (navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/Android/i))
        return true;
    else
        return false;
}

function diagonaldistanceToBolter(x,y)
{
    //  x = baddie in question
    //  y = baddie being checked to see if bolter

    if (x.bolting || !y.bolting)
        return null;

    var dx = x.x - y.x;
    var dy = x.y - y.y;

    var diag = Math.sqrt((dy * dy) + (dx * dx));

  //  var rangle = (Math.random() * anglevar) - (anglevar / 2);
   
    var angle = Math.atan(dy / dx);   //  make it a bit mor awkward
   
    var a = diag * Math.cos(angle);
    var o = diag * Math.sin(angle);


    return {H: diag, A:a, O: o, Angle: angle , DX: dx, DY: dy};
}

function diagonaldistance(x,y)
{

    var dx = x.x - y.x;
    var dy = x.y - y.y;

    var diag = Math.sqrt((dy * dy) + (dx * dx));

    if (y.bolting)
    {
        diag = 2 * dog_proximity;
    }

   // var rangle = (Math.random() * anglevar) - (anglevar / 2);
   if (Math.random() < 0.5)
   {

       rangle = anglevar;
   }
   else
   {

        rangle = 0;
   }
   //var angle = Math.atan(dy / dx) +  (Math.random() * anglevar);   //  make it a bit more awkward

    var angle = Math.atan(dy / dx);   //  make it a bit mor awkward
    //document.write(angle + ' - ' + (angle - rangle) + ' - ' + rangle);

   //  var angle = Math.atan(dy / dx) + (rangle) - (anglevar / 2);   //  make it a bit more awkward
    var a = diag * Math.cos(angle);
    var o = diag * Math.sin(angle);

   //dx=a;
   // dy = o;
 
    if (diag < dog_proximity)
    {
        y.anxiety += (dog_proximity - diag) * 0.001;
    }
    else
    {
        y.anxiety -= 0.0075;
        if (y.anxiety < 0)
            y.anxiety = 0;
    }

    if(y.anxiety >= bolttrigger && !y.bolting)
    {
      
        diag = dog_proximity / 5;
        angle = (Math.random() * Math.PI) - Math.PI / 2;
        a = diag * Math.cos(angle);
        o = diag * Math.sin(angle);
        dx = a;
        dy = o;
        y.bolting = true;
        y.boltstart = new Date().getTime();
    }

    //diag = Math.sqrt(dx*dx + dy*dy);
    return {H: diag, A:a, O: o, Angle: angle , DX: dx, DY: dy, YAdjust: rangle};
}

function checkfences(dino)
{
    for(var i = 0; i < fences.length; i++)
    {
       
       var fence = fences.children[i];

       //  botton hitting top
       // if bottom >= f.top && botton <= f.bottom && 
       //    left <= f.right && right >= f.left
       if((dino.y + dino.height) >= (fence.y) && (dino.y + dino.height) <= (fence.y + fence.height) &&
          (dino.x) <= (fence.x + fence.width) && (dino.x + dino.width) >= (fence.x)
        )
       {
             if (fence.orientation == 'h')
            {
                dino.mode = 'bounce';
                dino.body.velocity.y  = -1 * dino.body.velocity.y;
                dino.y = fence.y - dino.height - 10;
                dino.bounceduration = bounceperiod;
           }
           else
           {
            //  essentially hitting a vertical fence
                dino.mode = 'bounce';
                dino.body.velocity.x  = -1 * dino.body.velocity.x;
                if (dino.body.velocity.x >= 0)
{
                    dino.x = fence.x + fence.width + 10;
                }
                else
                   {
               //     alert(dino.body.velocity.x);
                    dino.x = fence.x - dino.width - 10;
                 //     alert('');
}
                dino.bounceduration = bounceperiod;  
            }
        }
       //  top hitting bottom 
       // if top <= f.bottom && top >= f.top && 
       //    left <= f.right && right >= f.left
       
        if((dino.y) <= (fence.y + fence.height) && (dino.y) >= (fence.y) &&
          dino.x <= (fence.x + fence.width) && (dino.x + dino.width) >= fence.x
        )
       {
            if (fence.orientation == 'h')
            {
                dino.mode = 'bounce';
                dino.body.velocity.y  = -1 * dino.body.velocity.y;
                dino.y = (fence.y + fence.height) + 10;
                dino.bounceduration = bounceperiod;
            }
            else
            {
                dino.mode = 'bounce';
                dino.body.velocity.x  = -1 * dino.body.velocity.x;
                 if (dino.body.velocity.x >= 0)
                 {
                    dino.x = fence.x + fence.width + 10;
                }
                else
                {
 //alert('this one ' + dino.body.velocity.x);
                  dino.x = fence.x - dino.width - 10;
                 
   //                 alert('');
                }
                dino.bounceduration = bounceperiod;
            }
       }

    }

}

function LoadBackgroundDinos()
{
   
    game.load.image('rd1l', '../assets/randomdinos/rd1L.png');
    game.load.image('rd2l', '../assets/randomdinos/rd2l.png');
    game.load.image('rd3l', '../assets/randomdinos/rd3l.png');
    game.load.image('rd4l', '../assets/randomdinos/rd4l.png');
    game.load.image('rd5l', '../assets/randomdinos/rd5l.png');
    game.load.image('rd6l', '../assets/randomdinos/rd6l.png');
    game.load.image('rd7l', '../assets/randomdinos/rd7l.png');
    game.load.image('rd8l', '../assets/randomdinos/rd8l.png');
    game.load.image('rd9l', '../assets/randomdinos/rd9l.png');

    game.load.image('rd1r', '../assets/randomdinos/rd1r.png');
    game.load.image('rd2r', '../assets/randomdinos/rd2r.png');
    game.load.image('rd3r', '../assets/randomdinos/rd3r.png');
    game.load.image('rd4r', '../assets/randomdinos/rd4r.png');
    game.load.image('rd5r', '../assets/randomdinos/rd5r.png');
    game.load.image('rd6r', '../assets/randomdinos/rd6r.png');
    game.load.image('rd7r', '../assets/randomdinos/rd7r.png');
    game.load.image('rd8r', '../assets/randomdinos/rd8r.png');
    game.load.image('rd9r', '../assets/randomdinos/rd9r.png');
}

function confirmwin()
{
    showcoords(getPrize());
    

    if (IsMobile())
    {
        style = { font: "30px Arial", fill: "#fff", 
        align: "center", 
        boundsAlignH: "center", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 600 };

        text1 = game.add.text(0, 0, 'WELL DONE', style);
        text1.setTextBounds(0, 300, game.world.width, game.world.height);
        
        text2 = game.add.text(0, 0, 'Here are your coordinates', style);
        text2.setTextBounds(0, 340, game.world.width, game.world.height);

       

        click = game.add.text(0, 0, 'Click to restart', style);
        click.setTextBounds(0, 400, game.world.width, game.world.height);

       
        //the "click to restart" handler
        game.input.onTap.addOnce(function () {           
       
        score = 0;
        startvelocity = 0;
        liftDirection = -1

        game.state.start('menu');
        });


    }
    else
    {

        style = { font: "30px Arial", fill: "#fff", 
        align: "center", 
        boundsAlignH: "center", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 600 };

        text1 = game.add.text(0, 0, 'WELL DONE', style);
        text1.setTextBounds(0, 300, game.world.width, game.world.height);
        
        text2 = game.add.text(0, 0, 'Here are your coordinates', style);
        text2.setTextBounds(0, 340, game.world.width, game.world.height);

      

        click = game.add.text(0, 0, 'Click to restart', style);
        click.setTextBounds(0, 400, game.world.width, game.world.height);

       // game.input.onDown.add(this.carryon, this);

       
        //the "click to restart" handler
        game.input.onDown.addOnce(function () {           
       
        score = 0;
        startvelocity = 0;
        liftDirection = -1

        game.state.start('menu');
        });
    }
 }

 function confirmlose(str)
{
    if (IsMobile())
    {
        style = { font: "30px Arial", fill: "#fff", 
        align: "center", 
        boundsAlignH: "center", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 600 };

        text1 = game.add.text(0, 0, 'OOPS!!!!', style);
        text1.setTextBounds(0, 300, game.world.width, game.world.height);
        
        text2 = game.add.text(0, 0, str, style);
        text2.setTextBounds(0, 340, game.world.width, game.world.height);

        click = game.add.text(0, 0, 'Click to restart', style);
        click.setTextBounds(0, 500, game.world.width, game.world.height);

       
        //the "click to restart" handler
        game.input.onTap.addOnce(function () {           
       
        score = 0;
        startvelocity = 0;
        liftDirection = -1

        game.state.start('menu');
        });
    }
    else
    {

        style = { font: "30px Arial", fill: "#fff", 
        align: "center", 
        boundsAlignH: "center", 
        boundsAlignV: "top", 
        wordWrap: true, wordWrapWidth: 600 };

        text1 = game.add.text(0, 0, 'OOPS!!!!', style);
        text1.setTextBounds(0, 100, game.world.width, game.world.height);
        
        text2 = game.add.text(0, 0, str, style);
        text2.setTextBounds(0, 140, game.world.width, game.world.height);

        click = game.add.text(0, 0, 'Click to restart', style);
        click.setTextBounds(0, 300, game.world.width, game.world.height);

       
        //the "click to restart" handler
        game.input.onTap.addOnce(function () {           
       
        score = 0;
        startvelocity = 0;
        liftDirection = -1

        game.state.start('menu');
        });
   }
}


function addledge( spritename,  x, y,  ledgetype, scalex, scaley) {

   
    ledge = new Ledge( game, x, y, spritename, scalex, scaley, ledgetype);
    platforms.add(ledge);
   
    game.physics.arcade.enable(ledge);
    ledge.body.immovable = true;
    
    return ledge;
}

function addbaddie(spritename,constrainttype, constraint, type, relative_x, absolute) {

    var baddie = new Baddie(game, 32, game.world.height - 150, type, spritename, constraint,  constrainttype, relative_x, absolute);
    baddies.add(baddie);

    game.physics.arcade.enable(baddie);
    baddie.animations.add('left', [3, 4], 10, true);
    baddie.animations.add('right', [0,1], 10, true);
    baddie.animations.add('still', [2], 10, true);
   // baddie.body.collideWorldBounds = true;

    if(constrainttype=='absolute' || constrainttype=='roamer')
    {
        baddie.body.velocity.x = absolute.vel_xl
        baddie.body.velocity.y = absolute.vel_y;
        baddie.body.immovable = true;

       
    }
    else
    {
        baddie.body.velocity.x = 100;
        baddie.body.immovable = true;
    }

    return baddie;

}

function addgoodie(spritename,x,y) {

        goodie = new Goodie(game, x, y, spritename);
        goodies.add(goodie);

	    goodie.body.gravity.y = 30;

        goodie.body.collideWorldBounds = true;
        //  This just gives each goodie a slightly random bounce value
        goodie.body.bounce.y = 1;
        goodie.body.bounce.x = 1;
        goodie.body.velocity.x = Math.floor(Math.random() * 200) - 100;

}

function showcoords(a) {
    
 
     var x = 0;
     var y = 0;
   
    for(var i = 0; i<a.length - 1; i+=2)
    {
    	if  (a.substring(i , i + 1) == "0") 
        {
    	   
	            y += 120;
	            x=0;
	           
        }
    	 else

    	if  (a.substring(i , i + 1) == "1") 
        {
    	   for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            y -= 20;
	            d = game.add.sprite(x, y, 'cachesmall');

            }
        }
    	 else
    	if  (a.substring(i , i + 1) == "2") 
        {
    	   for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            x += 20;
	            d = game.add.sprite(x, y, 'cachesmall');
            }
        }
 else
    
        if  (a.substring(i , i + 1) == "3") 
        {
    	   for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            y += 20;
	            d = game.add.sprite(x, y, 'cachesmall');
            }
        }
 else
        if  (a.substring(i , i + 1) == "4") 
        {
    	   for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            x -= 20;
	            d = game.add.sprite(x, y, 'cachesmall');
            }
        }
        else if  (a.substring(i , i + 1) == "5") 
        {
        	for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            	x+=20;
	           
            }
       
       }
        else if  (a.substring(i , i + 1) == "6") 
        {
        	for(var j = 0; j<=a.substring(i + 1, i + 2); j++)
	        {
	            	x+=30;
	           
            }
       
       }
       
       else if  (a.substring(i , i + 1) == "7") 
        {
       	 for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            y -=20;
	            // d = game.add.sprite(x, y, 'baddie');
	           
            }
       }
       else if  (a.substring(i , i + 1) == "8") 
        {
        	for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            	x-=20;
	           
            }
       
       }
       else if  (a.substring(i , i + 1) == "9") 
        {
        	for(var j = 0; j<a.substring(i + 1, i + 2); j++)
	        {
	            	y+=20;
	           
            }
       
       }

    }

}

function whereisdino(dino)
{

    if (gate1 == null)   //  anything not used by all gamnes really!
        return {name: 'ground', revert: 0};

    //  check all 4 corners are in the target area

    d_topleft = {x: dino.x, y: dino.y};
    d_topright = {x: dino.x + dino.width, y: dino.y};
    d_bottomleft = {x: dino.x, y: dino.y + dino.height};
    d_bottomright = {x: dino.x + dino.width, y: dino.y + dino.height};

    //  are we in gate1in
    t_topleft = {x: gate1in.x, y: gate1in.y};
    t_topright = {x: gate1in.x + gate1in.width, y: gate1in.y};
    t_bottomleft = {x: gate1in.x, y: gate1in.y + gate1in.height};
    t_bottomright = {x: gate1in.x + gate1in.width, y: gate1in.y + gate1in.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate1in', revert: 0};
    }

    //  are we in gate1
    t_topleft = {x: gate1.x, y: gate1.y};
    t_topright = {x: gate1.x + gate1.width, y: gate1.y};
    t_bottomleft = {x: gate1.x, y: gate1.y + gate1.height};
    t_bottomright = {x: gate1.x + gate1.width, y: gate1.y + gate1.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate1', revert: -1};
    }

    //  are we in gateout
    t_topleft = {x: gate1out.x, y: gate1out.y};
    t_topright = {x: gate1out.x + gate1out.width, y: gate1out.y};
    t_bottomleft = {x: gate1out.x, y: gate1out.y + gate1out.height};
    t_bottomright = {x: gate1out.x + gate1out.width, y: gate1out.y + gate1out.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate1out', revert: -2};
    }

    //  are we in gate2in
    t_topleft = {x: gate2in.x, y: gate2in.y};
    t_topright = {x: gate2in.x + gate2in.width, y: gate2in.y};
    t_bottomleft = {x: gate2in.x, y: gate2in.y + gate2in.height};
    t_bottomright = {x: gate2in.x + gate2in.width, y: gate2in.y + gate2in.height};
   // alert(t_topleft.x + ' - ' + t_topright);
    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate2in', revert: 0};
    }


    //  are we in gate2
    t_topleft = {x: gate2.x, y: gate2.y};
    t_topright = {x: gate2.x + gate2.width, y: gate2.y};
    t_bottomleft = {x: gate2.x, y: gate2.y + gate2.height};
    t_bottomright = {x: gate2.x + gate2.width, y: gate2.y + gate2.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate2', revert: -1};
    }
    //  are we in gate2out
    t_topleft = {x: gate2out.x, y: gate2out.y};
    t_topright = {x: gate2out.x + gate2out.width, y: gate2out.y};
    t_bottomleft = {x: gate2out.x, y: gate2out.y + gate2out.height};
    t_bottomright = {x: gate2out.x + gate2out.width, y: gate2out.y + gate2out.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'gate2out', revert: -2};
    }
    //  are we in the pen
    t_topleft = {x: pen.x, y: pen.y};
    t_topright = {x: pen.x + pen.width, y: pen.y};
    t_bottomleft = {x: pen.x, y: pen.y + pen.height};
    t_bottomright = {x: pen.x + pen.width, y: pen.y + pen.height};

    if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
        d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
    {
        return {name: 'pen', revert: 0};
    }

    //  if target is gate1 and top is in gate1 and bottom is in gate1in then stay in gate1in

    if (dino.currenttarget.name == 'gate1')
    {
      
        t_topleft = {x: gate1.x, y: gate1.y};
        t_topright = {x: gate1.x + gate1.width, y: gate1.y};
        t_bottomleft = {x: gate1in.x, y: gate1in.y + gate1in.height};
        t_bottomright = {x: gate1in.x + gate1in.width, y: gate1in.y + gate1in.height};

      
        if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
            d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
        {
            return {name: 'gate1in', revert: -2};
        }

    }

    //  if target is gate1out and top is in gate1out and bottom is in gate1 then stay in gate1

    if (dino.currenttarget.name == 'gate1out')
    {
      
        t_topleft = {x: gate1out.x, y: gate1out.y};
        t_topright = {x: gate1out.x + gate1out.width, y: gate1out.y};
        t_bottomleft = {x: gate1.x, y: gate1.y + gate1.height};
        t_bottomright = {x: gate1.x + gate1.width, y: gate1.y + gate1.height};

      
        if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
            d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
        {
            return {name: 'gate1', revert: -1};
        }

    }

    //  if target is gate2 and right is in gate2in and left is in gate2 then stay in gate1

    if (dino.currenttarget.name == 'gate2')
    {
      
        t_topleft = {x: gate2.x, y: gate2.y};
        t_topright = {x: gate2in.x + gate2in.width, y: gate2in.y};
        t_bottomleft = {x: gate2.x, y: gate2.y + gate2.height};
        t_bottomright = {x: gate2in.x + gate2in.width, y: gate2.y + gate2.height};

      
        if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
            d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
        {
            return {name: 'gate2in', revert: -1};
        }

    }
   
    //  if target is gate2out and right is in gate2 and left is in gate2outthen stay in gate1

    if (dino.currenttarget.name == 'gate2out')
    {
      
        t_topleft = {x: gate2out.x, y: gate2out.y};
        t_topright = {x: gate2.x + gate2.width, y: gate2out.y};
        t_bottomleft = {x: gate2out.x, y: gate2.y + gate2.height};
        t_bottomright = {x: gate2.x + gate2.width, y: gate2.y + gate2.height};

      
        if (d_topleft.x >= t_topleft.x && d_topleft.x <= t_topright.x && d_topright.x >= t_topleft.x && d_topright.x <= t_topright.x &&
            d_topleft.y >= t_topleft.y && d_topleft.y <= t_bottomright.y && d_bottomleft.y >= t_topleft.y && d_bottomleft.y <= t_bottomright.y)
        {
            return {name: 'gate2', revert: -1};
        }

    }

    //  if we have been in the pen but we are now outside again then thats sad but reset target back to the pen.

    if (dino.inpen)
    {
        pencount--;
        pentext.text = pencount;
        dino.inpen = false;
        return {name: 'ground', revert: 0};
        
    }

    return {name: 'ground', revert: 0};
}

function loadjscssfile(filename, filetype) {
    if (filetype == "js") { //if filename is a external JavaScript file
        var fileref = document.createElement('script')
        fileref.setAttribute("type", "text/javascript")
        fileref.setAttribute("src", filename)
    }
    else if (filetype == "css") { //if filename is an external CSS file
        var fileref = document.createElement("link")
        fileref.setAttribute("rel", "stylesheet")
        fileref.setAttribute("type", "text/css")
        fileref.setAttribute("href", filename)
    }
    if (typeof fileref != "undefined")
        document.getElementsByTagName("head")[0].appendChild(fileref)
}


function getURLParam(name, url) {
        if (!url) url = location.href;
        name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
        var regexS = "[\\?&]" + name + "=([^&#]*)";
        var regex = new RegExp(regexS);
        var results = regex.exec(url);
        return results == null ? null : results[1];
    
}

