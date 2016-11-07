import Tuple2 from './tuple2'

const noBlocksX = 40;
const noBlocksY = 40;

export default class Block {

    constructor(position) {
        this.position = position;
        this.drawOrder = 1000;
        this.loadResources();
    }

    loadResources() {
        this.block = new Image;
        this.block.src = "resources/images/block.png";
    }

    draw(graphics) {
        let blockSize = Math.min(graphics.width / noBlocksX, graphics.height / noBlocksY);
        graphics.drawImage(this.block, this.position.x * blockSize, this.position.y * blockSize, blockSize, blockSize);

        graphics.fillColor(0, 0, 0, 1);
        graphics.fillText(this.id, this.position.x - graphics.textWidth(this.id) / 2, this.position.y + 4, 10, true, "Verdana");
    }

}