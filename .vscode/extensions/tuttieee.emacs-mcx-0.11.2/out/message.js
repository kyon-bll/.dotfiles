"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
/**
 * Shows emacs-like status bar message which disappears when any other command is invoked.
 */
class MessageManager {
    constructor(timeout = 10000) {
        this.disposable = null;
        this.timeout = timeout;
        this.onInterrupt = this.onInterrupt.bind(this);
        vscode.window.onDidChangeActiveTerminal(this.onInterrupt);
        vscode.window.onDidChangeActiveTextEditor(this.onInterrupt);
        vscode.window.onDidChangeTextEditorOptions(this.onInterrupt);
        vscode.window.onDidChangeTextEditorSelection(this.onInterrupt);
        vscode.window.onDidChangeTextEditorViewColumn(this.onInterrupt);
        vscode.window.onDidChangeTextEditorVisibleRanges(this.onInterrupt);
        vscode.window.onDidChangeVisibleTextEditors(this.onInterrupt);
        vscode.window.onDidChangeWindowState(this.onInterrupt);
        vscode.window.onDidCloseTerminal(this.onInterrupt);
        vscode.window.onDidOpenTerminal(this.onInterrupt);
        vscode.workspace.onDidChangeConfiguration(this.onInterrupt);
        vscode.workspace.onDidChangeTextDocument(this.onInterrupt);
        vscode.workspace.onDidChangeWorkspaceFolders(this.onInterrupt);
        vscode.workspace.onDidCloseTextDocument(this.onInterrupt);
        vscode.workspace.onDidOpenTextDocument(this.onInterrupt);
        vscode.workspace.onDidSaveTextDocument(this.onInterrupt);
        vscode.workspace.onWillSaveTextDocument(this.onInterrupt);
    }
    /**
     * MessageManager uses singleton pattern.
     */
    static get instance() {
        return this.inst;
    }
    static initialize(context) {
        if (this.inst) {
            return;
        }
        this.inst = new MessageManager();
        context.subscriptions.push(this.inst);
    }
    static showMessage(text) {
        if (this.instance) {
            this.instance.showMessage(text);
        }
    }
    onInterrupt() {
        if (this.disposable === null) {
            return;
        }
        this.disposable.dispose();
        delete this.disposable;
        this.disposable = null;
    }
    showMessage(text) {
        if (this.disposable) {
            this.disposable.dispose();
        }
        this.disposable = vscode.window.setStatusBarMessage(text, this.timeout);
    }
    dispose() {
        if (this.disposable !== null) {
            this.disposable.dispose();
        }
    }
}
exports.MessageManager = MessageManager;
//# sourceMappingURL=message.js.map