//  Extended goodie 'class'
Ledge = function (game, x, y, spritename, scalex, scaley, ledgetype) {
  
    Phaser.Sprite.call(this, game, x, y, spritename);

    this.ledgetype = ledgetype;
    this.spritename = spritename;
    this.scalex = scalex;
    this.scaley = scaley;

    if (scalex != null)
    {
        this.scale.setTo(scalex, scaley);
    }

    this.maxwidth = this.width;
    this.minwidth = this.width;
    this.varsize_dir = -1;
    this.varsize_side = 'left';
    this.targety = this.y;
   
   
};

Ledge.prototype = Object.create(Phaser.Sprite.prototype);
Ledge.prototype.constructor = Ledge;

Ledge.prototype.set_varsize = function(p) {
    if(p.newminwidth != null)
        this.minwidth = p.newminwidth;
    if(p.newside != null)
        this.varsize_side = p.newside;
}

Ledge.prototype.set_targety = function(p) {
    this.targety = p;
}


Ledge.prototype.update = function() {

    if (this.ledgetype == 'varsize'){
        
        //  shrink from the left
        if(this.varsize_side == 'left' || this.varsize_side == 'both')
        {
            this.width += this.varsize_dir;
            this.x -= this.varsize_dir;

           if(this.width <= this.minwidth)
           {
                this.varsize_dir = this.varsize_dir * -1;
           }

           if(this.width >= this.maxwidth)
           {
                this.varsize_dir = this.varsize_dir * -1;
           }

        }
        
        //  shrink from the right
        if(this.varsize_side == 'right' || this.varsize_side == 'both')
        {
           this.width += this.varsize_dir;

           if(this.width <= this.minwidth)
           {
                this.varsize_dir = this.varsize_dir * -1;
           }

           if(this.width >= this.maxwidth)
           {
                this.varsize_dir = this.varsize_dir * -1;
           }

        }

    }

   

        // if (this.ledgetype == 'soft_lower')
        // {
        //     if (player.body.velocity.y < 0 && player.x >= this.x && (player.x + player.width) <= (this.x + this.width))
        //     {
        //       //  jumping
        //       //alert(player.y + ' - ' + (this.y + this.height));
        //       if(player.y <= (this.y + this.height + 9))
        //       {
        //           alert(player.y + ' - ' + this.y + ' - ' + this.height );
        //       } 
        //     }
        // }
}



