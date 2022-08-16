class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play', active: false });

    }

    init() {
        this.CONFIG = this.sys.game.CONFIG;
        this.DEPTH = {
            floor: 0,
            player: 1
        };

        this.generator = new Generator(this);

        // Main flags
        this.allow_input = false;
        this.is_pause = false;
        this.is_gameover = false;

        // Camera
        this.cam_speed = {
            base: 1,
            current: 1,
            max: 1
        };
    }

    create() {
        // create floor
        this.generator.setup();

        // Player
        this.createPlayer();
    }

    update() {
        // Move camera down
        this.updateCamera();

        // Draw new floor tiles
        // Delete passed floor tiles
        this.generator.update();

        // Move player downward
        this.player.setSpritePosition(this.player.x, this.player.y + this.cam_speed.current);


    }

    // Player ................................
    createPlayer() {
        this.player = new Player(
            this,
            this.CONFIG.centerX,
            this.CONFIG.centerY,
            'spr-hero'
        );

        this.player.setDepth(this.DEPTH.player);

        this.player.startNewAnim('walk');
    }


    // Camera .................................
    updateCamera() {
        this.cameras.main.setScroll(
            0,
            this.cameras.main.scrollY + this.cam_speed.current
        );
    }

    setCamSpeed(speed) {
        this.cam_speed.base = speed;
        this.cam_speed.current = speed;

        this.cam_speed.current = Math.min(
            this.cam_speed.current,
            this.cam_speed.max
        );

        this.cam_speed.current = Math.max(
            this.cam_speed.current,
            0
        );


    }

}
