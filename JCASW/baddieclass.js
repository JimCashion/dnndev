//  Extended baddie 'class'
Baddie = function (game, x, y, baddietype, spritename, constraint, constrainttype, relative_x, absolutecoords, inmaze) {

    Phaser.Sprite.call(this, game, x, y, spritename);
    this.objecttype = 'baddie';

    this.baddietype = baddietype;
    this.spritename = spritename;
    this.constrainttype = constrainttype;
    this.constraint = constraint;
    this.relative_x = relative_x;
    this.orientation = 'h';
    this.cachecount = [];
    this.dno = 0;

    this.stunnedvelocityx = 0;
    this.stunnedvelocityy = 0;
    this.stunnedendtime = new Date();
    this.stunned = false;

    this.savedvelocityx = 0;
    this.savedvelocityy = 0;
    //  maze stuff

    this.targettype = '';
    this.distancetotarget = 0;
    this.distanceToCaches = [];

    this.mazespeed = Math.floor(Math.random() * 10) + 80;

    this.inmaze = inmaze;
    this.IQ = Math.floor(Math.random() * 5) + 5;
    this.cellx = 0;
    this.celly = 0
    this.targetcell = null;
    this.nextcells = [];
    this.prevcellx = 0;
    this.prevcelly = 0;
    this.cellmemory = [];
    this.totalcellstext = '';
    this.nametext = '';
    this.timeforIQIncrease = new Date();
    this.timeforIQIncrease.setSeconds(this.timeforIQIncrease.getSeconds() + 5);

    if(mazedim != null)
    {
        for(var i = 0; i< mazedim.x; i++)
        {
            for(var j = 0; j< mazedim.y; j++)
            {
                this.cellmemory.push(null);
            }

        }
    }

    this.cachecount.push({type: 'virt', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'trad', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'myst', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'mult', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});
    this.cachecount.push({type: 'lett', count: 0, sprite: null, text: '', textdiag: null, spritediag: null});

    //  sheepdog
    this.anxiety = 0;
 
    this.inpen = false;
    this.targetno = 0;
    this.currenttarget = targets[this.targetno];
    this.currentplace = {name: 'ground', revert: 'none'};


    this.inpen = false;

  

    this.followingbolter = false;

    this.mode = 'normal';
    this.bolting = false;
    this.boltstart = new Date().getTime();

    this.bounceduration = 0;

    this.followers = [this, this, this];  //  will get overwritten any milisecond now
  
    if (debug || hint)
        this.tt = game.add.text(this.x + this.width, this.y, this.currenttarget.name + "/" + this.currentplace.name, { fontSize: '10px', fill: '#000' });

    if(this.constraint != null)
    {
        if(constrainttype=='ledge')
        {
            this.start_y = this.constraint.y - this.height;
            this.end_y = this.constraint.y;
            this.start_x = this.constraint.x;
            this.end_x = this.constraint.x + this.constraint.width - this.width;
            //  start in the middle of a ledge
            if(relative_x != null)
                this.x = this.start_x + ((this.constraint.width + relative_x) / 2) ;
            else
                this.x = this.start_x + (this.constraint.width / 2);
            this.y = this.start_y;
        }
        
        

    }
    else
    {
        if(constrainttype=='absolute' || constrainttype=='roamer')
        {
            this.start_y = absolutecoords.start_y;
            this.end_y = absolutecoords.end_y;
            this.start_x = absolutecoords.start_x;
            this.end_x = absolutecoords.end_x;
    
            this.x = this.start_x;
            this.y = this.start_y;
        }
        else{
            this.start_y = 0;
            this.end_y = 0;
            this.start_x = 0;
            this.end_x = 0;
        }
    }

    
    this.targetsprite = game.add.sprite(this.x + 20, this.y - 5, 'n4');
    
};

Baddie.prototype = Object.create(Phaser.Sprite.prototype);
Baddie.prototype.constructor = Baddie;


