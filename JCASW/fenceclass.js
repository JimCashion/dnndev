//  Extended goodie 'class'
Fence = function (game, x, y, spritename, scale, orientation) {
  
    Phaser.Sprite.call(this, game, x, y, spritename);

    this.scale.setTo(scale.x, scale.y);

    this.orientation = 'h';

    if (orientation != null)
    {
        this.orientation = orientation;
    }
   
};

Fence.prototype = Object.create(Phaser.Sprite.prototype);
Fence.prototype.constructor = Fence;


// Fence.prototype.set_orientation = function(o) {
//     this.orientation = o;
// }