"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function equalPositons(positions1, positions2) {
    if (positions1.length !== positions2.length) {
        return false;
    }
    return positions1.every((p1, i) => p1.isEqual(positions2[i]));
}
exports.equalPositons = equalPositons;
//# sourceMappingURL=utils.js.map