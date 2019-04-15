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
const paredit = require("paredit.js");
const vscode_1 = require("vscode");
const _1 = require(".");
// Languages in which semicolon represents comment
const languagesSemicolonComment = new Set(["clojure", "lisp", "scheme"]);
class PareditNavigatorCommand extends _1.EmacsCommand {
    execute(textEditor, isInMarkMode, prefixArgument) {
        return __awaiter(this, void 0, void 0, function* () {
            const preserveSelect = isInMarkMode;
            const doc = textEditor.document;
            const repeat = prefixArgument === undefined ? 1 : prefixArgument;
            if (repeat <= 0) {
                return;
            }
            let src = doc.getText();
            if (!languagesSemicolonComment.has(doc.languageId)) {
                // paredit.js treats semicolon as comment in a manner of lisp and this behavior is not configurable
                // (a literal ";" is hard coded in paredit.js).
                // However, in other languages, semicolon should be treated as one entity, but not comment for convenience.
                // To do so, ";" is replaced with another character which is not treated as comment by paredit.js
                // if the document is not lisp or lisp-like languages.
                src = src.split(";").join("_"); // split + join = replaceAll
            }
            const ast = paredit.parse(src);
            for (let i = 0; i < repeat; ++i) {
                const newSelections = textEditor.selections.map((selection) => {
                    const idx = doc.offsetAt(selection.active);
                    const newIdx = this.pareditNavigatorFn(ast, idx);
                    const newActivePosition = doc.positionAt(newIdx);
                    return new vscode_1.Selection(preserveSelect ? selection.anchor : newActivePosition, newActivePosition);
                });
                textEditor.selections = newSelections;
            }
            textEditor.revealRange(textEditor.selection, vscode_1.TextEditorRevealType.InCenterIfOutsideViewport);
        });
    }
}
class ForwardSexp extends PareditNavigatorCommand {
    constructor() {
        super(...arguments);
        this.id = "paredit.forwardSexp";
        this.pareditNavigatorFn = paredit.navigator.forwardSexp;
    }
}
exports.ForwardSexp = ForwardSexp;
class BackwardSexp extends PareditNavigatorCommand {
    constructor() {
        super(...arguments);
        this.id = "paredit.backwardSexp";
        this.pareditNavigatorFn = paredit.navigator.backwardSexp;
    }
}
exports.BackwardSexp = BackwardSexp;
class ForwardDownSexp extends PareditNavigatorCommand {
    constructor() {
        super(...arguments);
        this.id = "paredit.forwardDownSexp";
        this.pareditNavigatorFn = paredit.navigator.forwardDownSexp;
    }
}
exports.ForwardDownSexp = ForwardDownSexp;
class BackwardUpSexp extends PareditNavigatorCommand {
    constructor() {
        super(...arguments);
        this.id = "paredit.backwardUpSexp";
        this.pareditNavigatorFn = paredit.navigator.backwardUpSexp;
    }
}
exports.BackwardUpSexp = BackwardUpSexp;
//# sourceMappingURL=paredit.js.map