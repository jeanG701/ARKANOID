"use stric";

export default class Paddle {
    constructor() {}

    static drawPaddle() {
        ctx.drawImage(
            $sprite,
            28,
            174,
            paddleWidth,
            paddleHeight,
            paddleX,
            paddleY,
            paddleWidth,
            paddleHeight
        );

        Paddle.initEvent();
    }

    static paddleMovement() {
        if(rightPressed && paddleX < canvas.width - (paddleWidth + 1)) {
            paddleX += PADDLE_SENSITIVITY;
        } else if (leftPressed && paddleX > 1) {
            paddleX -= PADDLE_SENSITIVITY;
        }
    }

    static initEvent() {
        document.addEventListener("keydown", keyDownHandler);
        document.addEventListener("keyup", keyUpHandler);

        function keyDownHandler(event) {
            const { key } = event;
            
            if(key === "Rigth" || key === "ArrowRight") rightPressed = true;
            else if(key === "Left" || key === "ArrowLeft") leftPressed = true;
        }
        function keyUpHandler(event) {
            const { key } = event;
            if(key === "Rigth" || key === "ArrowRight") rightPressed = false;
            else if(key === "Left" || key === "ArrowLeft") leftPressed = false;
        }
    }
}