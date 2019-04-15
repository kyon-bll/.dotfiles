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
const vscode_1 = require("vscode");
const _1 = require(".");
class DeleteBlankLines extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "deleteBlankLines";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const document = textEditor.document;
            // tslint:disable-next-line:prefer-for-of
            for (let iSel = 0; iSel < textEditor.selections.length; ++iSel) {
                // `selection[iSel]` is mutated during the loop,
                // therefore, each selection must be obtained
                // by indexing on each iteration.
                // That's why for-of loop is not appropriate here.
                const selection = textEditor.selections[iSel];
                const curLineNum = selection.active.line;
                const curLine = document.lineAt(curLineNum);
                const subsequentText = curLine.text.substr(selection.active.character);
                const cursorIsAtTheEndOfLine = subsequentText.search(/\S/) === -1;
                if (!cursorIsAtTheEndOfLine) {
                    break;
                }
                // Search for the following empty lines and get the final line number
                let followingLineOffset = 0;
                while (curLineNum + followingLineOffset + 1 < document.lineCount &&
                    document.lineAt(curLineNum + followingLineOffset + 1).isEmptyOrWhitespace) {
                    followingLineOffset++;
                }
                // Search for the previous empty lines and get the first line number
                let previousLineOffset = 0;
                while (curLineNum - previousLineOffset - 1 >= 0 &&
                    document.lineAt(curLineNum - previousLineOffset - 1).isEmptyOrWhitespace) {
                    previousLineOffset++;
                }
                yield textEditor.edit((editBuilder) => {
                    if (followingLineOffset > 0) {
                        // Following empty lines exist
                        const finalFollowingEmptyLineNum = curLineNum + followingLineOffset;
                        editBuilder.delete(new vscode_1.Range(new vscode_1.Position(curLineNum + 1, 0), document.lineAt(finalFollowingEmptyLineNum).rangeIncludingLineBreak.end));
                    }
                    if (previousLineOffset > 0) {
                        // Previous empty lines exist
                        const firstPreviousEmptyLineNum = curLineNum - previousLineOffset;
                        editBuilder.delete(new vscode_1.Range(new vscode_1.Position(firstPreviousEmptyLineNum, 0), document.lineAt(curLineNum - 1).rangeIncludingLineBreak.end));
                    }
                });
            }
        });
    }
}
exports.DeleteBlankLines = DeleteBlankLines;
//# sourceMappingURL=delete-blank-lines.js.map