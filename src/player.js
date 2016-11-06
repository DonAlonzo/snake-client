import Entity from './entity'
import Tuple2 from './tuple2'

export default class Player extends Entity {

    constructor(x, y) {
        super();

        this.position = new Tuple2(x, y);
        this.target = new Tuple2(x, y);
        this.drawOrder = 1000;

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
                    this.target.x = message.x;
                    this.target.y = message.y;
                    break;
            }
        }
    }

    onMouseDown(x, y) {
    }

    onMouseDrag(x, y) {
    }

    onKeyDown(event) {
        switch (event.key) {
            case "w":
                this.target.y -= this.block.height;
                break;
            case "a":
                this.target.x -= this.block.width;
                break;
            case "s":
                this.target.y += this.block.height;
                break;
            case "d":
                this.target.x += this.block.width;
                break;
        }
    }

    onKeyUp(event) {
    }

    moveTo(x, y) {
        this.sendGlobal({
            action: "moveTo",
            x: x,
            y: y
        });
    }

    update(state) {
        this.position.x = this.position.x + 0.15 * (this.target.x - this.position.x);
        this.position.y = this.position.y + 0.15 * (this.target.y - this.position.y);
    }

    draw(graphics) {
        /*graphics.fillColor(0.55, 0.9, 0.6, 1);
        graphics.fillCircle(this.position.x, this.position.y, 50);
        graphics.fillColor(0, 0, 0, 1);
        graphics.drawCircle(this.position.x, this.position.y, 50, 6);*/


        graphics.drawImage(this.block, this.position.x - this.block.width / 2, this.position.y - this.block.height / 2);


        graphics.fillColor(0, 0, 0, 1);
        graphics.fillText(this.id, this.position.x - graphics.textWidth(this.id) / 2, this.position.y + 4, 10, true, "Verdana");
    }

}