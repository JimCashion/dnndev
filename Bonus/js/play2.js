var play2State = {

	
    render: function() {

   		//game.debug.text(result, 10, 20);


    },

    preload: function() {

	},
    
   

    imageclicked: function(sprite, pointer)
    {

       
    },

    checkwin: function(){

        la = [];
        for (var i = 0; i< letters.length; i++)
        {
            la.push({obj: letters.children[i], letter: letters.children[i].text, x: letters.children[i].x});
        }

        //  sort by X
        for (var k= 0; k< la.length; k++)
        {
            for (var i = 0; i< la.length - 1; i++)
            {
                if(la[i].x > la[i+1].x)
                {
                    var temp = la[i];
                    la[i] = la[i+1];
                    la[i+1] = temp;
                }
            }
        }

        if (la[0].letter + 
            la[1].letter + 
            la[2].letter + 
            la[3].letter + 
            la[4].letter + 
            la[5].letter + 
            la[6].letter + 
            la[7].letter + 
            la[8].letter == otext)
        {
            postback('menu1', '');
        }
    },

    randonisetext: function(s)
    {

        for(var k =0; k<100; k++)
        {
            var i = Math.floor(Math.random() * (s.length - 1));
            var news = '';

            for (var j = 0; j<s.length;j++)
            {
                if(j<i)
                    news += s.substring(j,j+1);
                else
                if (j==i)
                    news += s.substring(j + 1,j+2);
                else
                if (j==i + 1)
                    news += s.substring(j - 1,j);
                else
                if(j>i+1)
                    news += s.substring(j,j+1);

            }
            s=news;
          

        }
        return s;

    },

    create: function() {

        

        styletitle = { font: "30px Arial", fill: "#000", 
                   align: "center", 
                   boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 600 };
        stylehblack = { font: "80px Arial", fill: "#000", 
                   align: "center", 
                   backgroundColor: 'rgb(255,255,255)',
                   boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 600 };
        styleins = { font: "12px Arial", fill: "#f00", 
                   align: "center", 
                   boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 600 };

        title = game.add.text(0, 0, "Move the Letters about until they spell the name of a dinosaur\nIt doesn't need to be in a neat line. For example,THEROPODS could look like", styletitle);
        title.setTextBounds(0,5,800,90);
        
        dialoginstructions = game.add.text(0, 0, "Touch or click to continue", styleins);
        dialoginstructions.setTextBounds(0,550,800,90);
        dialoginstructions.visible = false;


        lettersdemo = game.add.group();
        letters = game.add.group(); 

        bonustext = 'THEROPODS'; 
        for(var i = 0; i < bonustext.length; i++)
        {
             var t = game.add.text(0,0, bonustext.substring(i,i+1), stylehblack);
             // t.inputEnabled=true;
             // t.input.enableDrag();
             // t.events.onDragStart.add(this.onDragStart, this);
             // t.events.onDragStop.add(this.onDragStop, this);
             lettersdemo.add(t);
        }

        //  now randomise them into the pay area

        var x = 50;
        var y = 0;
        for (var i = 0; i< lettersdemo.length; i++)
        {
            x += 70;
            y = Math.floor(Math.random() * 200) + 200;  

            lettersdemo.children[i].x = x;
            lettersdemo.children[i].y = y;
        }

        dialoginstructions.visible = true;
                        
        game.input.onTap.addOnce(function () {     
            
            dialoginstructions.visible = false;
            lettersdemo.visible = false;
   
            bonustext = otext;

            bonustext = play2State.randonisetext(bonustext);

            for(var i = 0; i < bonustext.length; i++)
            {
                var t = game.add.text(0,0, bonustext.substring(i,i+1), stylehblack);
                t.inputEnabled=true;
                t.input.enableDrag();
                t.events.onDragStart.add(play2State.onDragStart, this);
                t.events.onDragStop.add(play2State.onDragStop, this);
                letters.add(t);
            }

            x = 50;
            y = 0;
            for (var i = 0; i< letters.length; i++)
            {
                x += 70;
                y = Math.floor(Math.random() * 200) + 200;  

                letters.children[i].x = x;
                letters.children[i].y = y;
            }
        });
    },

    onDragStart: function (sprite, pointer) {

        // result = "Dragging " + sprite.key;
        // dragx = sprite.x;
        // dragy = sprite.y;

    },

    onDragStop: function (sprite, pointer) {

        play2State.checkwin();
        // result = sprite.key + " from " + dragx + "," + dragy + " dropped at x:" + pointer.x + " y: " + pointer.y;

        // cx = sprite.x + (sprite.width / 2);
        // cy = sprite.y + (sprite.height / 2);

        // var hit = false; 
        // for(var i = 0; i < originalblanks.length ; i++)
        // {
        //     if (originalblanks[i].tile.x >= 425)
        //     {
        //         if ((originalblanks[i].tile.x <= cx && originalblanks[i].tile.x + originalblanks[i].tile.width >= cx) &&
        //             (originalblanks[i].tile.y <= cy && originalblanks[i].tile.y + originalblanks[i].tile.height >= cy))
        //         {
        //             hit = true;e.inputEnabled=false;

        //             this.checkwin();
	       //      }
	       //  }
        // }
       
        // if(!hit){
     
       	// 	//  put it back
         
       	// 	sprite.x = dragx;
       	// 	sprite.y = dragy;
        // }

	},

    movetile: function(t, scrambling) {

        //  scrambing not used for now.  intended to supress any animation if in scramble mode

        // var target = t.tile;
        // var direction = t.direction;
        
        // var tempx = blankx;
        // var tempy = blanky;
        // blankx = target.x;
        // blanky = target.y

        // target.x = tempx;
        // target.y = tempy;
     
    },


	update: function() {
       
	}
}

 