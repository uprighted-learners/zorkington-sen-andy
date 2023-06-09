class Item {
    constructor(name, description, commands) {
        this.name = name;
        this.description = description;
        this.commands = commands;
    }
}

class Puzzle extends Item {
    constructor(name, description, commands, secret, unlockDoor) {
        super(name, description, commands)
        this.secret = secret;
        this.unlockDoor = unlockDoor;
    }

    checkCode(code) {
        return this.secret == code;
    }
}

class Immovable extends Item {
    constructor(name, description, commands) {
        super(name, description, commands);
    }    
}

class Container extends Item {
    constructor(name, description, commands, uncoverItem) {
        super(name, description, commands, uncoverItem);
        this.uncoverItem = uncoverItem;
    }
}

class Dropable extends Item {
    constructor(name, description, commands) {
        super(name, description, commands)
    }
}

module.exports = {
    Item,
    Puzzle,
    Immovable,
    Container,
    Dropable
};