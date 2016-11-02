export default class Graphics {

    constructor(context, width, height) {
        this.context = context;
        this.width = width;
        this.height = height;
    }

    rgb2hex(r, g, b) {
        var rgb = (b*255) | ((g*255) << 8) | ((r*255) << 16);
        return '#' + (0x1000000 + rgb).toString(16).slice(1);
    }

    fillColor(r, g, b, a = 1) {
        this.context.globalAlpha = a;
        this.context.fillStyle = this.rgb2hex(r, g, b);
    }

    drawColor(r, g, b, a = 1) {
        this.context.globalAlpha = a;
        this.context.strokeStyle = this.rgb2hex(r, g, b);
    }

    clear() {
        this.context.fillRect(0, 0, this.width, this.height);
    }

    fillCircle(x, y, radius) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.fill();
    }

    drawCircle(x, y, radius, border = 1) {
        this.context.beginPath();
        this.context.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.context.lineWidth = border;
        this.context.stroke();
    }

    fillText(text, x, y, fontSize = 16, bold = true, font = "Arial") {
        this.context.font = (bold ? "bold" : "") + " " + fontSize + "px" + " " + font;
        this.context.fillText(text, x, y);
    }

}