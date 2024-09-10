"use stric";

//* Imports 
import Ball from "./Ball.js";
import Paddle from "./Paddle.js";
import Bricks from "./Bricks.js";
import UI from "./UI.js";
import { amountBricks } from "../useful.js";

export default class Arkanoid {
    constructor() {}

    static draw() {
        Arkanoid.clearCanvas();
        //* Dibujar los elementos
        Ball.drawBall();
        Paddle.drawPaddle();
        Bricks.drawBricks();

        //* Coliciones y movimientos
        if(INIT_GAME && BRICKS_ACTIVES > 0) {
            Paddle.paddleMovement();
            Ball.ballMovement();
            Bricks.colisionDetection();

            INIT_GAME = Ball.gameOver();

            if(BRICKS_ACTIVES <= 0) {
                LEVEL++;
                UI.showMessage(`Level ${LEVEL}`);
                Bricks.drawBricks(true);
            }
        }

        //* Mostrar Nivel y Puntuacion
        UI.showLevel();
        UI.showScore();
        
        window.requestAnimationFrame(Arkanoid.draw);

    }

    static initGame() {
        document.addEventListener("keypress", e => {
            if(e.key === "Enter") {
                INIT_GAME = true;
                UI.clearMessage();
            
                if(LIFES === 0) {
                    LIFES = 3;
                    UI.showLifes();
                }

                if(BRICKS_ACTIVES === 0) {
                    BRICKS_ACTIVES = amountBricks(bricks);
                }
            }
        });
    }

    static clearCanvas() {
        // Limpia el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}