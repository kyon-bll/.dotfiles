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
const vscode_1 = require("vscode");
const _1 = require(".");
const kill_yank_1 = require("../kill-yank");
class KillYankCommand extends _1.EmacsCommand {
    constructor(afterExecute, emacsController, killYanker) {
        super(afterExecute, emacsController);
        this.killYanker = killYanker;
    }
}
function findNextKillWordRange(doc, position, repeat = 1) {
    const doclen = doc.getText().length;
    let idx = doc.offsetAt(position) + 1;
    let foundWords = 0;
    const killRanges = [];
    while (idx <= doclen && foundWords < repeat) {
        const wordRange = doc.getWordRangeAtPosition(doc.positionAt(idx));
        if (wordRange !== undefined) {
            killRanges.push(wordRange);
            foundWords++;
            idx = doc.offsetAt(wordRange.end);
        }
        idx++;
    }
    // If there are spaces (or some non-word characters)
    // between the current position and the end of the document,
    // it should be killed too.
    if (foundWords < repeat) {
        killRanges.push(new vscode_1.Range(doc.positionAt(idx), doc.positionAt(doclen)));
    }
    if (killRanges.length === 0) {
        return undefined;
    }
    return new vscode_1.Range(killRanges[0].start, killRanges[killRanges.length - 1].end);
}
class KillWord extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "killWord";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const repeat = prefixArgument === undefined ? 1 : prefixArgument;
            if (repeat <= 0) {
                return;
            }
            const nextWordRanges = textEditor.selections.map((selection) => findNextKillWordRange(textEditor.document, selection.active, repeat));
            const killRanges = nextWordRanges.map((nextWordRange, i) => {
                if (nextWordRange === undefined) {
                    return undefined;
                }
                return new vscode_1.Range(textEditor.selections[i].active, nextWordRange.end);
            }).filter((range) => range !== undefined);
            yield this.killYanker.kill(killRanges);
        });
    }
}
exports.KillWord = KillWord;
function findPreviousKillWordRange(doc, position, repeat = 1) {
    // const doclen = doc.getText().length;
    let idx = doc.offsetAt(position) - 1;
    let foundWords = 0;
    const killRanges = [];
    while (0 <= idx && foundWords < repeat) {
        const wordRange = doc.getWordRangeAtPosition(doc.positionAt(idx));
        if (wordRange !== undefined) {
            killRanges.push(wordRange);
            foundWords++;
            idx = doc.offsetAt(wordRange.start);
        }
        idx--;
    }
    // If there are spaces (or some non-word characters)
    // between the current position and the beginning of the document,
    // it should be killed too.
    if (foundWords < repeat) {
        killRanges.push(new vscode_1.Range(new vscode_1.Position(0, 0), doc.positionAt(idx)));
    }
    if (killRanges.length === 0) {
        return undefined;
    }
    return new vscode_1.Range(killRanges[killRanges.length - 1].start, killRanges[0].end);
}
class BackwardKillWord extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "backwardKillWord";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const repeat = prefixArgument === undefined ? 1 : prefixArgument;
            if (repeat <= 0) {
                return;
            }
            const previousWordRanges = textEditor.selections.map((selection) => findPreviousKillWordRange(textEditor.document, selection.active, repeat));
            const killRanges = previousWordRanges.map((previousWordRange, i) => {
                if (previousWordRange === undefined) {
                    return undefined;
                }
                return new vscode_1.Range(previousWordRange.start, textEditor.selections[i].active);
            }).filter((range) => range !== undefined);
            yield this.killYanker.kill(killRanges, kill_yank_1.AppendDirection.Backward);
        });
    }
}
exports.BackwardKillWord = BackwardKillWord;
class KillLine extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "killLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const ranges = textEditor.selections.map((selection) => {
            const cursor = selection.anchor;
            const lineAtCursor = textEditor.document.lineAt(cursor.line);
            if (prefixArgument !== undefined) {
                return new vscode_1.Range(cursor, new vscode_1.Position(cursor.line + prefixArgument, 0));
            }
            const lineEnd = lineAtCursor.range.end;
            if (cursor.isEqual(lineEnd)) {
                // From the end of the line to the beginning of the next line
                return new vscode_1.Range(cursor, new vscode_1.Position(cursor.line + 1, 0));
            }
            else {
                // From the current cursor to the end of line
                return new vscode_1.Range(cursor, lineEnd);
            }
        });
        this.emacsController.exitMarkMode();
        return this.killYanker.kill(ranges);
    }
}
exports.KillLine = KillLine;
class KillWholeLine extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "killWholeLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const ranges = textEditor.selections.map((selection) => 
        // From the beginning of the line to the beginning of the next line
        new vscode_1.Range(new vscode_1.Position(selection.anchor.line, 0), new vscode_1.Position(selection.anchor.line + 1, 0)));
        this.emacsController.exitMarkMode();
        return this.killYanker.kill(ranges);
    }
}
exports.KillWholeLine = KillWholeLine;
function getNonEmptySelections(textEditor) {
    return textEditor.selections.filter((selection) => !selection.isEmpty);
}
function makeSelectionsEmpty(textEditor) {
    textEditor.selections = textEditor.selections.map((selection) => new vscode_1.Selection(selection.active, selection.active));
}
class KillRegion extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "killRegion";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const ranges = getNonEmptySelections(textEditor);
            yield this.killYanker.kill(ranges);
            this.emacsController.exitMarkMode();
            this.killYanker.cancelKillAppend();
        });
    }
}
exports.KillRegion = KillRegion;
// TODO: Rename to kill-ring-save (original emacs command name)
class CopyRegion extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "copyRegion";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const ranges = getNonEmptySelections(textEditor);
            yield this.killYanker.copy(ranges);
            this.emacsController.exitMarkMode();
            this.killYanker.cancelKillAppend();
            makeSelectionsEmpty(textEditor);
        });
    }
}
exports.CopyRegion = CopyRegion;
class Yank extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "yank";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.killYanker.yank();
            this.emacsController.exitMarkMode();
        });
    }
}
exports.Yank = Yank;
class YankPop extends KillYankCommand {
    constructor() {
        super(...arguments);
        this.id = "yankPop";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.killYanker.yankPop();
            this.emacsController.exitMarkMode();
        });
    }
}
exports.YankPop = YankPop;
//# sourceMappingURL=kill.js.map