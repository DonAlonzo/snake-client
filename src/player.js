import Entity from './entity'
import Tuple2 from './tuple2'
import Block from './block'
import Food from './food'

const Direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    DOWN: 3,
}

export default class Player extends Entity {

    constructor(position) {
        super();

        this.head = new Block(position.copy());
        this.tail = [];
        for (var i = 1; i <= 2; i++) {
            this.tail.push(new Block(new Tuple2(position.x, position.y - i)));
        }
        this.collidables = this.tail;

        this.direction = Direction.DOWN;
        this.lastTraveledDirection = this.direction;
        this.drawOrder = 1000;
        this.blocksPerSecond = 4;
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
                if (this.lastTraveledDirection != Direction.RIGHT)
                    this.direction = Direction.LEFT;
                break;
            case 38:
                if (this.lastTraveledDirection != Direction.DOWN)
                    this.direction = Direction.UP;
                break;
            case 39:
                if (this.lastTraveledDirection != Direction.LEFT)
                    this.direction = Direction.RIGHT;
                break;
            case 40:
                if (this.lastTraveledDirection != Direction.UP)
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
        this.move(state.deltaTime);
        this.checkCollision();
    }

    move(deltaTime) {
        this.t += deltaTime;

        while (this.blocksPerSecond * this.t >= 1.0) {
            this.t -= 1 / this.blocksPerSecond;

            for (var i = this.tail.length - 1; i > 0; i--) {
                this.tail[i].position = this.tail[i - 1].position.copy();
            }
            this.tail[0].position = this.head.position.copy();

            switch (this.direction) {
                case Direction.LEFT:
                    this.head.position.x--;
                    break;
                case Direction.UP:
                    this.head.position.y--;
                    break;
                case Direction.RIGHT:
                    this.head.position.x++;
                    break;
                case Direction.DOWN:
                    this.head.position.y++;
                    break;
            }

            this.lastTraveledDirection = this.direction;
        }
    }

    checkCollision() {
        this.world.collidables.forEach((collidable) => {
            if (collidable.position.x == this.head.position.x
             && collidable.position.y == this.head.position.y) {
                if (collidable instanceof Food) {
                    collidable.kill();
                    this.world.spawnFood();

                    let block = new Block(this.tail[this.tail.length - 1].position.copy());
                    this.tail.push(block);
                    this.world.collidables.push(block);

                    this.blocksPerSecond += 0.2;
                } else {
                    this.kill();
                }
            }
        });
        //this.kill();
    }

    draw(graphics) {
        this.tail.forEach((block) => {
            block.draw(graphics);
        });
        this.head.draw(graphics);
    }

}