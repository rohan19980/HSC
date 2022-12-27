
function drawRoad() {
    RoadOutline();
    let xLine = WIDTH;
    for (let linesNumber = 0; linesNumber < 8; linesNumber++) {
        RoadLines(xLine, HEIGHT);
        xLine = xLine + WIDTH * 4.5;
    }
}

function RoadOutline() {
    fill('#2d2d2d');
    rect(0, HEIGHT / 3, WIDTH, HEIGHT / 3);
}

function RoadLines(x, y) {
    fill(0xffffff);
    rect(x * 5 / 100, HEIGHT / 2, WIDTH * 4 / 100, HEIGHT / 50);
}
