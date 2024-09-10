"use stric"
1
//* Imports 
import { $, amountBricks } from "../useful.js"
import { firstLevel, nothingLevel, secondLevel } from "../levels/levels.js";
import UI from "./UI.js";

//* Selectors 
const $bricks = $("#bricks");

//* Posticion Bricks
const BRICKS_POSITIONS = [
    {
        color : "Ligth Blue",
        x : 280,
        y : 90
    },
    {
        color : "Orange",
        x : 135,
        y : 170
    },
    {
        color : "Yellow",
        x : 425,
        y : 90,
    },
    {
        color : "Red",
        x : 280,
        y : 170,
    },
    {
        color : "Blue",
        x : 135,
        y : 90
    },
    {
        color : "Purple",
        x : 425,
        y : 170
    },
    {
        color : "Gray",
        x : 425,
        y : 250
    }
]

//* VARIABLES DE LOS LADRILLOS
let printLevel;

const BRICK_STATUS = {
    INDESTROYED : 2,
    ACTIVE : 1, 
    DESTROYED : 0
}

export default class Bricks {
    constructor() {}
    
    static levelCurrent() {
        switch (LEVEL) {
            case 1:
                printLevel = firstLevel;
                break;
                
            case 2:
                printLevel = secondLevel;
                break;

            default:
                printLevel = firstLevel;
                UI.showMessage("Felicitaciones por pasar el Juego");
                LIFES = 3;
                LEVEL = 1;
                break;
        }

        matrixBrinck(printLevel);
    }

    static drawBricks(reload = false) { 
        if(printLevel === undefined || reload) Bricks.levelCurrent(printLevel);

        BRICKS_ACTIVES = amountBricks(bricks);

        for (let r = 0; r < brickRowCount; r++) {
            for (let c = 0; c < brickColumnCount; c++) {
                const currentBrick = bricks[r][c];
                
                if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;
                
                let random = currentBrick.color;

                ctx.drawImage(
                    $bricks,
                    BRICKS_POSITIONS[random].x,
                    BRICKS_POSITIONS[random].y,
                    80,
                    30,
                    currentBrick.x,
                    currentBrick.y,
                    brickWidth,
                    brickHeight
                );

            }
        }
    }

    static colisionDetection() {
        for (let r = 0; r < brickRowCount; r++) {
            for (let c = 0; c < brickColumnCount; c++) {
                const currentBrick = bricks[r][c];
                if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;

                const isBallSameXTopAsBrick = 
                    y > currentBrick.y - BALL_RADIUS &&
                    y < currentBrick.y + brickHeight / 3 &&
                    x > currentBrick.x + BALL_RADIUS &&
                    x < currentBrick.x + brickWidth - BALL_RADIUS;

                const isBallSameXBottomAsBrick = 
                    y < currentBrick.y + brickHeight + BALL_RADIUS &&
                    y > currentBrick.y + brickHeight - brickHeight / 3 &&
                    x > currentBrick.x + BALL_RADIUS &&
                    x < currentBrick.x + brickWidth - BALL_RADIUS;
                
                const isBallSameYLeftAsBrick = 
                    x > currentBrick.x - BALL_RADIUS - 3 &&
                    x < currentBrick.x + brickWidth / 3 &&
                    y > currentBrick.y + BALL_RADIUS &&
                    y < currentBrick.y + brickHeight - BALL_RADIUS;

                const isBallSameYRightAsBrick = 
                    x < currentBrick.x + brickWidth + BALL_RADIUS &&
                    x > currentBrick.x + brickWidth - brickWidth / 3 &&
                    y > currentBrick.y + BALL_RADIUS &&
                    y < currentBrick.y + brickHeight - BALL_RADIUS;

                if(isBallSameXTopAsBrick || isBallSameXBottomAsBrick) {
                    dy = -dy;

                    let color;
                    if(currentBrick.status !== BRICK_STATUS.INDESTROYED) color = currentBrick.color = --currentBrick.color;

                    if(color < 0) {
                        currentBrick.status = BRICK_STATUS.DESTROYED;
                        BRICKS_ACTIVES--;
                    }
                    
                    SCORE += 3;
                } else if (isBallSameYLeftAsBrick || isBallSameYRightAsBrick) {
                    dx = -dx;

                    let color;
                    if(currentBrick.status !== BRICK_STATUS.INDESTROYED) color = currentBrick.color = --currentBrick.color;

                    if(color < 0) {
                        currentBrick.status = BRICK_STATUS.DESTROYED;
                        BRICKS_ACTIVES--;
                    } 

                    SCORE += 3;
                }

                if(BRICKS_ACTIVES === 0) {
                    // Reiniciar todos los elementos
                    x = canvas.width / 2;
                    y = canvas.height - 24;
                    paddleX = (canvas.width - paddleWidth) / 2;
                    dx = -2;
                    dy = -3;
                }
            }
        }
    }
}

function matrixBrinck(level) {
    for (let r = 0; r < brickRowCount; r++) {
        bricks[r] = [];
        for (let c = 0; c < brickColumnCount; c++) {
            // Posicion del ladrillo en la pantalla
            const brickX = c * brickWidth + brickOffsetLeft;
            const brickY = r * brickHeight + brickOffsetTop;

            let statusBrick = BRICK_STATUS.ACTIVE;
            if(level[r][c] >= 6) statusBrick = BRICK_STATUS.INDESTROYED;
            if(level[r][c] === -1) statusBrick = BRICK_STATUS.DESTROYED;

            bricks[r][c] = {
                x : brickX,
                y : brickY,
                status : statusBrick,
                color : level[r][c],
            }
        }
    }
}