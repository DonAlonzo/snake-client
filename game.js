$(function() {
    initCanvas();
    initSocket("boman.io", 9002);

    socket.onopen = function(event) {
    };

    socket.onmessage = function(event) {
        var msg = JSON.parse(event.data);
        if (msg.action == "click") {
            clearCanvas();
            drawCircle(msg.x, msg.y);
        }
    }

    $("#canvas").click(function(event) {
        var msg = {
            action: "click",
            x: event.pageX,
            y: event.pageY
        };
        socket.sendJSON(msg);
    });

    drawCircle(100, 100);
});

function initCanvas() {
    window.canvas = document.getElementById('canvas');
    window.context = document.getElementById('canvas').getContext('2d');
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
}

function initSocket(server, port) {
    window.socket = new WebSocket("ws://" + server + ":" + port);
    socket.sendJSON = sendJSON;
}

function clearCanvas() {
    context.clearRect(0, 0, canvas.width, canvas.height);
}

function drawCircle(x, y) {
    var radius = 10;

    context.beginPath();
    context.arc(x, y, radius, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

function sendJSON(msg) {
    this.send(JSON.stringify(msg));
}
