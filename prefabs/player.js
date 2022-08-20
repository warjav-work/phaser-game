class Player extends Entity {
    constructor(ctx, x, y, key) {
        super(ctx, x, y, key);

        // Movement
        this.speed = {
            base: 2,
            current: 2,
            max: 6
        };
    }

    update(is_holding) {
        if (this.states.dead) return;

        // Save the current direccion
        this.setCurrentDirection(is_holding);

        // Are we walking
        if (this.states.walk) {
            this.updateSpriteDirection();
            this.moveSprite();
        }


    }

    // Movement .................................
    startMoving() {
        this.setState('walk');
        this.startNewAnim('walk');
    }

    stopMoving() {
        this.setState('idle');
        this.startNewAnim('idle');
    }

    moveSprite() {
        switch (this.direction.current) {
            case 'down':
                this.moveDown();
                break;
            case 'left':
                this.moveLeft();
                break;
            case 'right':
                this.moveRight();
                break;
        }
    }

    moveDown() {
        this.y += this.speed.current;
        this.setSpritePosition();
    }

    moveLeft() {
        this.x -= this.speed.current;
        this.setSpritePosition();
    }

    moveRight() {
        this.x += this.speed.current;
        this.setSpritePosition();
    }


    // Setters .............................
    setCurrentDirection(is_holding) {
        if (is_holding) {
            this.direction.current = is_holding;
        } else {
            this.direction.current = 'down';
        }
    }
}
