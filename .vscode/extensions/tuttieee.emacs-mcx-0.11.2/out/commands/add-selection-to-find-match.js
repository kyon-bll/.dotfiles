"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
const vscode = require("vscode");
const _1 = require(".");
class AddSelectionToNextFindMatch extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "addSelectionToNextFindMatch";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        this.emacsController.enterMarkMode();
        return vscode.commands.executeCommand("editor.action.addSelectionToNextFindMatch");
    }
}
exports.AddSelectionToNextFindMatch = AddSelectionToNextFindMatch;
class AddSelectionToPreviousFindMatch extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "addSelectionToPreviousFindMatch";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        this.emacsController.enterMarkMode();
        return vscode.commands.executeCommand("editor.action.addSelectionToPreviousFindMatch");
    }
}
exports.AddSelectionToPreviousFindMatch = AddSelectionToPreviousFindMatch;
//# sourceMappingURL=add-selection-to-find-match.js.map