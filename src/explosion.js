import Entity from './entity'

export default class Explosion extends Entity {

    constructor(x, y) {
        super();
        this.x = x;
        this.y = y;
        this.size = 0;
        this.speed = 0.05;
        this.lifetime = 100;
    }

    update(deltaTime) {
        this.size += this.speed * deltaTime;
        if (this.size > this.lifetime) {
            this.kill();
        }
    }

    draw(graphics) {
        graphics.fillColor(1, 1, 0, 1 - this.size / this.lifetime);
        graphics.fillCircle(this.x, this.y, this.size);
        graphics.drawColor(1, 0, 0, 1 - this.size / this.lifetime);
        graphics.drawCircle(this.x, this.y, this.size, 5);
    }

}