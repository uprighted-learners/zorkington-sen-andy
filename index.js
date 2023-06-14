const { start, ask } = require("./main-game");

const title = `
\n
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
|||                                                                                  |||
|||   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||   |||
|||   |||        ||  ||||  ||        ||||       ||||      ||||      |||       ||||   |||
|||   ||||||  |||||  ||||  ||  ||||||||||  ||||  ||  ||||  ||  ||||  ||  ||||  |||   |||
|||   ||||||  |||||        ||        ||||  ||||  ||  ||||  ||  ||||  ||       ||||   |||
|||   ||||||  |||||  ||||  ||  ||||||||||  ||||  ||  ||||  ||  ||||  ||  |||  ||||   |||
|||   ||||||  |||||  ||||  ||        ||||       ||||      ||||      |||  ||||  |||   |||
|||   ||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||   |||
|||                                                                                  |||
||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||
\n
`;

console.log(title);

let mainMenu = async () => {
	console.log("Type [s]tart | [q]uit | [i]nstructions:\n");

	let input = await ask("\n>_");
	if (input == "start" || input == "s") {
		start();
		return;
	} else if (input == "quit" || input == "q") {
		process.exit;
	} else if (input == "instructions" || input == "i") {
		console.log(`
In game help:
[i]nventory | [s]earch | [ac]tions available

Example Commands:
read sign
enter kitchen
use keypad 8374

		`);
	}
	mainMenu();
}

mainMenu();