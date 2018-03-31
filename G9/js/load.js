var loadState = {

    preload: function() {

        var loadingLabel = game.add.text(80, 150, 'loading...',
            { font: '30px Courier', fill: '#ffffff' });

        game.load.image('sky', '../assets/sky.png');

        game.load.image('hborder', '../assets/hborder.png');
        game.load.image('vborder', '../assets/vborder.png');
        game.load.image('cborder', '../assets/corner.png');

        game.load.image('mazewall', '../assets/mazewall.png');
        game.load.image('mazewall0', '../assets/mazewall0.png');
        game.load.image('mazewall1', '../assets/mazewall1.png');
        game.load.image('mazewall2', '../assets/mazewall2.png');

        game.load.image('dialog', '../assets/dialog.png');
        game.load.spritesheet('dudemaze', '../assets/dudemaze.png', 20,20);
        game.load.spritesheet('stegmaze', '../assets/stegmaze.png', 20,20);

        game.load.image('tradmaze', '../assets/tradmaze.png');
        game.load.image('braindrain', '../assets/braindrain.png');
        game.load.image('stungun', '../assets/stungun.png');

        game.load.image('mystmaze', '../assets/mystmaze.png');
        game.load.image('virtmaze', '../assets/virtmaze.png');
        game.load.image('multmaze', '../assets/multmaze.png');
        game.load.image('lettmaze', '../assets/lettmaze.png');
        game.load.image('n1', '../assets/n1.png');
        game.load.image('n2', '../assets/n2.png');
        game.load.image('n3', '../assets/n3.png');
        game.load.image('n4', '../assets/n4.png');
        game.load.image('n0', '../assets/n0.png');
        game.load.image('m1', '../assets/m1.png');
        game.load.image('m2', '../assets/m2.png');
        game.load.image('m3', '../assets/m3.png');
        game.load.image('m4', '../assets/m4.png');
        game.load.image('m0', '../assets/m0.png');
        game.load.image('maze', '../assets/maze.png');
    //     game.load.image('star', '../assets/star.png');
    //     game.load.image('cache', '../assets/cache.png');
         game.load.image('cachesmall', '../assets/cachesmall.png');
    //     game.load.spritesheet('dude', '../assets/dude.png', 32, 48);
    //     game.load.spritesheet('baddie', '../assets/baddie.png', 32, 48);  //  happy baddie
    //     game.load.spritesheet('angrybaddie', '../assets/angrybaddie.png', 32, 48);  //  angry baddie
    //     game.load.spritesheet('steg', '../assets/steg.png', 64, 54);  //  pushy steg
    //     game.load.spritesheet('steg_angry', '../assets/steg_angry.png', 64, 54);  //  angry steg
    //     game.load.spritesheet('steg_friendly', '../assets/steg_friendly.png', 64, 54);  //  friendly steg
    //     game.load.image('diamond', '../assets/diamond.png');
    //     game.load.image('logo', '../assets/logo1.png');
    //     LoadBackgroundDinos();
    },

    create: function() {
    
        var target = document.getElementById("tbcontrol").value;
        document.getElementById("tbcontrol").value = 'menu';
        
        game.state.start(target);
    }

}