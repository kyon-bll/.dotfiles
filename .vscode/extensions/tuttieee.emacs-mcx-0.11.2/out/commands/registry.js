"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EmacsCommandRegistry {
    constructor() {
        this.commands = new Map();
    }
    register(command) {
        this.commands.set(command.id, command);
    }
    get(commandName) {
        return this.commands.get(commandName);
    }
    forEach(callbackfn, thisArg) {
        this.commands.forEach(callbackfn, thisArg);
    }
}
exports.EmacsCommandRegistry = EmacsCommandRegistry;
//# sourceMappingURL=registry.js.map