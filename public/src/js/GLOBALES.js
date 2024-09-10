"use stric";

//* Selectors
const canvas = document.querySelector("#canvas");
const $sprite = document.querySelector("#sprite");

//* VARIABLES GLOBALES
const ctx = canvas.getContext("2d");

canvas.width = 448;
canvas.height = 400;

//* VARIALBES DEL JUEGO
const PADDLE_SENSITIVITY = 7;
const BALL_RADIUS = 4;

let INIT_GAME = false;
let LIFES = 3;
let LEVEL = 1;
let SCORE = 0;
let BRICKS_ACTIVES = 5;

//* VARIBALES DE LA PELOTA
// Posicion de la pelota
let x = canvas.width / 2;
let y = canvas.height - 24;
// velocidad de la pelota
let dx = -2;
let dy = -3;

//* VARIABLES DE LA PALETA
const paddleWidth = 50;
const paddleHeight = 10;

let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = (canvas.height - paddleHeight) - 10;

let rightPressed = false;
let leftPressed = false;

//* VARIABLES DE LOS LADRILLOS
const brickRowCount = 6;
const brickColumnCount = 10;
const brickWidth = 42;
const brickHeight = 20;
const brickPadding = 3;
const brickOffsetTop = 30;
const brickOffsetLeft = 14;
const bricks = [];
