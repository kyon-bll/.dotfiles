"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function createParallel(concurrency, promiseFactory) {
    return Promise.all(Array.apply(null, Array(concurrency)).map(promiseFactory));
}
exports.createParallel = createParallel;
class EmacsCommand {
    constructor(afterExecute, markModeController) {
        this.afterExecute = afterExecute;
        this.emacsController = markModeController;
    }
    run(textEditor, isInMarkMode, prefixArgument) {
        const ret = this.execute(textEditor, isInMarkMode, prefixArgument);
        if (ret !== undefined && ret.then !== undefined) {
            return ret.then(() => this.afterExecute());
        }
        else {
            this.afterExecute();
            return;
        }
    }
}
exports.EmacsCommand = EmacsCommand;
function instanceOfIEmacsCommandInterrupted(obj) {
    return typeof obj.onDidInterruptTextEditor === "function";
}
exports.instanceOfIEmacsCommandInterrupted = instanceOfIEmacsCommandInterrupted;
//# sourceMappingURL=index.js.map