"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("../");
class AppendedRegionTexts {
    constructor(regionText) {
        this.regionTexts = [regionText];
    }
    append(another, appendDirection = __1.AppendDirection.Forward) {
        if (appendDirection === __1.AppendDirection.Forward) {
            this.regionTexts = this.regionTexts.concat(another.regionTexts);
        }
        else {
            this.regionTexts = another.regionTexts.concat(this.regionTexts);
        }
    }
    isEmpty() {
        return this.regionTexts.every((regionText) => regionText.text === "");
    }
    getAppendedText() {
        return this.regionTexts.map((regionText) => regionText.text).join("");
    }
    getLastRange() {
        return this.regionTexts[this.regionTexts.length - 1].range;
    }
}
class EditorTextKillRingEntity {
    constructor(regionTexts) {
        this.regionTextsList = regionTexts.map((regionText) => new AppendedRegionTexts(regionText));
    }
    isSameClipboardText(clipboardText) {
        return this.asString() === clipboardText;
    }
    isEmpty() {
        return this.regionTextsList.every((regionTexts) => regionTexts.isEmpty());
    }
    // TODO: Cache the result of this method because it is called repeatedly
    asString() {
        const appendedTexts = this.regionTextsList
            .map((appendedRegionTexts) => ({
            range: appendedRegionTexts.getLastRange(),
            text: appendedRegionTexts.getAppendedText(),
        }));
        const sortedAppendedTexts = appendedTexts
            .sort((a, b) => {
            if (a.range.start.line === b.range.start.line) {
                return a.range.start.character - b.range.start.character;
            }
            else {
                return a.range.start.line - b.range.start.line;
            }
        });
        let allText = "";
        sortedAppendedTexts.forEach((item, i) => {
            const prevItem = sortedAppendedTexts[i - 1];
            if (prevItem && prevItem.range.start.line !== item.range.start.line) {
                allText += "\n" + item.text;
            }
            else {
                allText += item.text;
            }
        });
        return allText;
    }
    getregionTextsList() {
        return this.regionTextsList;
    }
    append(entity, appendDirection = __1.AppendDirection.Forward) {
        const additional = entity.getregionTextsList();
        if (additional.length !== this.regionTextsList.length) {
            throw Error("Not appendable");
        }
        this.regionTextsList.map((appendedRegionTexts, i) => appendedRegionTexts.append(additional[i], appendDirection));
    }
}
exports.EditorTextKillRingEntity = EditorTextKillRingEntity;
//# sourceMappingURL=editor-text.js.map