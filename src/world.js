class World {

    constructor() {
        this.entities = [];
    }

    addEntity(entity) {
        this.entities.push(entity);
    }

    removeEntity(entity) {
        var i = entities.indexOf(entity);
        if (i != -1) {
            entities.splice(i, 1);
        } else {
            throw new Exception("No such element");
        }
    }

    update() {
        this.entities.forEach((entity) => {
            entity.update();
        });
    }

}