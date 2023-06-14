const readline = require("readline");
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

const { itemActions } = require('./item');
const { items, keyItems } = require('./items');
const { roomLookUp, roomStates } = require('./room');
const { player } = require('./player');

function ask(questionText) {
	return new Promise((resolve, reject) => {
		readlineInterface.question(questionText, resolve);
	});
}

// * starting value * //
player.currentRoom = roomLookUp["outside"];
items.cat.isOpen = true;
const welcomeMessage = `Friday 13th, 2029

Art works as an importer/exporter. After a long day of importing and exporting,
he likes to relax at home. On his way, he found a mysterious door.
Art walked down this street everyday for the past ten years and never seen this
door.

Intrigued, Art 'examine door', a keypad sits on the handle, on the door is a sign.`;

async function start() {
	console.clear();
	console.log(welcomeMessage);

	while(true) {

		// * capture and clean input from user * //
		let input = await ask("\n>_");
		let cleanInput = input.toLowerCase().trim();

		// * split words into array * //
		let wordArr = cleanInput.split(' ');

		// * get action word * //
		let actionStr = wordArr.shift().toLowerCase();

		// * see inventory * //
		if (actionStr === "inventory" || actionStr === "i") {
			if (player.inventory.length == 0) {
				console.log("Art is is not carrying anything.");
			} else {
				console.log("Art is carrying:");
				player.inventory.forEach(item => console.log(item.name));
			}
			continue;
		} else if (actionStr === "actions" || actionStr === "ac") {
			console.log("Art can perform these actions:");
			Object.keys(itemActions).forEach(action => console.log(action));
			continue;
		} else if (actionStr === "search" || actionStr === "s") {
			console.log(`Current Room:\n${player.currentRoom.name}`);
			console.log("\nItems in the room:");
			player.currentRoom.roomInventory.forEach(item => console.log(item.name));
			console.log("\nAvailable rooms:");
			roomStates[player.currentRoom.name].forEach(roomStr => console.log(roomStr));
			continue;
		}

		// * check for blank action word, if blank continue * //
		if (actionStr.length == 0) {
			continue;
		}

		// * check for available actions, if not log and continue * //
		if (!Object.keys(itemActions).includes(actionStr)) {
			console.log(`${actionStr} is not something Art can do.`);
			continue;
		}
		
		// * check if the action is 'enter', check if the room has item, then get item from player inventory * //
		let targetStr = wordArr.shift().toLowerCase();
		let currentTarget;
		if (actionStr === "enter") {
			currentTarget = roomLookUp[targetStr] ? roomLookUp[targetStr].name : false;
		} else {
			currentTarget = player.getInventoryItem(targetStr) || player.currentRoom.getItem(targetStr);	
		}

		if (!currentTarget) {
			console.log(`There is no ${targetStr} to ${actionStr}`);
			continue;
		}

		// * handle action string and item/room * //
		let output;
		switch(actionStr) {
			case itemActions.examine:
				output = currentTarget.examine();
				break;
			case itemActions.read:
				output = currentTarget.read();
				break;
			case itemActions.open:
				// * Stop user from opening the cat, opening the cat would unlock a keyItem: matches * //
				if (currentTarget.name === "cat") {
					console.log("Please don't open the cat.");
					continue;
				}
				output = currentTarget.open(player.currentRoom);
				break;
			case itemActions.take:
				// ! lose condition ! //
				if (currentTarget.name === "cat") {
					console.log("The cat did not like being picked up. The cat became angry and scratch one of Art's main arteries.");
					output = await ask("\nEnter anything thing to quit game.");
					process.exit();
				}

				output = currentTarget.take(player);
				break;
			case itemActions.drop:
				// * Special: check for cat and catfood in same room inventory * //
				if (currentTarget.name === "catfood"
				&& player.currentRoom.roomInventory.includes(items.cat)) {
					currentTarget.drop(player);
					items.cat.isOpen = false;
					output = items.cat.open(player.currentRoom);
					console.log(output);
					continue;
				}

				// * Special: check for cat and hotdog in same room inventory * //
				if (currentTarget.name === "hotdog"
				&& player.currentRoom.roomInventory.includes(items.cat)) {
					console.log("The cat starts pawing at the hotdog.");
				}

				output = currentTarget.drop(player);
				break;
			case itemActions.use:
				// * get third word * //
				let code = wordArr.shift();

				// * Special: set the string 'key' to the keyItems.key * //
				if (code === "key" && currentTarget === items.skullDoor) code = keyItems.key;

				output = currentTarget.use(player, code);
				break;
			case itemActions.eat:
				// ! lose condition ! //
				if (currentTarget.name === "cookie") {
					console.log("The cookie was moldy, Art is now dead");
					output = await ask("\nEnter anything thing to quit game.");
					process.exit();
				}

				output = currentTarget.eat(player);
				break;
			case itemActions.enter:
				// ! win condition ! //
				if (currentTarget === "basement"
				&& player.inventory.some(item => item.name == "candle") 
				&& player.inventory.some(item => item.name == "matches")) {
					console.log(`Art lit the candle with the matches. Unsure what he will find. He made his way into the basement and he found a surprise birthday party! All his friends knew that he loves a mystery and he would not be able to help himself. Art was so surprised. He asked "How did Art get the cat in on it?". Everybody looked confused, what cat?`);
					output = await ask("\nEnter anything thing to quit game.");
					process.exit();
				}
				output = player.enter(currentTarget);
				break;
		}
		console.log(output);
	}
}

module.exports = { start, ask };