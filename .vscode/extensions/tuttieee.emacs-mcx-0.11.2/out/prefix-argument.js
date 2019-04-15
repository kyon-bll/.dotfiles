"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("./logger");
const message_1 = require("./message");
class PrefixArgumentHandler {
    constructor() {
        this.isInPrefixArgumentMode = false;
        this.isAcceptingPrefixArgument = false;
        this.cuCount = 0; // How many C-u are input continuously
        this.prefixArgumentStr = ""; // Prefix argument string input after C-u
    }
    handleType(text) {
        if (!this.isInPrefixArgumentMode) {
            logger_1.logger.debug(`[PrefixArgumentHandler.handleType]\t Not in prefix argument mode. exit.`);
            return false;
        }
        if (this.isAcceptingPrefixArgument && !isNaN(+text)) {
            // If `text` is a numeric charactor
            this.prefixArgumentStr += text;
            message_1.MessageManager.showMessage(`C-u ${this.prefixArgumentStr}-`);
            logger_1.logger.debug(`[PrefixArgumentHandler.handleType]\t Prefix argument is "${this.prefixArgumentStr}"`);
            return true;
        }
        logger_1.logger.debug(`[PrefixArgumentHandler.handleType]\t Prefix argument input is not accepted.`);
        return false;
    }
    /**
     * Emacs' ctrl-u
     */
    universalArgument() {
        if (this.isInPrefixArgumentMode && this.prefixArgumentStr.length > 0) {
            logger_1.logger.debug(`[PrefixArgumentHandler.universalArgument]\t Stop accepting prefix argument.`);
            this.isAcceptingPrefixArgument = false;
        }
        else {
            logger_1.logger.debug(`[PrefixArgumentHandler.universalArgument]\t Start prefix argument or count up C-u.`);
            this.isInPrefixArgumentMode = true;
            this.isAcceptingPrefixArgument = true;
            this.cuCount++;
            this.prefixArgumentStr = "";
        }
    }
    cancel() {
        logger_1.logger.debug(`[PrefixArgumentHandler.cancel]`);
        this.isInPrefixArgumentMode = false;
        this.isAcceptingPrefixArgument = false;
        this.cuCount = 0;
        this.prefixArgumentStr = "";
    }
    getPrefixArgument() {
        if (!this.isInPrefixArgumentMode) {
            return undefined;
        }
        const prefixArgument = parseInt(this.prefixArgumentStr, 10);
        if (isNaN(prefixArgument)) {
            return Math.pow(4, this.cuCount);
        }
        return prefixArgument;
    }
}
exports.PrefixArgumentHandler = PrefixArgumentHandler;
//# sourceMappingURL=prefix-argument.js.map