const { 
    Item,
    Puzzle,
    Immovable,
    Container,
    Dropable } = require('./item');

module.exports = {
    frontDoor: new Immovable(
        "front door",
        "Door is locked",
        {
            "open": "It will not budge.",
            "take": "It's a door, so no.",
            "read": "28 3/4 is the address"
        }),

    sign: new Immovable(
        "sign",
        "It's a sign.",
        {
            "read": "Enter the address on the door to grant access.",
            "take": "The sign is bolted to the door"
        }),

    keypad: new Puzzle(
        "keypad",
        "It's a standard keypad with numbers 0-9.",
        {
            "enter": "Art heard a thump and the door creaked open"
        }),

    drawer: new Immovable(
        "sign",
        "It's a sign.",
        {
            "read": "Enter the address on the door to grant access.",
            "take": "The sign is bolted to the door"
        }),

    key: new Item(
        "key",
        "It's has a skull on it.",
        {
            "take": "Don't know if this will come in handy, I don't know dude."
        }),

    curtain: new Container(
        "curtain",
        "It is dusty, somebody have not lived here in year.",
        {
            "open": "The light illuminate the rest of the room,"
        },
        key),

    openCurtain: new Container(
        "curtain",
        "It smells like mustard, Art is reminded of 5th grade.",
        {
            "open": "Its alright Open"
        })
}