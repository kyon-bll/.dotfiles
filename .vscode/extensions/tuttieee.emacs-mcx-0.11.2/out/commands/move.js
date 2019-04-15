"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
const vscode = require("vscode");
const _1 = require(".");
// TODO: be unnecessary
exports.moveCommandIds = [
    "forwardChar", "backwardChar", "nextLine", "previousLine",
    "moveBeginningOfLine", "moveEndOfLine", "forwardWord", "backwardWord",
    "beginningOfBuffer", "endOfBuffer", "scrollUpCommand", "scrollDownCommand",
];
class ForwardChar extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "forwardChar";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        if (prefixArgument === undefined || prefixArgument === 1) {
            return vscode.commands.executeCommand(isInMarkMode ? "cursorRightSelect" : "cursorRight");
        }
        else if (prefixArgument > 0) {
            const doc = textEditor.document;
            const newSelections = textEditor.selections.map((selection) => {
                const offset = doc.offsetAt(selection.active);
                const newActivePos = doc.positionAt(offset + prefixArgument);
                const newAnchorPos = isInMarkMode ? selection.anchor : newActivePos;
                return new vscode.Selection(newAnchorPos, newActivePos);
            });
            textEditor.selections = newSelections;
        }
    }
}
exports.ForwardChar = ForwardChar;
class BackwardChar extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "backwardChar";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        if (prefixArgument === undefined || prefixArgument === 1) {
            return vscode.commands.executeCommand(isInMarkMode ? "cursorLeftSelect" : "cursorLeft");
        }
        else if (prefixArgument > 0) {
            const doc = textEditor.document;
            const newSelections = textEditor.selections.map((selection) => {
                const offset = doc.offsetAt(selection.active);
                const newActivePos = doc.positionAt(offset - prefixArgument);
                const newAnchorPos = isInMarkMode ? selection.anchor : newActivePos;
                return new vscode.Selection(newAnchorPos, newActivePos);
            });
            textEditor.selections = newSelections;
        }
    }
}
exports.BackwardChar = BackwardChar;
class NextLine extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "nextLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const value = prefixArgument === undefined ? 1 : prefixArgument;
        return vscode.commands.executeCommand("cursorMove", {
            to: "down",
            by: "wrappedLine",
            value,
            select: isInMarkMode,
        });
    }
}
exports.NextLine = NextLine;
class PreviousLine extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "previousLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const value = prefixArgument === undefined ? 1 : prefixArgument;
        return vscode.commands.executeCommand("cursorMove", {
            to: "up",
            by: "wrappedLine",
            value,
            select: isInMarkMode,
        });
    }
}
exports.PreviousLine = PreviousLine;
class MoveBeginningOfLine extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "moveBeginningOfLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        if (prefixArgument === undefined || prefixArgument === 1) {
            return vscode.commands.executeCommand(isInMarkMode ? "cursorHomeSelect" : "cursorHome");
        }
        else if (prefixArgument > 1) {
            return vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: prefixArgument - 1,
                isInMarkMode,
            }).then(() => vscode.commands.executeCommand(isInMarkMode ? "cursorHomeSelect" : "cursorHome"));
        }
    }
}
exports.MoveBeginningOfLine = MoveBeginningOfLine;
class MoveEndOfLine extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "moveEndOfLine";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        if (prefixArgument === undefined || prefixArgument === 1) {
            return vscode.commands.executeCommand(isInMarkMode ? "cursorEndSelect" : "cursorEnd");
        }
        else if (prefixArgument > 1) {
            return vscode.commands.executeCommand("cursorMove", {
                to: "down",
                by: "line",
                value: prefixArgument - 1,
                isInMarkMode,
            }).then(() => vscode.commands.executeCommand(isInMarkMode ? "cursorEndSelect" : "cursorEnd"));
        }
    }
}
exports.MoveEndOfLine = MoveEndOfLine;
class ForwardWord extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "forwardWord";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorWordRightSelect" : "cursorWordRight"));
    }
}
exports.ForwardWord = ForwardWord;
class BackwardWord extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "backwardWord";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorWordLeftSelect" : "cursorWordLeft"));
    }
}
exports.BackwardWord = BackwardWord;
class BeginningOfBuffer extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "beginningOfBuffer";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorTopSelect" : "cursorTop"));
    }
}
exports.BeginningOfBuffer = BeginningOfBuffer;
class EndOfBuffer extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "endOfBuffer";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorBottomSelect" : "cursorBottom"));
    }
}
exports.EndOfBuffer = EndOfBuffer;
class ScrollUpCommand extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "scrollUpCommand";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorPageDownSelect" : "cursorPageDown"));
    }
}
exports.ScrollUpCommand = ScrollUpCommand;
class ScrollDownCommand extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "scrollDownCommand";
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        const repeat = prefixArgument === undefined ? 1 : prefixArgument;
        return _1.createParallel(repeat, () => vscode.commands.executeCommand(isInMarkMode ? "cursorPageUpSelect" : "cursorPageUp"));
    }
}
exports.ScrollDownCommand = ScrollDownCommand;
//# sourceMappingURL=move.js.map