Baddie.prototype.update = function() {

    

    //  pass control to the game if we are in a maze
    if(this.inmaze)
        return;

    //  turn off bolting

    if (this.bolting && Math.floor((new Date().getTime() - this.boltstart) / 1000) > boltduration)
    {
        this.bolting=false;
        this.anxiety = bolttrigger / 2;
    }

    //  control baddie movement

    if(this.constrainttype=='ledge'  || this.constrainttype=='absolute')
    {
        //  a level game
        if (this.x >= this.end_x && this.body.velocity.x > 0)
        {
             this.body.velocity.x = this.body.velocity.x * -1;
        }
        if (this.x <= this.start_x && this.body.velocity.x < 0)
        {
             this.body.velocity.x = this.body.velocity.x * -1;
        }

        if (this.body.velocity.x > 0)
            this.animations.play('right');
        else
        if (this.body.velocity.x < 0)
            this.animations.play('left');
        else
        this.animations.play('still');

        //  Collide player baddies, but have different outcome depending on how bad they are
        if (this.baddietype == 'killer')
        {
            game.physics.arcade.overlap(player, this, playState.collectBaddie, null, this);
        }
        else
        if (this.baddietype == 'pusher'){
            game.physics.arcade.collide(player, this);
        }
        else
        {
            //  must be friendly so no action at all
        }
    }
    else
    {
        //a roaming game

        //  did we go off the screen?

        if (this.x  <= 0)
        {
            this.mode = 'bounce';
            this.x = 10;
            this.body.velocity.x = -1 * this.body.velocity.x;
            this.bounceduration = bounceperiod;
           
        }
        else
        if (this.x + this.width >= game.world.width)
        {
            this.mode = 'bounce';
            this.body.velocity.x  = -1 * this.body.velocity.x;
            this.x = game.world.width - this.width - 10;
            this.bounceduration = bounceperiod;
        }
      

        if (this.y <= 0)
        {
            this.mode = 'bounce';
            this.body.velocity.y  = -1 * this.body.velocity.y;
            this.y = 10;
            this.bounceduration = bounceperiod;
        }
        else
        if (this.y + this.height >= game.world.height)
        {
            this.mode = 'bounce';
            this.body.velocity.y  = -1 * this.body.velocity.y;
            this.y = game.world.height - this.height - 10;
            this.bounceduration = bounceperiod;
        }

        //  did we bounce off the pen?

        checkfences(this);


        if (this.mode == 'normal')
        {
             var doginfo = diagonaldistance(player, this);
             if(doginfo.H < dog_proximity)
             {

                var diagvelocity = (dog_proximity + dino_minspeed) - doginfo.H;

                if(doginfo.DX > 0)
                    this.body.velocity.x =  Math.abs(Math.cos(doginfo.Angle)) * diagvelocity * -2;
                else
                    this.body.velocity.x =  Math.abs(Math.cos(doginfo.Angle)) * diagvelocity * 2;


                if(doginfo.DY > 0)
                    this.body.velocity.y =  Math.abs(Math.sin(doginfo.Angle + doginfo.YAdjust)) * diagvelocity * -2;
                else
                    this.body.velocity.y =  Math.abs(Math.sin(doginfo.Angle + doginfo.YAdjust)) * diagvelocity * 2;
               
                if (this.body.velocity.x > 0)
                    this.animations.play('right');
                else
                if (this.body.velocity.x < 0)
                    this.animations.play('left');
                else
                    this.animations.stop();


             }
             else
             {
                //  slow the baddie down
                if (this.body.velocity.x > 0)
                {
                    this.body.velocity.x = this.body.velocity.x - velocitydampingfator;
                    if (this.body.velocity.x <= 0)
                    {
                        this.body.velocity.x = 0;
                     
                      
                    }
                }
                else
                if (this.body.velocity.x < 0)
                {
                    this.animations.frame = 2;
                    this.body.velocity.x = this.body.velocity.x + velocitydampingfator;
                    if (this.body.velocity.x >= 0)
                    {
                        this.body.velocity.x = 0;
                     
                       
                     
                    }
                 }

                if (this.body.velocity.y > 0)
                {
                    this.body.velocity.y = this.body.velocity.y - velocitydampingfator;
                    if (this.body.velocity.y <= 0)
                    {
                        this.body.velocity.y = 0;
                       
                       
                    }
                }
                else
                if (this.body.velocity.y < 0)
                {
                    this.body.velocity.y = this.body.velocity.y + velocitydampingfator;
                    if (this.body.velocity.y >= 0)
                    {
                        this.body.velocity.y = 0;
                        
                        
                    }
                }

                if (this.body.velocity.y == 0 && this.body.velocity.x == 0)
                {
                    this.animations.stop();
                    
                    if(this.bolting)
                    {
                        this.bolting = false;
                        this.anxiety = bolttrigger / 2;
                    }
                }

             } 

//alert(this.bolting);
             //  now lets not forget that we may be bolting
             if(this.bolting)
             { 
                for (var bc = 0; bc < this.followers.length; bc++)
                {
                    var b = this.followers[bc];

                    var boltinfo = diagonaldistanceToBolter(b, this);
                    if (boltinfo != null && bc <= baddies.length)
                    {
                        var diagvelocity = (Math.random() * 50) + 25;  //  they are going to move towards it anyway
                 
                        if(boltinfo.DX > 0)
                            b.body.velocity.x =  Math.abs(Math.cos(boltinfo.Angle)) * diagvelocity * -1;
                        else
                            b.body.velocity.x =  Math.abs(Math.cos(boltinfo.Angle)) * diagvelocity * 1;


                        if(boltinfo.DY > 0)
                            b.body.velocity.y =  Math.abs(Math.sin(boltinfo.Angle)) * diagvelocity * -1;
                        else
                            b.body.velocity.y =  Math.abs(Math.sin(boltinfo.Angle)) * diagvelocity * 1;
                       
                        if (b.body.velocity.x > 0)
                            b.animations.play('right');
                        else
                        if (b.body.velocity.x < 0)
                            b.animations.play('left');
                        else
                            b.animations.stop();
                    }
                }
             }
         }
         else
         {
            //  bouncing
            this.bounceduration = this.bounceduration - 1;
           // alert(this.bounceduration);
            if (this.bounceduration <= 0)
            {
                this.mode = 'normal';
            }
         }
    }

    // where am I?  hitting targets

    var oldplace = this.currentplace;
    var newplace = whereisdino(this);

    if(oldplace.name != newplace.name)
    {
        if (newplace.name == this.currenttarget.name && this.inpen == false)
        {
            if (this.currenttarget.name == 'gate1out')
            {
                //  got through the gate
                gate1count++;
                gate1text.text = gate1count;
            }
            if (this.currenttarget.name == 'gate2out')
            {
                //  got through the gate
                gate2count++;
                gate2text.text = gate2count;
            }
            if (this.currenttarget.name == 'pen')
            {
                //  got through the gate
                pencount++;
                pentext.text = pencount;
                this.inpen = true;
                if (pencount == baddiecount)
                    postback('win');
            }

            if (this.inpen == false)
            {
                this.targetno++;
                this.currenttarget = targets[this.targetno];
                this.currentplace = newplace;
            }

        }
        else
        {
            //  we may need to revert!!

            if (this.currenttarget.revert == 0)
            {
                //  target stays the same
                this.currentplace = newplace;
            }
            else
            {
                //  go back to a previous target
                this.targetno = this.targetno + this.currenttarget.revert;

                this.currenttarget = targets[this.targetno];
                this.currentplace = newplace;
            }
        }

    }
   
    

    //  debug only 
    if(debug)
    {
        this.tt.text = 'C: ' + this.currentplace.name + ' T: ' + this.currenttarget.name + " A: " + this.anxiety + ' M: ' + this.mode + "(" + this.bolting + "," + Math.floor((new Date().getTime() - this.boltstart) / 1000) + ")";
        this.tt.x = this.x + this.width;
        this.tt.y = this.y;
    }
    else
    if(hint)
    {
        this.tt .text = 'C: ' + this.currentplace.name + ' T: ' + this.currenttarget.name + " A: " + this.anxiety + ' M: ' + this.mode + "(" + this.bolting + ")";
        this.tt.x = this.x + this.width;
        this.tt.y = this.y;
    } 
};



