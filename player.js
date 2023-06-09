const { roomLookUp, getRoomConnection } = require('./room');

let player = {
  inventory: [],
  status: roomLookUp['outside'],

  examine(item) {
    return item.description;
  },

  read(item) {
    return item.commands["read"];
  },

  open(message) {

  },

  take(item) {
    if ()
  },

  enter(item, inputCode) {
    if (item.checkCode(inputCode)) {

    }
  },

  walk(newRoomStr) {
    let newRoom = getRoomConnection(this.status, newRoomStr)
    if ()
    {
      this.status = newRoomStr;
    }
  }
}

let actions = {
  take: player.take,
  examine: player.examine,
  open: player.open,
  read: player.read,
  enter: player.enter,
  drop: player.drop,
  walk: player.walk
}

module.exports = { player, actions };