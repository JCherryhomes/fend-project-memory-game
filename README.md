# Memory Game Project

## Project Notes

The stopwatch code was modified from [https://codepen.io/_Billy_Brown/pen/dbJeh](https://codepen.io/_Billy_Brown/pen/dbJeh).

If you wish to use the included express.js server you will need to run `npm install` from the project root.
Once npm has installed express.js you can run the server using the command: `node index.js`.

The project can then be opened at [http://localhost:3000](http://localhost:3000).

This is optional since the index.html file can just be opened directly in a browser if desired.

## Project Dependencies

- [SweetAlert.js](https://sweetalert.js.org)
- [FontAwesome](https://fontawesome.com/)
- [Google Fonts (Coda)](https://fonts.google.com/specimen/Coda)

## Playing the Game

The page will display your current rating, the number of attempts and the time elapsed in seconds above the board.

Click on a card to start the game. When two cards are turned over the game will check for a match. If the cards match they will be highlighted and remain turned over. If they do not match then they will be hidden after a short pause.

The game is finished once all cards have been matched. You will have the option to start a new game or to leave the board in its current state.

You can click the `restart` button at any time to reset the board and start a new game.

