import Player from './player';
import World from './world';

class Main {

    constructor() {
        this.initGL();
        this.initWorld();
    }

    initGL() {
        var canvas = document.getElementById("canvas");
        this.gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (!this.gl) {
            alert("Unable to initialize WebGL. Your browser may not support it.");
        }
    }

    initWorld() {
        this.player = new Player();
        this.world = new World();
        this.world.addEntity(this.player);
    }

    start() {
        this.timer = setInterval(() => { this.update(this.gl); }, 10);
    }

    update(gl) {
        this.world.update();

        var t = new Date().getTime() / 1000;
        var r = (Math.sin(t) + 1) / 2;
        var g = (Math.cos(t) + 1) / 2;
        var b = 0.5;

        gl.clearColor(r, g, b, 1.0);
        gl.enable(gl.DEPTH_TEST);
        gl.depthFunc(gl.LEQUAL);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    }

    stop() {
        clearInterval(timer);
    }

}

new Main().start();