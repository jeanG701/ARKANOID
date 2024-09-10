"use stric";

//* Imports 
import { $ } from "../useful.js"

//* Selectors
const lifes = document.querySelectorAll(".life");
const level = $("#level");
const score = $("#score");

export default class UI {
    constructor() {}

    static showMessage(msg) {
        UI.clearMessage();

        const message = document.createElement("P");
        message.classList.add("message");
        message.id = "message";
        message.textContent = msg;

        document.body.appendChild(message);
    }

    static showLifes() {
        for (let i = 0; i < lifes.length; i++) {
            if(i < LIFES) lifes[i].style.opacity = 1;
            else lifes[i].style.opacity = 0.5;
        }
    }

    static showLevel() {
        level.textContent = LEVEL;
    }
    
    static showScore() {
        score.textContent = SCORE;
    }

    static clearMessage() {
        const message = $("#message");
        if(message) message.remove();
    }
}