// * player object * //
let player = {
    inventory: [],
    currentRoom: null,

    // * takes in a string and calls a method(enterRoom) on the current room, which returns a room object and set it to currentRoom * //
    // * then returns a string * //
    enter(newRoomStr) {
        let newRoom = this.currentRoom.enterRoom(newRoomStr);
        if (newRoom) {
            this.currentRoom = this.currentRoom.enterRoom(newRoomStr);
            return this.currentRoom.hasEnter
                ? `${this.currentRoom.secondMessage} ${this.currentRoom.listInventory()}`
                : this.currentRoom.entranceMessage;
        }
        return `Art cannot go from ${this.currentRoom.name} to ${newRoomStr}`;
    },

    // * returns an item from player's invenotry * //
    getInventoryItem(itemStr) {
        return this.inventory.filter(item => item.name == itemStr)[0];
    }
}

module.exports = { player };