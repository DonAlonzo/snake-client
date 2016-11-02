import Player from './player';
import World from './world';

class Main {

    constructor() {
        this.initGL();
        this.initWorld();
        this.initSocket("boman.io", 9002)
        this.initInputListeners();
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

    initSocket(server, port) {
        this.socket = new WebSocket("ws://" + server + ":" + port);
        this.socket.onopen = () => this.onSocketOpen()
        this.socket.onmessage = (message) => this.onMessage(JSON.parse(message.data))
        this.socket.onclose = () => this.onSocketClose()
    }

    initInputListeners() {
        var main = this;
        $("#canvas").click(function(event) {
            main.onClick(event.pageX, event.pageY);
        });
    }

    onSocketOpen() {
        console.log('Connection established.')
    }

    onSocketClose() {
        console.log('Connection closed.')
    }

    onMessage(message) {
        console.log(message)
    }

    onClick(x, y) {
        this.send({
            action: "click",
            x: x,
            y: y
        });
    }

    send(message) {
        this.socket.send(JSON.stringify(message));
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