export default class World {

    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        var i = this.entities.indexOf(entity);
        if (i != -1) {
            this.entities.splice(i, 1);
        } else {
            throw new Exception("No such element");
        }
    }

    update(deltaTime) {
        this.entities.forEach((entity) => {
            entity.update(deltaTime);
            if (!entity.alive) {
                this.removeEntity(entity);
            }
        });
    }

    draw(graphics) {
        this.entities.forEach((entity) => {
            entity.draw(graphics);
        });
    }

}