var play1State = {

    
    preload: function() {

	},
    
   

    imageclicked: function(sprite, pointer)
    {

       
    },

    checkwin: function(){

    	
    },


   
    create: function() {

        stylehblack = { font: "80px Arial", fill: "#000", 
                   align: "center", 
                   backgroundColor: 'rgb(255,255,255)',
                   boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 600 };

        styletitle = { font: "30px Arial", fill: "#000", 
                   align: "center", 
                   boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 600 };
        stylehred = { font: "40px Arial", fill: "#f00", 
                   align: "center", 
                boundsAlignH: "center", 
                   boundsAlignV: "top", 
                   wordWrap: true, wordWrapWidth: 700 };

        styleins = { font: "12px Arial", fill: "#f00", 
                       align: "center", 
                       boundsAlignH: "center", 
                       boundsAlignV: "top", 
                       wordWrap: true, wordWrapWidth: 600 };


        title = game.add.text(0, 0, 'Enter the Nine Letters You Collected\n(in any order)', styletitle);
        title.setTextBounds(0,5,800,90);
      
        t = game.add.text(0, 0, '', stylehblack);
        t.setTextBounds(0,100,800,90);

        error = game.add.text(0, 0, 'Sorry that is worong, Have another go', stylehred);
        error.setTextBounds(0,200,800,90);
        error.visible = false;

        dialoginstructions = game.add.text(0, 0, "Touch or click to continue", styleins);
        dialoginstructions.setTextBounds(0,245,800,90);
        dialoginstructions.visible = false;


        buttons = game.add.group(); 
        buttons.position.x = 25;
        buttons.position.y = 100;
        // adding a custom label button

        this.addbutton(100,200,  "Q",); 
        this.addbutton(160,200,  "W",); 
        this.addbutton(220,200,  "E",);
        this.addbutton(280,200,  "R",);
        this.addbutton(340,200,  "T",);
        this.addbutton(400,200,  "Y",);
        this.addbutton(460,200,  "U",);
        this.addbutton(520,200,  "I",);
        this.addbutton(580,200,  "O",);
        this.addbutton(640,200,  "P",);

        this.addbutton(125,260,  "A",);
        this.addbutton(185,260,  "S",);
        this.addbutton(245,260,  "D",);
        this.addbutton(305,260,  "F",);
        this.addbutton(365,260,  "G",);
        this.addbutton(425,260,  "H",);
        this.addbutton(485,260,  "J",);
        this.addbutton(545,260,  "K",);
        this.addbutton(605,260,  "L",);

        this.addbutton(160,320,  "Z",);
        this.addbutton(220,320,  "X",);
        this.addbutton(280,320,  "C",);
        this.addbutton(340,320,  "V",);
        this.addbutton(400,320,  "B",);
        this.addbutton(460,320,  "N",);
        this.addbutton(520,320,  "M",); 
    },

    addbutton: function(x,y,letter)
    {
        button = new LabelButton(this.game, x,y, 'key', letter, null, this, 1, 0, 2); 

        button.onInputUp.add(this.up, this);

        buttons.add(button);
        return button;

    },


    up: function(button) {
      
        t.text += button.label.text;

        if(t.text.length == 9)
        {
            
            // is the checksum right?
            if(this.calcchecksum() != 676)
            {
                error.visible = true;
                dialoginstructions.visible = true;
                        
                game.input.onTap.addOnce(function () {     
                    
                    t.text = '';
                    error.visible = false;
                    dialoginstructions.visible = false;

                });
            }
            else
            {
                error.text = "Well done, Now for Part 2"
                error.visible = true;
                dialoginstructions.visible = true;
                        
                game.input.onTap.addOnce(function () {     
                    
                    t.text = '';
                    error.visible = false;
                    dialoginstructions.visible = false;
                    postback("play2", t.text);

                });
               
            }
        }
    },
    
    calcchecksum: function()
    {
        var cs = 0;
        for(var i = 0; i < t.text.length; i++)
        {
              cs +=  t.text.charCodeAt(i);
        }
        return cs;
    },

    update: function() {

	},



}

 