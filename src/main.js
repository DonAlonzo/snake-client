import Explosion from './explosion';
import Player from './player';
import Graphics from './graphics';
import World from './world';

class Main {

    constructor() {
        this.initContext();
        this.initWorld();
        this.initSocket("boman.io", 9002)
        this.initInputListeners();
    }

    initContext() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.graphics = new Graphics(canvas.getContext("2d"), this.canvas.width, this.canvas.height);
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
        switch (message.action) {
            case "click":
                this.world.addEntity(new Explosion(message.x, message.y));
                break;
        }
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
        this.timer = setInterval(() => {
            var t = new Date().getTime();
            var deltaTime = t - this.lastUpdate;
            this.update(deltaTime);
            this.draw(t);
            this.lastUpdate = t;
        }, 10);
    }

    update(deltaTime) {
        this.world.update(deltaTime);
    }

    draw(t) {
        //var r = (Math.sin(t / 1000) + 1) / 2;
        //var g = (Math.cos(t / 1000) + 1) / 2;
        //var b = 0.5;
        //graphics.fill
        this.world.draw(this.graphics);
    }

    stop() {
        clearInterval(timer);
    }

}

new Main().start();