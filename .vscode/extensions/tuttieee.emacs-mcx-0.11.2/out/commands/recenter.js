"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable:max-classes-per-file
// tslint:disable:object-literal-sort-keys
const vscode = require("vscode");
const vscode_1 = require("vscode");
const _1 = require(".");
var RecenterPosition;
(function (RecenterPosition) {
    RecenterPosition[RecenterPosition["Middle"] = 0] = "Middle";
    RecenterPosition[RecenterPosition["Top"] = 1] = "Top";
    RecenterPosition[RecenterPosition["Bottom"] = 2] = "Bottom";
})(RecenterPosition || (RecenterPosition = {}));
class RecenterTopBottom extends _1.EmacsCommand {
    constructor() {
        super(...arguments);
        this.id = "recenterTopBottom";
        this.recenterPosition = RecenterPosition.Middle;
    }
    execute(textEditor, isInMarkMode, prefixArgument) {
        switch (this.recenterPosition) {
            case RecenterPosition.Middle:
                textEditor.revealRange(textEditor.selection, vscode_1.TextEditorRevealType.InCenter);
                this.recenterPosition = RecenterPosition.Top;
                break;
            case RecenterPosition.Top:
                textEditor.revealRange(textEditor.selection, vscode_1.TextEditorRevealType.AtTop);
                this.recenterPosition = RecenterPosition.Bottom;
                break;
            case RecenterPosition.Bottom:
                // TextEditor.revealRange does not supprt to set the cursor at the bottom of window.
                // Therefore, the number of lines to scroll is calculated here.
                const current = textEditor.selection.active.line;
                const visibleTop = textEditor.visibleRanges[0].start.line;
                const visibleBottom = textEditor.visibleRanges[0].end.line;
                const visibleHeight = visibleBottom - visibleTop;
                const nextVisibleTop = Math.max(current - visibleHeight, 1);
                // Scroll so that `nextVisibleTop` is the top of window
                const p = new vscode.Position(nextVisibleTop, 0);
                const r = new vscode.Range(p, p);
                textEditor.revealRange(r);
                this.recenterPosition = RecenterPosition.Middle;
                break;
        }
    }
    onDidInterruptTextEditor() {
        this.recenterPosition = RecenterPosition.Middle;
    }
}
exports.RecenterTopBottom = RecenterTopBottom;
//# sourceMappingURL=recenter.js.map