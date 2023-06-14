let player = {
    inventory: [],
    currentRoom: null,

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

    getInventoryItem(itemStr) {
        return this.inventory.filter(item => item.name == itemStr)[0];
    }
}

module.exports = { player };