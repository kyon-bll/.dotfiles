"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class KillRing {
    constructor(maxNum = 60) {
        this.maxNum = 60;
        if (maxNum) {
            this.maxNum = maxNum;
        }
        this.pointer = null;
        this.killRing = [];
    }
    push(entity) {
        this.killRing = [entity].concat(this.killRing);
        if (this.killRing.length > this.maxNum) {
            this.killRing = this.killRing.slice(0, this.maxNum);
        }
        this.pointer = 0;
    }
    getTop() {
        if (this.pointer === null || this.killRing.length === 0) {
            return null;
        }
        return this.killRing[this.pointer];
    }
    pop() {
        if (this.pointer === null || this.killRing.length === 0) {
            return null;
        }
        this.pointer = (this.pointer + 1) % this.killRing.length;
        return this.killRing[this.pointer];
    }
    dispose() {
        delete this.killRing;
    }
}
exports.KillRing = KillRing;
//# sourceMappingURL=kill-ring.js.map