class MainScreen extends Phaser.Scene {
    constructor() {
        super({key: 'MainScreen'})
    }


    preload() {
        this.load.image('closedBox', 'bank_chest_closed.png');
        this.load.image('openBox', 'Bank_chest_open.png');
        this.load.image('jalien', 'hypers.png');
        this.load.image('ufo', 'ufo_2.png');
        this.load.image('title', 'jalienTitle.png');

    }


    create() {
        gamestate.closedBox = [];

        gamestate.title = this.add.sprite(225, 160, 'title').setScale(0);
        this.tweens.add({
            targets: gamestate.title,
            scale: 0.5,
            duration: 1000,
            ease: 'Power2',
        });

        for(let step = 0; step < 5; step++) {
            var stepX = step + 1;
            var alloX = stepX * 75;
            console.log(alloX);
            console.log(step);
            gamestate.closedBox[step] = this.add.sprite(alloX, 75, "closedBox").setInteractive();
            gamestate.closedBox[step].setScale(0);
            this.tweens.add({
                targets: gamestate.closedBox[step],
                scale: 0.2,
                duration: 1000,
                ease: 'Power2',
            });
        }

        for(let secondRow = 5; secondRow < 10; secondRow++) {
            var step2X = secondRow - 4;
            var alloX = step2X * 75;
            console.log(alloX);
            gamestate.closedBox[secondRow] = this.add.sprite(alloX, 250, "closedBox").setInteractive();
            gamestate.closedBox[secondRow].setScale(0);
            this.tweens.add({
                targets: gamestate.closedBox[secondRow],
                scale: 0.2,
                duration: 1000,
                ease: 'Power2',
            });
        }

        var correctChest = Math.floor(Math.random(gamestate.closedBox.length)*10);
        console.log("Correct Number: "+correctChest);
        console.log("length: " +gamestate.closedBox.length); 
        gamestate.openBox = [];
        gamestate.jalien;

        for(let i = 0; i < gamestate.closedBox.length; i++) {
            if (i != correctChest) {
                generateBox(false, i, this);
            } else {
                generateBox(true, i, this);
            }
        }
    }
}

const gamestate = {
};


function generateBox(correct, i, game) {
    if(correct) {
        gamestate.closedBox[i].on('pointerdown', function (pointer) {
            var xLoc = gamestate.closedBox[i].x;
            var yLoc = gamestate.closedBox[i].y;
            gamestate.closedBox[i].visible = false;
            gamestate.openBox[i] = game.add.sprite(xLoc, yLoc, "openBox").setScale(0.175);
            gamestate.openBox[i].flipX = true;
            var particles = game.add.particles('ufo');
            var emitter = particles.createEmitter();
            emitter.setPosition(xLoc, yLoc);
            emitter.setSpeed(100);
            emitter.setBlendMode(Phaser.BlendModes.ADD);
            game.time.delayedCall(2000, ()=> {
                emitter.stop();
            });
            gamestate.jalien = game.add.sprite(xLoc, yLoc, "jalien").setScale(0.1);

            game.tweens.add({
                targets: gamestate.jalien,
                scale: 0.5,
                duration: 1000,
                ease: 'Power2',
            });
            game.time.delayedCall(500, ()=> {
                game.tweens.add({
                    targets: gamestate.jalien,
                    x: xLoc,
                    y: yLoc-20,
                    duration: 250,
                    ease: 'Power2',
                    yoyo: true,
                    repeat: 10,
                });

            });


        });
    } else {
        gamestate.closedBox[i].on('pointerdown', function (pointer) {
            var xLoc = gamestate.closedBox[i].x;
            var yLoc = gamestate.closedBox[i].y;
            gamestate.closedBox[i].visible = false;
            gamestate.openBox[i] = game.add.sprite(xLoc, yLoc, "openBox").setScale(0.175);
            gamestate.openBox[i].flipX = true;
            gamestate.openBox[i].setTint(0xFF0000);
            game.tweens.add({
                targets: gamestate.openBox[i],
                x: xLoc + 2,
                duration: 100,
                ease: 'Power2',
                yoyo: true,
            });
        });
    }
}

    const config = {
        type: Phaser.AUTO,
        width: 450,
        height: 350,
        backgroundColor: 'white',
        physics: {
            default: 'arcade',
            arcade: {
                gravity: {y: 0},
                enableBody: true,
                debug: false,
            }
        },
        scene: [MainScreen]
        }

        const game = new Phaser.Game(config);