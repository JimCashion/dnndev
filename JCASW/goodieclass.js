//  Extended goodie 'class'
Goodie = function (game, x, y, spritename, goodietype, constraint, constraingtype, relative_x) {

    Phaser.Sprite.call(this, game, x, y, spritename);

    this.goodietype = goodietype;
    this.spritename = spritename;
    this.constraingtype = constraingtype;
    this.constraint = constraint;
    this.relative_x = relative_x;

    if(this.constraint != null)
    {
        this.start_y = this.constraint.y - this.height;
        this.end_y = this.constraint.y;
        this.start_x = this.constraint.x;
        this.end_x = this.constraint.x + this.constraint.width - this.width;
        if(relative_x != null)
            this.x = this.start_x + ((this.constraint.width + relative_x) / 2) ;
        else
            this.x = this.start_x + (this.constraint.width / 2);
        this.y = this.start_y;
    }

    else
    {

        this.start_y = 0;
        this.end_y = 0;
        this.start_x = 0;
        this.end_x = 0;
        
    }
};

Goodie.prototype = Object.create(Phaser.Sprite.prototype);
Goodie.prototype.constructor = Goodie;

Goodie.prototype.update = function() {


};