const { items, containers } = require('./items');

function Room(name, roomInventory, entranceMessage, secondMessage) {
    this.name = name;
    this.roomInventory = roomInventory;
    this.entranceMessage = entranceMessage;
    this.secondMessage = secondMessage;
    this.hasEnter = false;

    // * gets items from room inventory * //
    this.getItem = (itemStr) => {
        return this.roomInventory.filter(item => item.name == itemStr)[0];
    }

    // * push item into room inventory * //
    this.insertItem = (item) => {
        this.roomInventory.push(...item);
    }

    // * called from the player object, returns a connecting room * //
    this.enterRoom = (newRoomStr) => {
        if (roomStates[this.name].includes(newRoomStr)) {
            if (!this.hasEnter) this.hasEnter = true;
            return roomLookUp[newRoomStr];
        } else {
            return false;
        }
    }

    // * add new paths in roomStates * //
    this.unlockPath = (newPath) => {
        roomStates[this.name].push(...newPath);
    }

    // * get a string of all items in the room to display when returning to a room * //
    this.listInventory = () => {
        if (this.roomInventory.length === 0) return;
        let string = "There is ";
        for (index in this.roomInventory) {
            if (index == this.roomInventory.length - 1) {
                string += `${this.roomInventory.length === 1 ? "" : "and "}a ${this.roomInventory[index].name}.`;
            } else {
                string += `a ${this.roomInventory[index].name}, `;
            }
        }
        return string;
    }
}

// ? All Rooms ? //
let outside = new Room(
    "outside",
    [
        items.frontDoor,
        items.sign,
        items.keypad
    ],
    "It is cold, better get inside quick.",
    "Yup, its colder than normal.");

let lounge = new Room(
    "lounge",
    [
        items.curtain
    ],
    "Art took a closer look, but was forced through the door. The door slamed shut behind him. It looks like somebody has not lived here for a long time. The room is pretty dark, he can barely see anything. There is a curtain with some light shining though, maybe he can open it.",
    "Art can enter kitchen or balcony from the lounge."
    );

let balcony = new Room(
    "balcony",
    [
        items.cat
    ],
    "As Art make his way to the top of the stairs, there is a skinny cat to the right and a bedroom to the left. 'MEEEEEOOOW', looks like the cat wants attention. As Art goes to pet it, it hissed. Art should leave it alone.",
    `There is the bedroom to the left.`
    );

let bedroom = new Room(
    "bedroom",
    [
        items.candle,
        items.bed,
        items.nightstand
    ],
    "When Art makes it to the bedroom. He gets a feeling, a feeling that... tonight is going to be a good night. There is a bed and nightstand with a candle on it. 'MEEEEEOOOW', must be the cat from the balcony.",
    "'MEEEEEOOOW', must be the cat from the balcony."
    );

let kitchen = new Room(
    "kitchen",
    [
        items.hotdog,
        items.catfood,
        items.skullDoor
    ],
    "Art sure is hungry, hope there is something to eat he thought. Even though this is an old house, he can still hope. Art looked through the cabinets, he found a hotdog and a can of catfood. There is also a locked 'door' with a skull on it. The only way out of here is back through the lounge.",
    "The lounge is the only way out from here."
);

let basement = new Room(
    "basement",
    [],
    "It's so dark down Art can barely see his hands in front of his. There has to be something Art can use to add light. There is some visible light from the kitchen.",
    "Art should find something to light up the dark basement. There is some visible light from the kitchen."
);

let roomStates = {
    outside: [],
    lounge: [],
    balcony: ["bedroom", "lounge"],
    bedroom: ["balcony"],
    kitchen: ["lounge"],
    basement: ["kitchen"]
}

let roomLookUp = {
    outside: outside,
    lounge: lounge,
    balcony: balcony,
    bedroom: bedroom,
    kitchen: kitchen,
    basement: basement
}



module.exports = { roomLookUp, roomStates };