<!DOCTYPE html>
<html>
<head>
    <title>snek</title>
    <style>
        * { margin: 0; padding: 0;}

        body, html { height:100%; }

        #canvas {
            position:absolute;
            width:100%;
            height:100%;
            -ms-touch-action:manipulation;
            touch-action:manipulation;
        }
    </style>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
</head>
<body>
	<canvas id="canvas"></canvas>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
	<script src="./game.js"></script>
</body>
</html>
