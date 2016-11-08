export default class Tuple2 {

    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Tuple2(this.x, this.y);
    }

    add(b) {
        return new Tuple2(this.x + b.x, this.y + b.y);
    }

    sub(b) {
        return new Tuple2(this.x - b.x, this.y - b.y);
    }

    mul(s) {
        return new Tuple2(this.x * s, this.y * s);
    }

    length() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
    }

    normalize() {
        var length = this.length();
        return new Tuple2(this.x / length, this.y / length);
    }

    clamp(min, max) {
        return this.normalize().mul(Math.min(Math.max(this.length(), min), max));
    }

    clamp(max) {
        return this.normalize().mul(Math.max(this.length(), max));
    }

    distance(b) {
        return this.sub(b).length();
    }

}