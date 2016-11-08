import Map from './map'
import Tuple2 from './tuple2'
import Food from './food'

export default class World {

    constructor() {
        this.entities = [];
        this.collidables = [];

        this.obstacles = new Map(40, 40);
        this.addEntity(this.obstacles);

        this.spawnFood();
    }

    spawnFood() {
        this.addEntity(new Food(new Tuple2(this.getRandomInt(1, 39), this.getRandomInt(1, 39))));
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    getSpawn() {
        return new Tuple2(this.getRandomInt(10, 30), this.getRandomInt(10, 30));
    }

    addEntity(entity) {
        entity.id = Math.random().toString(36).substring(2, 7);
        entity.world = this;
        if (entity.collidables) {
            entity.collidables.forEach((collidable) => {
                this.collidables.push(collidable);
            });
        }

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
            throw "No such element";
        }

        if (entity.collidables) {
            entity.collidables.forEach((collidable) => {
                var i = this.collidables.indexOf(collidable);
                if (i != -1) {
                    this.collidables.splice(i, 1);
                } else {
                    throw "No such element";
                }
            });
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