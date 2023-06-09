const items = require('./items');

// ? Room Class ? //
function Room(name, description, roomInventory) {
    this.name = name;
    this.description = description;
    this.roomInventory = roomInventory;

    isItemInRoom = (itemStr, roomStr) => {
        return roomLookUp(roomStr).roomInventory.includes(itemStr)
    }

    let insertItem = (item) => {
        this.roomInventory.push(item);
    }
}

// ? All Rooms ? //
let outside = new Room(
    "outside",
    "It is cold, better get inside quick",
    [
        items.door,
        items.sign,
        items.keypad
    ]);

let darklounge = new Room(
    "dark room",
    "It is warm and dimly lit. You see some light is coming from a curtain.",
    [
        items.curtain
    ]);

let lounge = new Room(
    "living Room",
    "You swiftly open the curtain, the light illuminate the living room",
    ["curtain"]);
    
let roomStates = {
  outside: ['darklounge'],
  darklounge: ['lounge'],
  lounge: ['basement', 'upstair', 'kitchen'],
  basement: ["kitchen", "end"],
  upstair: ["bedroom"],
  kitchen: ["lounge"]
}

let roomLookUp = {
    outside,
    darklivingRoom,
    lounge,
    darklounge
}

let getRoomConnection = (currentRoom, newRoom) => {
  if (roomStates[currentRoom].includes(newRoom)) {
      return roomLookUp[newRoom];
  } else {
      console.log(`You cannot go ${currentRoom} to ${newRoom}`);
  }
}

let unlockPath = newPath => {
    
}

module.exports = {
    getRoomConnection,
    isItemInRoom,
    insertItem,
    unlockPath
};