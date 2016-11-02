import Explosion from './explosion';
import Player from './player';
import Graphics from './graphics';
import World from './world';

class Main {

    constructor() {
        this.initContext();
        this.initSocket("boman.io", 9002)
        this.initWorld( );
        this.initEvents();
    }

    initContext() {
        this.canvas = document.getElementById("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.graphics = new Graphics(canvas.getContext("2d"), this.canvas.width, this.canvas.height);
    }

    initWorld() {
        this.world = new World();
        this.world.sendGlobal = message => this.socket.send(JSON.stringify(message));
        this.world.sendLocal = message => this.onMessage(message);

        this.player = new Player();
        this.world.addEntity(this.player);
    }

    initSocket(server, port) {
        this.socket = new WebSocket("ws://" + server + ":" + port);
        this.socket.onopen = () => this.onSocketOpen()
        this.socket.onmessage = (message) => this.onMessage(JSON.parse(message.data))
        this.socket.onclose = () => this.onSocketClose()
    }

    initEvents() {
        var main = this;
        $(document)
        .mousedown(e => {
            main.onMouseDown(e.pageX, e.pageY);
            return false;
        })
        .mouseup(e => {
            main.onMouseUp(e.pageX, e.pageY);
            return false;
        })
        .contextmenu(() => {
            return false;
        })
        .mousemove(e => {
            main.onMouseMove(e.pageX, e.pageY);
            return false;
        })
        .keydown(e => {
            main.onKeyDown({ keyCode: e.keyCode, key: e.key, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey })
            return false;
        })
        .keyup(e => {
            main.onKeyUp({ keyCode: e.keyCode, key: e.key, shiftKey: e.shiftKey, ctrlKey: e.ctrlKey, altKey: e.altKey })
            return false;
        });
    }

    onSocketOpen() {
        console.log("Connection established.")
    }

    onSocketClose() {
        console.log("Connection closed.")
    }

    onMessage(message) {
        this.world.onMessage(message);
        switch (message.action) {
            case "click":
                this.world.addEntity(new Explosion(message.x, message.y));
                break;
        }
    }

    onMouseDown(x, y) {
        this.world.onMouseDown(x, y);
    }

    onMouseUp(x, y) {
        this.world.onMouseUp(x, y);
    }

    onMouseMove(x, y) {
        this.world.onMouseMove(x, y);
    }

    onKeyDown(event) {
        this.world.onMouseMove(event);
    }

    onKeyUp(event) {
        this.world.onMouseMove(event);
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
        var r = (Math.sin(t / 2000) + 1) * 0.5 * 0.6 + 0.2;
        var g = (Math.cos(t / 2000) + 1) * 0.5 * 0.6 + 0.2;
        var b = 0.5;
        this.graphics.fillColor(r, g, b);
        this.graphics.clear();
        this.world.draw(this.graphics);
    }

    stop() {
        clearInterval(timer);
    }

}

new Main().start();