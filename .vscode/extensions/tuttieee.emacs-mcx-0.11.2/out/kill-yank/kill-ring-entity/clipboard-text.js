"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ClipboardTextKillRingEntity {
    constructor(clipboardText) {
        this.text = clipboardText;
    }
    isSameClipboardText(clipboardText) {
        return clipboardText === this.text;
    }
    isEmpty() {
        return this.text === "";
    }
    asString() {
        return this.text;
    }
}
exports.ClipboardTextKillRingEntity = ClipboardTextKillRingEntity;
//# sourceMappingURL=clipboard-text.js.map