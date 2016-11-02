import Entity from './entity'

export default class Explosion extends Entity {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.size = 0;
        this.speed = 0.1;
        this.lifetime = 80;
    }

    onMessage(message) {
        if (message.origin == this.constructor.name) {
            console.log(message.action);
        }
    }

    update(deltaTime) {
        this.size += this.speed * deltaTime;
        if (this.size > this.lifetime) {
            this.kill();

            this.sendLocal({
                action: "boom"
            });
        }
    }

    draw(graphics) {
        var t = this.size / this.lifetime;
        graphics.fillColor(1, 1, 0, 1 - t);
        graphics.fillCircle(this.x, this.y, this.size);
        graphics.drawColor(1, 0, 0, 1 - t);
        graphics.drawCircle(this.x, this.y, this.size, t * 10);
    }

}