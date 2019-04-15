// Copyright (c) 2016 Nisheet Jain
// Released under the MIT license
// https://github.com/nisheetjain/vscode-emacs/blob/master/LICENSE.txt
'use strict';
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
var vscode = require('vscode');
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    setRegionMode(false);
    context.subscriptions.push(vscode.commands.registerCommand('emacs.startRegionMode', function () {
        startRegionMode();
    }));
    context.subscriptions.push(vscode.commands.registerCommand('emacs.exitRegionMode', function () {
        exitRegionMode();
    }));
    var selectionActions = ["action.clipboardCopyAction", "action.clipboardPasteAction", "action.clipboardCutAction"];
    selectionActions.forEach(function (selectionAction) {
        context.subscriptions.push(vscode.commands.registerCommand("emacs." + selectionAction, function () {
            vscode.commands.executeCommand("editor." + selectionAction).then(exitRegionMode);
        }));
    });
}
exports.activate = activate;
function startRegionMode() {
    setRegionMode(true).then(removeSelection);
}
function exitRegionMode() {
    setRegionMode(false).then(removeSelection);
}
function setRegionMode(value) {
    return vscode.commands.executeCommand('setContext', 'inRegionMode', value);
}
function removeSelection() {
    var pos = vscode.window.activeTextEditor.selection.active;
    vscode.window.activeTextEditor.selection = new vscode.Selection(pos, pos);
}
// this method is called when your extension is deactivated
function deactivate() {
    setRegionMode(false);
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map