class MyGame extends Phaser.Scene {
    constructor() {
        super();
    }

    preload() {
        this.load.image("logo", "../assets/logo.png");
    }

    create() {
        var logo = this.physics.add.image(400, 100, "logo");

        logo.setVelocity(200, 200);
        logo.setBounce(1, 1);
        logo.setCollideWorldBounds(true);

        this.tweens.add({
            targets: logo,
            y: 450,
            duration: 2000,
            ease: "Power2",
            yoyo: true,
            loop: -1,
        });
    }

    update() {}

    renderer() {}
}

const config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: "arcade",
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: MyGame,
};

// const config = {
//     type: Phaser.AUTO,
//     parent: 'phaser-example',
//     width: 1000,
//     height: 800,
//     scene: MyGame
// };

var game = new Phaser.Game(config);