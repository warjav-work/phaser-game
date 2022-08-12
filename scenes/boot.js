class Boot extends Phaser.Scene {
    constructor() {
        super({ key: 'Boot', active: true });

    }

    init() {

    }

    preload() {
        // Bitmap font for Preload
        // ...path
        this.load.setPath('assets/fonts');

        // ...files
        this.load.bitmapFont('ClickPixel', 'click_0.png', 'click.xml');
    }

    create() {
        this.scene.start('Preload');
    }
}
