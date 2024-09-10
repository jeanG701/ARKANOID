
const $ = element => document.querySelector(`${element}`);

document.addEventListener("DOMContentLoaded", () => {
    const canvas = $("#canvas");
    const sprite = $("#sprite");
    const stricks = $("#stricks");
    const ctx = canvas.getContext("2d");
    
    canvas.width = 448;
    canvas.height = 400;

    //* Variables del juego
    let PADDLE_SENSITIVITY = 7;
    let STATUS_GAME = false;

    //* VARIABLES DE LA PELOTA
    const ballRadius = 4;
    // Posicion de la pelota
    let x = canvas.width / 2;
    let y = canvas.height - 25;
    // Velocidad de la pelotas
    let dx = -2;
    let dy = -3;

    //* VARIBALES DE LA PATELA
    const paddleHeight = 10;
    const paddleWidth = 50;
    
    let paddleX = (canvas.width - paddleWidth) / 2;
    let paddleY = (canvas.height - paddleHeight) - 10;

    let rightPressed = false;
    let leftPressed = false;

    //* VARIABLES DE LOS LADRILLOS
    const brickRowCount = 6;
    const brickColumnCount = 10;
    const brickWidth = 40;
    const brickHeight = 18;
    const brickPadding = 3;
    const brickOffsetTop = 30;
    const brickOffsetLeft = 11;
    const bricks = [];

    const BRICK_STATUS = {
        ACTIVE : 1, 
        DESTROYED : 0
    }

    const BRICKS_POSITIONS = [
        {
            color : "Yellow",
            x : 425,
            y : 90,
        },
        {
            color : "Ligth Blue",
            x : 280,
            y : 90
        },
        {
            color : "Blue",
            x : 135,
            y : 90
        },
        {
            color : "Orange",
            x : 135,
            y : 170
        },
        {
            color : "Red",
            x : 280,
            y : 170,
        },
        {
            color : "Purple",
            x : 425,
            y : 170
        },
    ]

    function matrixBricks() {
        for(let c = 0; c < brickColumnCount; c++) {
            bricks[c] = [];
            for(let r = 0; r < brickRowCount; r++) {
                // Posicion del ladrillo en la pantalla
                const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
                const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
                // Asignar un color aleatoria a cada ladrillo
                const random = Math.floor(Math.random() * 6);
                bricks[c][r] = {
                    x : brickX, 
                    y : brickY, 
                    status : BRICK_STATUS.ACTIVE, 
                    color : random
                };
            }
        }
    }
    for(let c = 0; c < brickColumnCount; c++) {
        bricks[c] = [];
        for(let r = 0; r < brickRowCount; r++) {
            // Posicion del ladrillo en la pantalla
            const brickX = c * (brickWidth + brickPadding) + brickOffsetLeft;
            const brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
            // Asignar un color aleatoria a cada ladrillo
            const random = Math.floor(Math.random() * 6);
            bricks[c][r] = {
                x : brickX, 
                y : brickY, 
                status : BRICK_STATUS.ACTIVE, 
                color : random
            };
        }
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
        ctx.fillStyle = "#fff";
        ctx.fill();
        ctx.closePath();
    }

    function drawPaddle() {
        ctx.drawImage(
            sprite, 
            28, 
            174, 
            paddleWidth,
            paddleHeight,
            paddleX,
            paddleY,
            paddleWidth,
            paddleHeight
        );
    }

    function drawBricks() {
        for(let c = 0; c < brickColumnCount; c++) {
            for(let r = 0; r < brickRowCount; r++) {
                const currentBrick = bricks[c][r];
                if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;

                let random = currentBrick.color;
                ctx.drawImage(
                    stricks,
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

    function colisionDetection() {
        for(let c = 0; c < brickColumnCount; c++) {
            for(let r = 0; r < brickRowCount; r++) {
                const currentBrick = bricks[c][r];
                if(currentBrick.status === BRICK_STATUS.DESTROYED) continue;

                const isBallSameXAsBrick = 
                    x > currentBrick.x &&
                    x < currentBrick.x + brickWidth;

                const isBallSameYAsBrick = 
                    y > currentBrick.y &&
                    y < currentBrick.y + brickHeight;
                
                if(isBallSameXAsBrick && isBallSameYAsBrick) {
                    dy = -dy;
                    currentBrick.status = BRICK_STATUS.DESTROYED;
                }
            }
        }
    }

    function ballMovement() {
        // Rebotar las pelotas en los laterales
        if(x + dx > canvas.width - ballRadius || x + dx < ballRadius) dx = -dx;

        // Rebotar arriba
        if(y + dy < ballRadius) dy = -dy;

        const isBallSameXAsPaddle = x > paddleX && x < paddleX + paddleWidth;

        const isBallTouchingPaddle = y + dy > paddleY;
        // La pelota toca la pala
        if(isBallSameXAsPaddle && isBallTouchingPaddle) {
            dy = -dy; // Canbiar direccion de la pelota
        } else if(y + dy > canvas.height - ballRadius) { // "Game Over"
            matrixBricks();
            showMessage("Game Over");
            STATUS_GAME = false;           
            x = canvas.width / 2;
            y = canvas.height - 25;
            dx = -2;
            dy = -3;
        }

        x += dx;
        y += dy;
    }

    function paddleMovement() {
        if(rightPressed && paddleX < canvas.width - paddleWidth - 3) paddleX += PADDLE_SENSITIVITY;
        else if (leftPressed && paddleX > 3) paddleX -= PADDLE_SENSITIVITY;
    }
    
    function clearCanvas() {
        // Limpia el canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function initEvents() {
        document.addEventListener('keydown', keyDownHandler);
        document.addEventListener('keyup', keyUpHandler);

        function keyDownHandler(event) {
            const { key } = event;
            if(key === "Right" || key === "ArrowRight") rightPressed = true;
            else if (key === "Left" || key === "ArrowLeft") leftPressed = true;
        }

        function keyUpHandler(event) {
            const { key } = event;
            if(key === "Right" || key === "ArrowRight") rightPressed = false;
            else if (key === "Left" || key === "ArrowLeft") leftPressed = false;
        }
    }
    
    function draw() {
        clearCanvas();
        //* Dibujar los elementos
        drawBall();
        drawPaddle();
        drawBricks();
        //? drawScore();

        //* Coliciones y movimientos
        colisionDetection();
        initGame();

        window.requestAnimationFrame(draw);
    }

    document.addEventListener('keypress', e => {
        if(e.key === " " && !STATUS_GAME) {
            STATUS_GAME = true;
            clearMessage(); 
        }
    });

    function initGame() {
        if(STATUS_GAME) {
            ballMovement();
            paddleMovement();
        }
    } 
    
    showMessage('Presiona la tecla "espacio" para iniciar');
    draw();
    initEvents();
    matrixBricks();
});

function showMessage(msg) {
    const message = document.createElement("P");
    message.textContent = msg;
    message.classList.add("message");

    document.body.appendChild(message);
}

function clearMessage() {
    const message = $(".message");
    if(message) message.remove();
}