"use stric";

//* Imports 
import UI from "./UI.js";
import Bricks from "./Bricks.js";

export default class Ball {
    constructor() {}

    static drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, BALL_RADIUS, 0, (Math.PI * 2));
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

    static ballMovement() {
        // Rebotar las pelotas en los laterales
        if(x + dx > canvas.width - BALL_RADIUS || x + dx < BALL_RADIUS) dx = -dx;

        // Rebotar arriba
        if(y + dy < BALL_RADIUS) dy = -dy;

        const isBallSameXAsPaddle = 
            y > paddleY - BALL_RADIUS &&
            y < paddleY + paddleHeight / 2 &&
            x > paddleX + BALL_RADIUS &&
            x < paddleX + paddleWidth - BALL_RADIUS;
        
        const isBallSameYRigthAsPaddle = 
            x <= paddleX + paddleWidth &&
            x > paddleX + paddleWidth - paddleWidth / 3 && 
            y > paddleY + BALL_RADIUS &&
            y < paddleY + paddleHeight - BALL_RADIUS;

        const isBallSameYLeftAsPaddle = 
            x >= paddleX - BALL_RADIUS &&
            x < paddleX + paddleWidth / 3 &&
            y > paddleY + BALL_RADIUS &&
            y < paddleY + paddleHeight - BALL_RADIUS;

        if(isBallSameXAsPaddle) {
            dy = -dy;
        } else if (isBallSameYRigthAsPaddle) {
            dy = -dy;
            dx = -dx;
        } else if (isBallSameYLeftAsPaddle) {
            dy = -dy;
            dx = -dx;
        }

        Ball.gameOver();

        x += dx;
        y += dy;
    }

    static gameOver() {
        if(y + dy > canvas.width + BALL_RADIUS) {
            // Memar vidas y mostrarlas
            --LIFES;
            UI.showLifes();

            // Verificar vidas he imprimir el Game Over;
            if(LIFES === 0) {
                UI.showMessage("Game Over");
                Bricks.drawBricks(true);
                SCORE = 0;
            }

            // Reiniciar todos los elementos
            x = canvas.width / 2;
            y = canvas.height - 24;
            paddleX = (canvas.width - paddleWidth) / 2;
            dx = -2;
            dy = -3;
            
            return false;
        }
        return true;
    }
}