export default class World {

    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        entity.id = Math.random().toString(36).substring(2, 7);

        entity.sendGlobal = (message) => {
            message.origin = entity.constructor.name;
            message.entityid = entity.id;
            this.sendGlobal(message);
        };

        entity.sendLocal = (message) => {
            message.origin = entity.constructor.name;
            message.entityid = entity.id;
            this.sendLocal(message);
        };

        this.entities.push(entity);
        this.entities.sort((a, b) => a.drawOrder > b.drawOrder);
    }

    removeEntity(entity) {
        var i = this.entities.indexOf(entity);
        if (i != -1) {
            this.entities.splice(i, 1);
        } else {
            throw new Exception("No such element");
        }
    }

    update(state) {
        this.entities.forEach((entity) => {
            entity.update(state);
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

    onMessage(message) {
        this.entities.forEach((entity) => {
            entity.onMessage(message);
        });
    }

    onMouseDown(x, y) {
        this.entities.forEach((entity) => {
            entity.onMouseDown(x, y);
        });
    }

    onMouseUp(x, y) {
        this.entities.forEach((entity) => {
            entity.onMouseUp(x, y);
        });
    }

    onMouseMove(x, y) {
        this.entities.forEach((entity) => {
            entity.onMouseMove(x, y);
        });
    }

    onMouseDrag(x, y) {
        this.entities.forEach((entity) => {
            entity.onMouseDrag(x, y);
        });
    }

    onKeyDown(event) {
        this.entities.forEach((entity) => {
            entity.onKeyDown(event);
        });
    }

    onKeyUp(event) {
        this.entities.forEach((entity) => {
            entity.onKeyUp(event);
        });
    }

}