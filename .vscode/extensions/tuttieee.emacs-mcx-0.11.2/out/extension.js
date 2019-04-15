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
const vscode = require("vscode");
const move_1 = require("./commands/move");
const configuration_1 = require("./configuration/configuration");
const emulator_map_1 = require("./emulator-map");
const execute_commands_1 = require("./execute-commands");
const kill_ring_1 = require("./kill-yank/kill-ring");
const logger_1 = require("./logger");
const message_1 = require("./message");
function activate(context) {
    message_1.MessageManager.initialize(context);
    configuration_1.Configuration.initialize(context);
    logger_1.initializeLogger(configuration_1.Configuration.instance);
    const killRing = new kill_ring_1.KillRing(configuration_1.Configuration.instance.killRingMax);
    context.subscriptions.push(killRing);
    const emulatorMap = new emulator_map_1.EmacsEmulatorMap(killRing);
    context.subscriptions.push(emulatorMap);
    function getAndUpdateEmulator() {
        const activeTextEditor = vscode.window.activeTextEditor;
        if (typeof activeTextEditor === "undefined") {
            return undefined;
        }
        const [curEmulator, isNew] = emulatorMap.getOrCreate(activeTextEditor);
        if (isNew) {
            context.subscriptions.push(curEmulator);
        }
        return curEmulator;
    }
    vscode.workspace.onDidCloseTextDocument(() => {
        const documents = vscode.workspace.textDocuments;
        // Delete emulators once all tabs of this document have been closed
        for (const key of emulatorMap.getKeys()) {
            const emulator = emulatorMap.get(key);
            if (emulator === undefined ||
                emulator.getTextEditor() === undefined ||
                documents.indexOf(emulator.getTextEditor().document) === -1) {
                emulatorMap.delete(key);
            }
        }
    });
    function registerEmulatorCommand(commandName, callback, onNoEmulator) {
        const disposable = vscode.commands.registerCommand(commandName, (...args) => {
            logger_1.logger.debug(`[command]\t Command executed: "${commandName}"`);
            const emulator = getAndUpdateEmulator();
            if (!emulator) {
                if (typeof onNoEmulator === "function") {
                    onNoEmulator(...args);
                }
                return;
            }
            callback(emulator, ...args);
        });
        context.subscriptions.push(disposable);
    }
    registerEmulatorCommand("type", (emulator, args) => {
        // Capture typing charactors for prefix argument functionality.
        logger_1.logger.debug(`[type command]\t args.text = "${args.text}"`);
        emulator.type(args.text);
    }, (args) => vscode.commands.executeCommand("default:type", args));
    move_1.moveCommandIds.map((commandName) => {
        registerEmulatorCommand(`emacs-mcx.${commandName}`, (emulator) => {
            emulator.runCommand(commandName);
        });
    });
    registerEmulatorCommand("emacs-mcx.deleteBackwardChar", (emulator) => {
        emulator.runCommand("deleteBackwardChar");
    });
    registerEmulatorCommand("emacs-mcx.deleteForwardChar", (emulator) => {
        emulator.runCommand("deleteForwardChar");
    });
    registerEmulatorCommand("emacs-mcx.universalArgument", (emulator) => {
        emulator.universalArgument();
    });
    registerEmulatorCommand("emacs-mcx.killLine", (emulator) => {
        emulator.runCommand("killLine");
    });
    registerEmulatorCommand("emacs-mcx.killWord", (emulator) => {
        emulator.runCommand("killWord");
    });
    registerEmulatorCommand("emacs-mcx.backwardKillWord", (emulator) => {
        emulator.runCommand("backwardKillWord");
    });
    registerEmulatorCommand("emacs-mcx.killWholeLine", (emulator) => {
        emulator.runCommand("killWholeLine");
    });
    registerEmulatorCommand("emacs-mcx.killRegion", (emulator) => {
        emulator.runCommand("killRegion");
    });
    registerEmulatorCommand("emacs-mcx.copyRegion", (emulator) => {
        emulator.runCommand("copyRegion");
    });
    registerEmulatorCommand("emacs-mcx.yank", (emulator) => {
        emulator.runCommand("yank");
    });
    registerEmulatorCommand("emacs-mcx.yank-pop", (emulator) => {
        emulator.runCommand("yankPop");
    });
    registerEmulatorCommand("emacs-mcx.setMarkCommand", (emulator) => {
        emulator.setMarkCommand();
    });
    registerEmulatorCommand("emacs-mcx.addSelectionToNextFindMatch", (emulator) => {
        emulator.runCommand("addSelectionToNextFindMatch");
    });
    registerEmulatorCommand("emacs-mcx.addSelectionToPreviousFindMatch", (emulator) => {
        emulator.runCommand("addSelectionToPreviousFindMatch");
    });
    registerEmulatorCommand("emacs-mcx.cancel", (emulator) => {
        emulator.cancel();
    });
    registerEmulatorCommand("emacs-mcx.newLine", (emulator) => {
        emulator.runCommand("newLine");
    });
    registerEmulatorCommand("emacs-mcx.transformToUppercase", (emulator) => {
        emulator.runCommand("transformToUppercase");
    });
    registerEmulatorCommand("emacs-mcx.transformToLowercase", (emulator) => {
        emulator.runCommand("transformToLowercase");
    });
    registerEmulatorCommand("emacs-mcx.deleteBlankLines", (emulator) => {
        emulator.runCommand("deleteBlankLines");
    });
    registerEmulatorCommand("emacs-mcx.recenterTopBottom", (emulator) => {
        emulator.runCommand("recenterTopBottom");
    });
    registerEmulatorCommand("emacs-mcx.paredit.forwardSexp", (emulator) => {
        emulator.runCommand("paredit.forwardSexp");
    });
    registerEmulatorCommand("emacs-mcx.paredit.forwardDownSexp", (emulator) => {
        emulator.runCommand("paredit.forwardDownSexp");
    });
    registerEmulatorCommand("emacs-mcx.paredit.backwardSexp", (emulator) => {
        emulator.runCommand("paredit.backwardSexp");
    });
    registerEmulatorCommand("emacs-mcx.paredit.backwardUpSexp", (emulator) => {
        emulator.runCommand("paredit.backwardUpSexp");
    });
    vscode.commands.registerCommand("emacs-mcx.executeCommands", (...args) => __awaiter(this, void 0, void 0, function* () {
        if (1 <= args.length) {
            execute_commands_1.executeCommands(args[0]);
        }
    }));
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map