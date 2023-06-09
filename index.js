const readline = require("readline");
const readlineInterface = readline.createInterface(process.stdin, process.stdout);

const items = require('./items');
const { checkRoomConnection } = require('./room')
const { player, actions } = require('./player')

function ask(questionText) {
  return new Promise((resolve, reject) => {
    readlineInterface.question(questionText, resolve);
  });
}

start();

async function start() {
  const welcomeMessage = `Friday 13th, 2029
Art works as an importer/exporter. After a long day of importing and exporting,
he likes to relax at home. On his way there, he found a mysterious door.
Art walk pass here everyday for the past ten years and never notice.
Intrigued, Art examine door. A keypad sits on the handle. On the door is a sign.`;
  console.log(welcomeMessage);
  while(true) {
    let input = await ask("\n>_");

    // * check for blank input
    let wordArr = input.split(' ');
    let actionStr = wordArr.shift();
    if (actionStr.length == 0) {
      continue;
    }

    // * check for action word
    if (!Object.keys(actions).includes(actionStr)) {
      console.log(`${actionStr} is not something Art can do.`)
      continue;
    }

    // * check for item word
    let itemStr = wordArr.shift();

    // * get item and and check if the item is in the room
    let item = items[itemStr];
    if (!item || !(item)) {
      console.log(`There is no ${itemStr} to ${actionStr}`);
      continue;
    }
    
    // * handle actions and items
    switch (item.constructor.name) {
      case "Puzzle":
        let code = wordArr.shift();
        console.log(actions[actionStr](item, code));
        break;
      case "Immovable":
        if (actionStr == "take") {
          console.log(item.commands.take);
        } else {
          console.log(actions[actionStr](item));
        }
        break;
      case "Container":
        if (actionStr == "open") {
          player.status.roomInventory.push(item.uncoverItem);
          console.log(actions[actionStr](item));
        }
        break;
      default:

    }
  }
}