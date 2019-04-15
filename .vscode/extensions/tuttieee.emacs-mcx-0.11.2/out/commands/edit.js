"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
const vscode = require("vscode");
const vscode_1 = require("vscode");
const _1 = require(".");
class DeleteBackwardChar extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "deleteBackwardChar";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand("deleteLeft"));
    }
}
exports.DeleteBackwardChar = DeleteBackwardChar;
class DeleteForwardChar extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "deleteForwardChar";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand("deleteRight"));
    }
}
exports.DeleteForwardChar = DeleteForwardChar;
class NewLine extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "newLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        this.emacsController.exitMarkMode();
        textEditor.selections = textEditor.selections.map((selection) => new vscode_1.Selection(selection.active, selection.active));
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand("default:type", { text: "\n" }));
    }
}
exports.NewLine = NewLine;
//# sourceMappingURL=edit.js.map