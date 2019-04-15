"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const vscode_1 = require("vscode");
const commands_1 = require("./commands");
const add_selection_to_find_match_1 = require("./commands/add-selection-to-find-match");
const case_1 = require("./commands/case");
const delete_blank_lines_1 = require("./commands/delete-blank-lines");
const EditCommands = require("./commands/edit");
const kill_1 = require("./commands/kill");
const MoveCommands = require("./commands/move");
const paredit_1 = require("./commands/paredit");
const recenter_1 = require("./commands/recenter");
const registry_1 = require("./commands/registry");
const editorIdentity_1 = require("./editorIdentity");
const kill_yank_1 = require("./kill-yank");
const logger_1 = require("./logger");
const message_1 = require("./message");
const prefix_argument_1 = require("./prefix-argument");
class EmacsEmulator {
    constructor(textEditor, killRing = null) {
        // tslint:disable-next-line:variable-name
        this._isInMarkMode = false;
        this.textEditor = textEditor;
        this.prefixArgumentHandler = new prefix_argument_1.PrefixArgumentHandler();
        this.onDidChangeTextDocument = this.onDidChangeTextDocument.bind(this);
        vscode.workspace.onDidChangeTextDocument(this.onDidChangeTextDocument);
        this.onDidChangeTextEditorSelection = this.onDidChangeTextEditorSelection.bind(this);
        vscode.window.onDidChangeTextEditorSelection(this.onDidChangeTextEditorSelection);
        this.commandRegistry = new registry_1.EmacsCommandRegistry();
        this.afterCommand = this.afterCommand.bind(this);
        this.commandRegistry.register(new MoveCommands.ForwardChar(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.BackwardChar(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.NextLine(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.PreviousLine(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.MoveBeginningOfLine(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.MoveEndOfLine(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.ForwardWord(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.BackwardWord(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.BeginningOfBuffer(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.EndOfBuffer(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.ScrollUpCommand(this.afterCommand, this));
        this.commandRegistry.register(new MoveCommands.ScrollDownCommand(this.afterCommand, this));
        this.commandRegistry.register(new EditCommands.DeleteBackwardChar(this.afterCommand, this));
        this.commandRegistry.register(new EditCommands.DeleteForwardChar(this.afterCommand, this));
        this.commandRegistry.register(new EditCommands.NewLine(this.afterCommand, this));
        this.commandRegistry.register(new delete_blank_lines_1.DeleteBlankLines(this.afterCommand, this));
        this.commandRegistry.register(new paredit_1.ForwardSexp(this.afterCommand, this));
        this.commandRegistry.register(new paredit_1.BackwardSexp(this.afterCommand, this));
        this.commandRegistry.register(new paredit_1.ForwardDownSexp(this.afterCommand, this));
        this.commandRegistry.register(new paredit_1.BackwardUpSexp(this.afterCommand, this));
        this.commandRegistry.register(new recenter_1.RecenterTopBottom(this.afterCommand, this));
        const killYanker = new kill_yank_1.KillYanker(textEditor, killRing);
        this.commandRegistry.register(new kill_1.KillWord(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.BackwardKillWord(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.KillLine(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.KillWholeLine(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.KillRegion(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.CopyRegion(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.Yank(this.afterCommand, this, killYanker));
        this.commandRegistry.register(new kill_1.YankPop(this.afterCommand, this, killYanker));
        this.killYanker = killYanker; // TODO: To be removed
        this.commandRegistry.register(new add_selection_to_find_match_1.AddSelectionToNextFindMatch(this.afterCommand, this));
        this.commandRegistry.register(new add_selection_to_find_match_1.AddSelectionToPreviousFindMatch(this.afterCommand, this));
        this.commandRegistry.register(new case_1.TransformToUppercase(this.afterCommand, this));
        this.commandRegistry.register(new case_1.TransformToLowercase(this.afterCommand, this));
    }
    get isInMarkMode() {
        return this._isInMarkMode;
    }
    setTextEditor(textEditor) {
        this.textEditor = textEditor;
        this.killYanker.setTextEditor(textEditor);
    }
    getTextEditor() {
        return this.textEditor;
    }
    onDidChangeTextDocument(e) {
        // XXX: Is this a correct way to check the identity of document?
        if (e.document.uri.toString() === this.textEditor.document.uri.toString()) {
            if (e.contentChanges.some((contentChange) => this.textEditor.selections.some((selection) => typeof contentChange.range.intersection(selection) !== "undefined"))) {
                this.exitMarkMode();
            }
            this.onDidInterruptTextEditor();
        }
    }
    onDidChangeTextEditorSelection(e) {
        if (new editorIdentity_1.EditorIdentity(e.textEditor).isEqual(new editorIdentity_1.EditorIdentity(this.textEditor))) {
            this.onDidInterruptTextEditor();
        }
    }
    // tslint:disable-next-line:max-line-length
    // Ref: https://github.com/Microsoft/vscode-extension-samples/blob/f9955406b4cad550fdfa891df23a84a2b344c3d8/vim-sample/src/extension.ts#L152
    type(text) {
        const handled = this.prefixArgumentHandler.handleType(text);
        if (handled) {
            logger_1.logger.debug(`[EmacsEmulator.type]\t prefix argument is handled.`);
            return;
        }
        // Single character input with prefix argument
        const prefixArgument = this.prefixArgumentHandler.getPrefixArgument();
        this.prefixArgumentHandler.cancel();
        logger_1.logger.debug(`[EmacsEmulator.type]\t Single char (text: "${text}", prefix argument: ${prefixArgument}).`);
        if (prefixArgument !== undefined && prefixArgument >= 0) {
            const promises = [];
            for (let i = 0; i < prefixArgument; ++i) {
                const promise = vscode.commands.executeCommand("default:type", {
                    text,
                });
                promises.push(promise);
            }
            // NOTE: Current implementation executes promises concurrently. Should it be sequential?
            return Promise.all(promises);
        }
        logger_1.logger.debug(`[EmacsEmulator.type]\t Execute "default:type" (text: "${text}")`);
        return vscode.commands.executeCommand("default:type", {
            text,
        });
    }
    universalArgument() {
        this.prefixArgumentHandler.universalArgument();
    }
    runCommand(commandName) {
        const command = this.commandRegistry.get(commandName);
        if (command === undefined) {
            throw Error(`command ${commandName} is not found`);
        }
        if (command !== undefined) {
            const prefixArgument = this.prefixArgumentHandler.getPrefixArgument();
            return command.run(this.textEditor, this.isInMarkMode, prefixArgument);
        }
    }
    setMarkCommand() {
        if (this.isInMarkMode && !this.hasNonEmptySelection()) {
            // Toggle if enterMarkMode is invoked continuously without any cursor move.
            this.exitMarkMode();
            message_1.MessageManager.showMessage("Mark deactivated");
        }
        else {
            this.enterMarkMode();
            message_1.MessageManager.showMessage("Mark activated");
        }
    }
    /**
     * Invoked by C-g
     */
    cancel() {
        if (this.hasMultipleSelections() && !this.hasNonEmptySelection()) {
            this.stopMultiCursor();
        }
        else {
            this.makeSelectionsEmpty();
        }
        if (this.isInMarkMode) {
            this.exitMarkMode();
        }
        this.onDidInterruptTextEditor();
        this.killYanker.cancelKillAppend();
        this.prefixArgumentHandler.cancel();
        message_1.MessageManager.showMessage("Quit");
    }
    dispose() {
        delete this.killYanker;
    }
    enterMarkMode() {
        this._isInMarkMode = true;
        // At this moment, the only way to set the context for `when` conditions is `setContext` command.
        // The discussion is ongoing in https://github.com/Microsoft/vscode/issues/10471
        // TODO: How to write unittest for `setContext`?
        vscode.commands.executeCommand("setContext", "emacs-mcx.inMarkMode", true);
    }
    exitMarkMode() {
        this._isInMarkMode = false;
        vscode.commands.executeCommand("setContext", "emacs-mcx.inMarkMode", false);
    }
    makeSelectionsEmpty() {
        this.textEditor.selections = this.textEditor.selections.map((selection) => new vscode_1.Selection(selection.active, selection.active));
    }
    stopMultiCursor() {
        vscode.commands.executeCommand("removeSecondaryCursors");
    }
    hasMultipleSelections() {
        return this.textEditor.selections.length > 1;
    }
    hasNonEmptySelection() {
        return this.textEditor.selections.some((selection) => !selection.isEmpty);
    }
    afterCommand() {
        this.prefixArgumentHandler.cancel();
    }
    onDidInterruptTextEditor() {
        this.commandRegistry.forEach((command) => {
            if (commands_1.instanceOfIEmacsCommandInterrupted(command)) {
                command.onDidInterruptTextEditor();
            }
        });
    }
}
exports.EmacsEmulator = EmacsEmulator;
//# sourceMappingURL=emulator.js.map