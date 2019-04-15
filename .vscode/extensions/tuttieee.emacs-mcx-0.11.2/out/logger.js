"use strict";
/**
 * This file is derived from VSCodeVim/Vim.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const winston = require("winston");
const winston_console_for_electron_1 = require("winston-console-for-electron");
const TransportStream = require("winston-transport");
/**
 * Implementation of Winston transport
 * Displays VS Code message to user
 */
class VsCodeMessage extends TransportStream {
    log(info, callback) {
        switch (info.level) {
            case "error":
                vscode.window.showErrorMessage(info.message, "Dismiss");
                break;
            case "warn":
                vscode.window.showWarningMessage(info.message, "Dismiss");
                break;
            case "info":
            case "verbose":
            case "debug":
                vscode.window.showInformationMessage(info.message, "Dismiss");
                break;
        }
        if (callback) {
            callback();
        }
    }
}
exports.logger = winston.createLogger({
    format: winston.format.simple(),
    transports: [
        new winston_console_for_electron_1.ConsoleForElectron({
            level: "error",
            silent: false,
        }),
        new VsCodeMessage({
            level: "error",
            silent: false,
        }),
    ],
});
function initializeLogger(configuration) {
    exports.logger = winston.createLogger({
        format: winston.format.simple(),
        transports: [
            new winston_console_for_electron_1.ConsoleForElectron({
                level: configuration.debug.loggingLevelForConsole,
                silent: configuration.debug.silent,
            }),
            new VsCodeMessage({
                level: configuration.debug.loggingLevelForAlert,
                silent: configuration.debug.silent,
            }),
        ],
    });
}
exports.initializeLogger = initializeLogger;
//# sourceMappingURL=logger.js.map