"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const editorIdentity_1 = require("./editorIdentity");
const emulator_1 = require("./emulator");
class EmacsEmulatorMap {
    constructor(killRing) {
        this.emacsEmulatorMap = new Map();
        this.killRing = killRing;
    }
    getOrCreate(textEditor) {
        const id = new editorIdentity_1.EditorIdentity(textEditor);
        const key = id.toString();
        const existentEmulator = this.emacsEmulatorMap.get(key);
        if (existentEmulator) {
            existentEmulator.setTextEditor(textEditor);
            return [existentEmulator, false];
        }
        const newEmulator = new emulator_1.EmacsEmulator(textEditor, this.killRing);
        this.emacsEmulatorMap.set(key, newEmulator);
        return [newEmulator, true];
    }
    get(key) {
        return this.emacsEmulatorMap.get(key);
    }
    getKeys() {
        return this.emacsEmulatorMap.keys();
    }
    delete(key) {
        return this.emacsEmulatorMap.delete(key);
    }
    dispose() {
        delete this.emacsEmulatorMap;
    }
}
exports.EmacsEmulatorMap = EmacsEmulatorMap;
//# sourceMappingURL=emulator-map.js.map