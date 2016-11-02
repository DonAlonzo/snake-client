export default class Graphics {

    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
    }

    drawCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fillStyle = 'green';
        this.context.fill();
        this.context.lineWidth = 5;
        this.context.strokeStyle = '#003300';
        this.context.stroke();
    }

}