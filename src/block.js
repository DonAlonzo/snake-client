import Tuple2 from './tuple2'
import Entity from './entity'

const noBlocksX = 40;
const noBlocksY = 40;

export default class Block extends Entity {

    constructor(position) {
        super();
        this.position = position;
        this.loadResources();
    }

    loadResources() {
        this.image = new Image;
        this.image.src = "resources/images/block.png";
    }

    draw(graphics) {
        let blockSize = Math.min(graphics.width / noBlocksX, graphics.height / noBlocksY);
        graphics.drawImage(this.image, this.position.x * blockSize, this.position.y * blockSize, blockSize, blockSize);
        //graphics.fillColor(0, 0, 0, 1);
        //graphics.fillText(this.id, this.position.x - graphics.textWidth(this.id) / 2, this.position.y + 4, 10, true, "Verdana");
    }

}