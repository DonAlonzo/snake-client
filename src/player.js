import Entity from './entity'
import Tuple2 from './tuple2'
import Block from './block'

const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    DOWN: 3,
}

export default class Player extends Entity {

    constructor(x, y) {
        super();

        this.blocks = [];
        for (var i = 0; i < 10; i++) {
            this.blocks[i] = new Block(new Tuple2(x, y - i));
        }
        this.direction = Direction.DOWN;
        this.drawOrder = 1000;
        this.blocksPerSecond = 10;
        this.t = 0;

        this.loadResources();
    }

    loadResources() {
        this.block = new Image;
        this.block.src = "resources/images/block.png";
    }

    onMessage(message) {
        if (message.origin == this.constructor.name && message.entityid == this.id) {
            switch (message.action) {
                case "moveTo":
                    break;
            }
        }
    }

    onMouseDown(x, y) {
    }

    onMouseDrag(x, y) {
    }

    onKeyDown(event) {
        switch (event.keyCode) {
            case 37:
                this.direction = Direction.LEFT;
                break;
            case 38:
                this.direction = Direction.UP;
                break;
            case 39:
                this.direction = Direction.RIGHT;
                break;
            case 40:
                this.direction = Direction.DOWN;
                break;
        }
    }

    onKeyUp(event) {
    }

    moveTo(x, y) {
        /*this.sendGlobal({
            action: "moveTo",
            x: x,
            y: y
        });*/
    }

    update(state) {
        this.t += state.deltaTime;
    }

    draw(graphics) {
        if (this.blocksPerSecond * this.t >= 1.0) {
            this.t -= 1 / this.blocksPerSecond;

            for (var i = this.blocks.length - 1; i > 0; i--) {
                this.blocks[i].position.x = this.blocks[i - 1].position.x;
                this.blocks[i].position.y = this.blocks[i - 1].position.y;
            }

            switch (this.direction) {
                case Direction.LEFT:
                    this.blocks[0].position.x--;
                    break;
                case Direction.UP:
                    this.blocks[0].position.y--;
                    break;
                case Direction.RIGHT:
                    this.blocks[0].position.x++;
                    break;
                case Direction.DOWN:
                    this.blocks[0].position.y++;
                    break;
            }
        }

        this.blocks.forEach((block) => {
            block.draw(graphics);
        });
    }

}