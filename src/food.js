import Block from './block'

export default class Food extends Block {

    constructor(position) {
        super(position);
        this.collidables = [this];
    }

    loadResources() {
        this.image = new Image;
        this.image.src = "resources/images/food.png";
    }

}