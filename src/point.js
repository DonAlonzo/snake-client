export default class Point {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    distance(b) {
        const dx = x - b.x;
        const dy = y - b.y;

        return Math.sqrt(dx*dx + dy*dy);
    }

}