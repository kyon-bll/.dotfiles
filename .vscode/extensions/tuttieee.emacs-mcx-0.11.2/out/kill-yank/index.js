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
const clipboardy = require("clipboardy");
const vscode = require("vscode");
const editorIdentity_1 = require("../editorIdentity");
const message_1 = require("../message");
const utils_1 = require("../utils");
const clipboard_text_1 = require("./kill-ring-entity/clipboard-text");
const editor_text_1 = require("./kill-ring-entity/editor-text");
var AppendDirection;
(function (AppendDirection) {
    AppendDirection[AppendDirection["Forward"] = 0] = "Forward";
    AppendDirection[AppendDirection["Backward"] = 1] = "Backward";
})(AppendDirection = exports.AppendDirection || (exports.AppendDirection = {}));
class KillYanker {
    constructor(textEditor, killRing) {
        this.isAppending = false;
        this.docChangedAfterYank = false;
        this.textEditor = textEditor;
        this.killRing = killRing;
        this.docChangedAfterYank = false;
        this.prevKillPositions = [];
        this.prevYankPositions = [];
        this.onDidChangeTextDocument = this.onDidChangeTextDocument.bind(this);
        vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument);
        this.onDidChangeTextEditorSelection = this.onDidChangeTextEditorSelection.bind(this);
        vscode.window.onDidChangeTextEditorSelection(this.onDidChangeTextEditorSelection);
    }
    setTextEditor(textEditor) {
        this.textEditor = textEditor;
    }
    getTextEditor() {
        return this.textEditor;
    }
    onDidChangeTextDocument(e) {
        // XXX: Is this a correct way to check the identity of document?
        if (e.document.uri.toString() === this.textEditor.document.uri.toString()) {
            this.docChangedAfterYank = true;
            this.isAppending = false;
        }
    }
    onDidChangeTextEditorSelection(e) {
        if (new editorIdentity_1.EditorIdentity(e.textEditor).isEqual(new editorIdentity_1.EditorIdentity(this.textEditor))) {
            this.docChangedAfterYank = true;
            this.isAppending = false;
        }
    }
    kill(ranges, appendDirection = AppendDirection.Forward) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!utils_1.equalPositons(this.getCursorPositions(), this.prevKillPositions)) {
                this.isAppending = false;
            }
            this.copy(ranges, this.isAppending, appendDirection);
            yield this.delete(ranges);
            this.isAppending = true;
            this.prevKillPositions = this.getCursorPositions();
        });
    }
    copy(ranges, shouldAppend = false, appendDirection = AppendDirection.Forward) {
        const newKillEntity = new editor_text_1.EditorTextKillRingEntity(ranges.map((range) => ({
            range,
            text: this.textEditor.document.getText(range),
        })));
        if (this.killRing !== null) {
            const currentKill = this.killRing.getTop();
            if (shouldAppend && currentKill instanceof editor_text_1.EditorTextKillRingEntity) {
                currentKill.append(newKillEntity, appendDirection);
                clipboardy.writeSync(currentKill.asString());
            }
            else {
                this.killRing.push(newKillEntity);
                clipboardy.writeSync(newKillEntity.asString());
            }
        }
        else {
            clipboardy.writeSync(newKillEntity.asString());
        }
    }
    cancelKillAppend() {
        this.isAppending = false;
    }
    yank() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.killRing === null) {
                return vscode.commands.executeCommand("editor.action.clipboardPasteAction");
            }
            const clipboardText = clipboardy.readSync();
            const killRingEntity = this.killRing.getTop();
            let pasteText;
            if (killRingEntity === null || !killRingEntity.isSameClipboardText(clipboardText)) {
                this.killRing.push(new clipboard_text_1.ClipboardTextKillRingEntity(clipboardText));
                pasteText = clipboardText;
            }
            else {
                pasteText = killRingEntity.asString();
            }
            yield vscode.commands.executeCommand("paste", { text: pasteText });
            this.docChangedAfterYank = false;
            this.prevYankPositions = this.textEditor.selections.map((selection) => selection.active);
        });
    }
    yankPop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.killRing === null) {
                return;
            }
            if (this.isYankInterupted()) {
                message_1.MessageManager.showMessage("Previous command was not a yank");
                return;
            }
            const prevKillRingEntity = this.killRing.getTop();
            const killRingEntity = this.killRing.pop();
            if (killRingEntity === null) {
                return;
            }
            const text = killRingEntity.asString();
            if (prevKillRingEntity !== null && !prevKillRingEntity.isEmpty()) {
                yield vscode.commands.executeCommand("undo");
            }
            yield vscode.commands.executeCommand("paste", { text });
            this.docChangedAfterYank = false;
            this.prevYankPositions = this.textEditor.selections.map((selection) => selection.active);
        });
    }
    delete(ranges, maxTrials = 3) {
        return __awaiter(this, void 0, void 0, function* () {
            let success = false;
            let trial = 0;
            while (!success && trial < maxTrials) {
                success = yield this.textEditor.edit((editBuilder) => {
                    ranges.forEach((range) => {
                        editBuilder.delete(range);
                    });
                });
                trial++;
            }
            return success;
        });
    }
    isYankInterupted() {
        if (this.docChangedAfterYank) {
            return true;
        }
        const currentActives = this.getCursorPositions();
        return !utils_1.equalPositons(currentActives, this.prevYankPositions);
    }
    getCursorPositions() {
        return this.textEditor.selections.map((selection) => selection.active);
    }
}
exports.KillYanker = KillYanker;
//# sourceMappingURL=index.js.map