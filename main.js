//horn mini Draemmli
document.addEventListener("keypress", (e) => e.charCode == 104 ? document.getElementById("audio").play() : "");

// window
const HEIGHT = window.innerHeight - window.innerHeight * 50 / 100;
const WIDTH = window.innerWidth;

// car
const carSpeed = 30;
const car = new car(0, HEIGHT / 2.3, carSpeed);
let moving = false;

// trafficlight (Vielleicht Green fr erste mal) 
const tlPlacement = WIDTH * 85 / 100;
tlColor = "Green";
const trafficLight = new TrafficLight(tlPlacement, HEIGHT * 0.10);

// initial velocity
const percentageOfSpeed = 0;

function setup() {
    createCanvas(WIDTH, HEIGHT);
}

function draw() {
    clear();
    drawRoad();
    car.moveForward(fuzzyLogic(trafficLight.tick, tlPlacement - tlPlacement * 0.03, car.x));
    car.show();
    trafficLight.update();
    trafficLight.show();
}
