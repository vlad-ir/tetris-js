import { Game } from "./game.js";
import { View } from "./view.js";
import { Controller } from "./controller.js";

export const SIZE_BLOCK = 30
export const COLUMNS = 10
export const ROWS = 20

const game = new Game()
const view = new View(document.querySelector(".container"))
const controller = new Controller(game, view) 

controller.init('Enter')


