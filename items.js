const { 
    Item,
    Food,
    Puzzle,
    Immovable,
    Container } = require('./item');

// ? Key Items ? //
let keyItems = {
    // ? Lounge ? //
    key: new Item(
        "key",
        "It's has a skull on it.",
        {
            take: "Don't know if this will come in handy.... I don't know dude.",
            drop: `Art is drawn to the key. Art whispers, "my precious". Art put the key back in his pocket.`
        }),
}


// ? Unlockables ? //
// * object of items that can be found * //
let unlockables = {
    // ? Lounge ? //
    painting: new Immovable(
        "painting",
        "Its a painting of clowns storming the beaches of Normandy.",
        {
            take: "It is stuck on the wall.",
        }),

    fireplace: new Immovable(
        "fireplace",
        "The logs are still smoking. Was somebody just here?",
        {
            take: "As strong as Art is, he is not that strong."
        }),
    
    dresser: new Container(
        "dresser",
        "Ikea, 2027 spring catalog, the Ifbœn9vnøgnk.",
        {
            take: "The drawer is huge, moving it can be dangerous. Art does not take risk.",
            open: this.isOpen ? "The drawer is already open" : "There is a key here."
        },
        { items: [ keyItems.key ] }),


    // ? Balcony ? //
    matches: new Item (
        "matches",
        "Use for burning things.",
        {
            take: "Art used to be a pyromanic, but do people ever change?"
        }),
    

    // ? Bedroom ? //
    cookie: new Food (
        "cookie",
        "An unwrapped blueberry cookie",
        {
            eat: "It was in fact a plain cookie. It was just moldy.",
            take: "I believe this is a blueberry cookie."
        }),
}


// ? Items ? //
let items = {
    // ? Outside ? //
    frontDoor: new Immovable(
        "door",
        "Art thought about it and realize he already examine the door.",
        {
            open: "It will not budge. Maybe there is a way to unlock it.",
            take: "It's a door, so no.",
            read: "28 3/4 is the address."
        }),

    sign: new Immovable(
        "sign",
        "It's a sign. It has words on it.",
        {
            read: "Use the address on the door to grant access.",
            take: "The sign is bolted to the door."
        }),

    keypad: new Puzzle(
        "keypad",
        "A standard keypad with numbers 0-9. Instructions use keypad ####.",
        {
            use: "Art heard a thump and the door creaked open.",
            take: "Its attached to the door."
        },
        "2834",
        {
            rooms: ["lounge"],
            message: "The door creaked open slowly. It look like there is a lounge Art can enter."
        }),


    // ? Lounge ? //
    curtain: new Container(
        "curtain",
        this.isOpen ? "It smells like mustard, Art is reminded of 5th grade." : "Art can see the dust build up on the curtains.",
        {
            open: this.isOpen ? "Its alright open." : "The light from the outside revealed the rest of the room. Art can now enter the kitchen and balcony. In the lounge, there is a painting, a dresser, and a fireplace."
        },
        {
            rooms: [ "kitchen", "balcony" ],
            items: [ unlockables.dresser, unlockables.painting, unlockables.fireplace ]
        }),
        

    // ? balcony ? //
    cat: new Container(
        "cat",
        this.isOpen ? "The cat is purring." : "Orange and white tabby cat, it is trying to eat a shoe.",
        {
            open: "The cat got up and walked over to the cat of catfood and eats it. There are matches where the cat once stood.",
            take: "Art gets close, but the cat booped him on the nose. Art's only weakness. He dead. would Art like to play again?",
            eat: "Art prefer eatting dogs, hot ones."
        },
        { items: [ unlockables.matches ]}),


    // ? Kitchen ? //
    hotdog: new Food (
        "hotdog",
        "A hotdog in a toasted bun topped with fried onions, raw onions, relish, mustard, and remoulade.",
        {
            take: "Art carefully placed the hotdog into this pocket.",
            eat: "Yum, it was still hot.",
        }),

    catfood: new Item (
        "catfood",
        "A can of catfood. Art is tempted, but his catfood eating days are in the past.",
        {
            take: "Maybe this will be useful.",
        }),

    skullDoor: new Puzzle(
        "door",
        "There is a locked door with a skull on it.",
        {
            open: "It will not budge. Looks like there is a keyhole.",
            take: "It's a door... NOOO!",
        },
        keyItems.key,
        {
            rooms: ["basement"],
            message: "The down swings open. There are stairs leading down to the basement."
        }),


    // ? Bedroom ? //
    nightstand: new Immovable (
        "nightstand",
        "A simple nightstand with lasers shooting from its legs.",
        {
            open: "The drawer is empty.",
        }),

    candle: new Item (
        "candle",
        "A lemon garlic chicken scented candle... Ugh.",
        {
            take: "This is going to be lit.",
        }),

    bed: new Container (
        "bed",
        "The bed has been made.",
        {
            take: "Art tries to fit in his pocket, but under estimated it size.",
            open: "Art lifted the matress and found a cookie."
        },
        { items: [ unlockables.cookie ]}),

}

module.exports = { keyItems, unlockables, items };