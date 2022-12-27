
/*
Traffic light has 3 stages: [Green, Orange, Red]
encoded as [0, 1, 2] respectively
It takes: 
    300 ticks = Orange -> Red
    300 ticks = Red -> Green
    120 ticks = Green -> Orange

The method update() must be called every time during the drawing phase
always before the show method.
*/
const redTick = 300;
const greenTick = 300;
const orangeTick = 150;

class TrafficLight {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.tick = 1;
        this.stage = 2;
        this.tlDistance;
        this.tlColor;
    }

    show() {
        translate(this.x, this.y);
        const GREY = '#636c70';
        const GREEN = '#00ff00';
        const RED = '#ff0000';
        const ORANGE = '#e1891b';


        // Border
        fill('#000000'); // black
        rect(0, 0, HEIGHT * 9.7 / 100, HEIGHT * 20.7 / 100);

        // Red Light
        fill(this.stage == 2 ? RED : GREY);
        circle(HEIGHT * 0.05, HEIGHT * 4 / 100, HEIGHT * 2.7 / 100);

        // Orange Light
        fill(this.stage == 1 ? ORANGE : GREY);
        circle(HEIGHT * 0.05, HEIGHT * 10.2 / 100, HEIGHT * 2.7 / 100);

        // Green Light
        fill(this.stage == 0 ? GREEN : GREY);
        circle(HEIGHT * 0.05, HEIGHT * 16.5 / 100, HEIGHT * 2.7 / 100);
    }

    update() {
        this.tick++;
        document.getElementById("tlTick").value = this.tick;

        if (this.tick == redTick) {
            this.stage = 0;
        } else if (this.tick == redTick + greenTick) {
            this.stage = 1;
        } else if (this.tick == redTick + greenTick + orangeTick) {
            this.tick = 1;
            this.stage = 2;
        }

        document.getElementById("colorShow").value = this.tlColor;
    }
}
