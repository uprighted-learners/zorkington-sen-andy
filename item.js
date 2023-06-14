class Item {
    constructor(name, description, commands) {
        this.name = name;
        this.description = description;
        this.commands = commands;
    }
    // ? Default Action Behavior ? //
    examine() {
        return this.description;
    }

    read() {
        return this.commands.read ? this.commands.read : `Art can't read the ${this.name}.`;
    }

    open() {
        return this.commands.open ? this.commands.open : `Art can't open the ${this.name}.`;
    }

    // * push this item to player inventory * //
    take(player) {
        if (!player.inventory.includes(this)) {
            player.inventory.push(this);
            let index = player.currentRoom.roomInventory.indexOf(this);
            player.currentRoom.roomInventory.splice(index, 1);
            return this.commands.take ? this.commands.take : `Art placed ${this.name} in his pocket.`;
        }
        return `Art took the ${this.name} out of his pockets and placed it back in.`
    }

    // * remove an item from player's inventory and insertItem to the currentRoom's inventory * //
    drop(player) {
        // * Special: check if the catfood and cat are in same room. true, remove catfood from player inventory. * //
        if (this.name === "catfood"
        && player.currentRoom.roomInventory.some(item => item.name == "cat")) {
            let index = player.inventory.indexOf(this);
            player.inventory.splice(index, 1);
            return this.commands.drop;
        }

        let index = player.inventory.indexOf(this);
        let dropItem = player.inventory.splice(index, 1);
        if (dropItem.length !== 0) {
            player.currentRoom.insertItem(dropItem);
            return this.commands.drop ? this.commands.drop : `Art yeeted the ${this.name}.`;
        }
        return `Art don't have a ${this.name} to yeet.`;
    }


    use() {
        return this.commands.use ? this.commands.use : `Art can't use the ${this.name}.`;
    }

    eat() {
        return this.commands.eat ? this.commands.eat : `Art can't eat the ${this.name}.`;
    }
}

class Food extends Item {
    constructor(name, description, commands) {
        super(name, description, commands);
    }

    eat(player) {
        if (player.inventory.includes(this)) {
            let index = player.inventory.indexOf(this);
            player.inventory.splice(index, 1);
        }
        if (player.currentRoom.roomInventory.includes(this)) {
            let index = player.currentRoom.roomInventory.indexOf(this);
            player.currentRoom.roomInventory.splice(index, 1);
        }
        return this.commands.eat ? this.commands.eat : `Art can't eat the ${this.name}.`;
    }
}

class Immovable extends Item {
    constructor(name, description, commands) {
        super(name, description, commands);
    }

    // * change default take method * //
    take() {
        return this.commands.take ? this.commands.take : `${this.name} can not be taken, what would Laim Neeson think?`;
    }
}

class Container extends Immovable {
    constructor(name, description, commands, uncovers) {
        super(name, description, commands);
        this.uncovers = uncovers;
        this.isOpen = false;
    }

    // * sets isOpen to true, see if there are any items or rooms are unlocked * //
    open(currentRoom) {
        let message = this.commands.open;
        if (!this.isOpen) {
            this.isOpen = true;
            if (this.uncovers.rooms && this.uncovers.rooms.length !== 0) {
                currentRoom.unlockPath(this.uncovers.rooms);
            }
            if (this.uncovers.items && this.uncovers.items.length !== 0) {
                currentRoom.insertItem(this.uncovers.items);
            }
            return message; 
        } else {
            return `The ${this.name} is already open`;
        }
    }
}

class Puzzle extends Immovable {
    constructor(name, description, commands, secret, unlocks) {
        super(name, description, commands)
        this.secret = secret;
        this.unlocks = unlocks;
    }

    // * will check if the secret and code are the same. Removes door from room and unlock paths * //
    use(player, code) {
        if (this.secret == code) {
            // * removes lock door from game * //
            let index = player.currentRoom.roomInventory.indexOf(this);
            player.currentRoom.roomInventory.splice(index, 1);

            // * complete puzzle will unlock new room * //
            player.currentRoom.unlockPath(this.unlocks.rooms);

            return `${this.unlocks.message}`;
        } else {
            return "Nothing happened, something is not right."
        }
    }
}

// * available actions * //
let itemActions = {
    examine: "examine",
    read: "read",
    open: "open",
    take: "take",
    drop: "drop",
    use: "use",
    eat: "eat",
    enter: "enter"
}

module.exports = {
    Item,
    Food,
    Puzzle,
    Immovable,
    Container,
    itemActions
};