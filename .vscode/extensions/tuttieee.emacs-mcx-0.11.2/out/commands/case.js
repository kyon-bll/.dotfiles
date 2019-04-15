"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
const vscode = require("vscode");
const _1 = require(".");
function hasNonEmptySelection(textEditor) {
    return textEditor.selections.some((selection) => !selection.isEmpty);
}
class TransformToUppercase extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "transformToUppercase";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasNonEmptySelection(textEditor)) {
                yield this.emacsController.runCommand("forwardWord");
            }
            yield vscode.commands.executeCommand("editor.action.transformToUppercase");
        });
    }
}
exports.TransformToUppercase = TransformToUppercase;
class TransformToLowercase extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "transformToLowercase";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!hasNonEmptySelection(textEditor)) {
                yield this.emacsController.runCommand("forwardWord");
            }
            yield vscode.commands.executeCommand("editor.action.transformToLowercase");
        });
    }
}
exports.TransformToLowercase = TransformToLowercase;
//# sourceMappingURL=case.js.map