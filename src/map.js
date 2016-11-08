import Entity from './entity'
import Block from './block'
import Tuple2 from './tuple2'

export default class Map extends Entity {

    constructor(width, height) {
        super();
        this.blocks = [];
        for (var x = 0; x < width; x++) {
            this.blocks.push(new Block(new Tuple2(x, 0)));
            this.blocks.push(new Block(new Tuple2(x, height - 1)));
        }
        for (var y = 0; y < height; y++) {
            this.blocks.push(new Block(new Tuple2(0, y)));
            this.blocks.push(new Block(new Tuple2(width - 1, y)));
        }
        this.collidables = this.blocks;
    }

    draw(graphics) {
        this.blocks.forEach((block) => {
            block.draw(graphics);
        });
    }

}