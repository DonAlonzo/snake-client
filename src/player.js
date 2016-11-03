import Entity from './entity'
import Tuple2 from './tuple2'

export default class Player extends Entity {

    constructor(x, y) {
        super();
        this.position = new Tuple2(x, y);
        this.target = new Tuple2(x, y);
        this.velocity = new Tuple2(0, 0);
        this.acceleration = 500;
        this.maxSpeed = 0.2;
        this.drag = 0.98;
        this.drawOrder = 1000;
    }

    onMessage(message) {
        if (message.origin == this.constructor.name && message.entityid == this.id) {
            console.log(message);
        }
    }

    onMouseDown(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    onMouseDrag(x, y) {
        this.target.x = x;
        this.target.y = y;
    }

    update(deltaTime) {
        var direction = this.target.sub(this.position);
        if (direction.length() > 0) {
            var acceleration = direction.normalize().mul(this.acceleration).mul(deltaTime);
            this.velocity = this.velocity.add(acceleration).mul(this.drag).clamp(this.maxSpeed);
            this.position = this.position.add(this.velocity.mul(deltaTime));
        }

        /*this.sendLocal({
            action: "moveTo",
            x: this.position.x,
            y: this.position.y
        });*/
    }

    draw(graphics) {
        graphics.fillColor(0.55, 0.9, 0.6, 1);
        graphics.fillCircle(this.position.x, this.position.y, 50);
        graphics.fillColor(0, 0, 0, 1);
        graphics.drawCircle(this.position.x, this.position.y, 50, 6);
        graphics.fillColor(0, 0, 0, 1);
        var text = "Boman";
        graphics.fillText(text, this.position.x - graphics.textWidth(text) / 2, this.position.y + 4,
                        10, true, "Verdana");
    }

}