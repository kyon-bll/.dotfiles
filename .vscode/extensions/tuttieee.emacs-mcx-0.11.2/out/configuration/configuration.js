"use strict";
/**
 * This file is derived from VSCodeVim/Vim.
 */
Object.defineProperty(exports, "__esModule", { value: true });
// tslint:disable: object-literal-sort-keys
const vscode = require("vscode");
class Configuration {
    /**
     * Instance methods
     */
    constructor() {
        /**
         * Config fields
         */
        this.killRingMax = 60;
        this.debug = {
            silent: false,
            loggingLevelForAlert: "error",
            loggingLevelForConsole: "error",
        };
        this.reload();
    }
    /**
     * Configuration uses singleton pattern.
     */
    static get instance() {
        return this.inst;
    }
    static initialize(context) {
        if (this.inst) {
            return;
        }
        this.inst = new Configuration();
        context.subscriptions.push(this.inst);
    }
    dispose() {
        // Now nothing to be done.
    }
    reload() {
        const emacsConfigs = vscode.workspace.getConfiguration("emacs-mcx");
        /* tslint:disable:forin */
        // Disable forin rule here as we make accessors enumerable.`
        for (const option in this) {
            let val = emacsConfigs[option];
            if (val !== null && val !== undefined) {
                if (val.constructor.name === Object.name) {
                    val = Configuration.unproxify(val);
                }
                this[option] = val;
            }
        }
    }
    // tslint:disable-next-line: member-ordering
    static unproxify(obj) {
        const result = {};
        for (const key in obj) {
            const val = obj[key];
            if (val !== null && val !== undefined) {
                result[key] = val;
            }
        }
        return result;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map