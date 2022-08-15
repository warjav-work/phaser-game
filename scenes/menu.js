class Menu extends Phaser.Scene {
    constructor() {
        super({ key: 'Menu', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
    }

    create() {
        // Background
        this.createBackground();

        // Game title
        this.title = new Text(
            this,
            this.CONFIG.centerX,
            75,
            'Cave Game',
            'title'
        );

        // Click to play
        this.text = new Text(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY,
            'click to play',
            'standard'
        );

        // Create mouse input
        this.createMouseInput();

        // Create keyboard input
        this.createKeyboardInput();
    }

    createBackground() {
        this.bg = this.add.graphics({ x: 0, y: 0 });
        this.bg.fillStyle('0xF4CCA1', 1);
        this.bg.fillRect(0, 0, this.CONFIG.width, this.CONFIG.height);
    }

    createMouseInput() {
        this.input.on('pointerup', this.goPlay, this);
    }

    createKeyboardInput() {
        function handlerKeyUp(e) {
            switch (e.code) {
                case 'Enter':
                    this.goPlay();
                    break;
            }
        }

        this.input.keyboard.on('keyup', handlerKeyUp, this);
    }

    goPlay() {
        this.scene.start('Play');
    }
}
