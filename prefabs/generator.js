class Generator {
    constructor(ctx) {
        this.CONFIG = ctx.CONFIG;
        this.DEPTH = ctx.DEPTH;

        this.ctx = ctx;

        this.cols = 11;
        this.rows = 20;

        this.layers = {
            floor: [],
            walls: [],
            monsters: [],
            pickups: [],
            turrents: [],
            overlay: false
        };
    }

    setup() {
            this.createFloor();
        }
        // Update ..................................
    update() {
        this.scrollFloor();
    }

    // Floor Layer ..............................
    createFloor() {
        let x;
        let y;
        let spr;

        // Draw bigger than camera view height;
        let cols = this.cols;
        let rows = this.rows + 1;

        // Save floor
        let floor = [];

        // Loop cols & rows
        for (let ty = 0; ty < rows; ty++) {
            floor[ty] = [];
            for (let tx = 0; tx < cols; tx++) {
                x = (tx * this.CONFIG.tile) + this.CONFIG.map_offset;
                y = (ty * this.CONFIG.tile);

                spr = this.ctx.add.sprite(x, y, 'tileset');
                spr.setOrigin(0);
                spr.setDepth(this.DEPTH.floor);

                floor[ty][tx] = spr;
            }
        }

        // Save floor array in generator layer
        this.layers.floor = floor;
    }

    scrollFloor() {
        let offset = this.ctx.cameras.main.scrollY - this.layers.floor[0][0].y;

        if (offset >= this.CONFIG.tile) {
            this.destroyFloorRow();
            this.appendFloorRow();
        }
    }

    destroyFloorRow() {
        for (let tx; tx < this.layers.floor[0].length; tx++) {
            this.layers.floor[0][tx].destroy();
        }
        this.layers.floor.splice(0, 1);
    }

    appendFloorRow() {
        let x;
        let spr;

        // Row at the end of the floor, right below camera edge
        let ty = this.layers.floor.length;
        let y = this.layers.floor[ty - 1][0].y + this.CONFIG.tile;

        // Add empty row to floor layer
        this.layers.floor.push([]);

        // Draw tiles on this row
        for (let tx = 0; tx < this.cols; tx++) {
            x = (tx * this.CONFIG.tile) + this.CONFIG.map_offset;

            spr = this.ctx.add.sprite(x, y, 'tileset');
            spr.setOrigin(0);
            spr.setDepth(this.DEPTH.floor);

            this.layers.floor[ty][tx] = spr;
        }

    }


}
