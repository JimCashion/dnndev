//  Extended goodie 'class'
Cell = function (game, x, y, cellx, celly) {
  
    Phaser.Sprite.call(this, game, x, y, 'mazewall2');

    this.cellx = cellx;
    this.celly = celly;
   
   
    this.exits = {north: true, east: true, south: true, west: true};

};

Cell.prototype = Object.create(Phaser.Sprite.prototype);
Cell.prototype.constructor = Cell;

Cell.prototype.update = function() {

 
}



