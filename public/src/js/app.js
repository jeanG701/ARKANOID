"use stric";

//* Imports
import Arkanoid from "./classes/Arkanoid.js"
import UI from "./classes/UI.js";

document.addEventListener("DOMContentLoaded", () => {

    UI.showMessage("Presiona \"Enter\" para empezar");
    UI.showLifes();
    Arkanoid.draw();
    Arkanoid.initGame();
});