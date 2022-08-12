class Preload extends Phaser.Scene {
    constructor() {
        super({ key: 'Preload', active: false });

    }

    init() {
        // Globals
        this.URL = this.sys.game.URL;
        this.CONFIG = this.sys.game.CONFIG;
    }

    preload() {
        // Create loading bar
        this.createLoadinBar();
        // Spritesheets
        this.load.setPath('assets/img');
        // ... files
        this.load.spritesheet('spr-hero', 'spr-hero.png', { frameWidth: 16, frameHeight: 16, endFrame: 4, margin: 1, spacing: 2 });
        this.load.spritesheet('spr-slime', 'spr-slime.png', { frameWidth: 16, frameHeight: 16, endFrame: 4, margin: 1, spacing: 2 });
    }

    create() {
        // Go menu
        this.time.addEvent({
            delay: 1000,
            callback: () => { this.scene.start('Menu'); },
            callbackScope: this
        });


    }

    createLoadinBar() {
        // Title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            75,
            'Loading Game',
            'preload',
            0.5,
        );

        // Progress text
        this.txt_progress = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY - 5,
            'Loading...',
            'preload', { x: 0.5, y: 1 }
        );
        // Progress bar
        let x = 10;
        let y = this.CONFIG.centerY + 5;

        this.progress = this.add.graphics({ x: x, y: y });
        this.border = this.add.graphics({ x: x, y: y });

        // Progress callback
        this.load.on('progress', this.onProgress, this);

    }

    onProgress(val) {
        // Width of progress bar
        let w = this.CONFIG.width - 2 * this.progress.x;
        let h = 36;

        this.progress.clear();
        this.progress.fillStyle('0xFFFFFF', 1);
        this.progress.fillRect(0, 0, w * val, h);

        this.border.clear();
        this.border.lineStyle(4, '0x4D6592', 1);
        this.border.strokeRect(0, 0, w * val, h, 2);

        //Percentage in progress text
        this.txt_progress.setText(Math.round(val * 100) + '%');
    }
}
