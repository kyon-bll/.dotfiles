"use strict";
// tslint:disable:max-classes-per-file
Object.defineProperty(exports, "__esModule", { value: true });
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["DEBUG"] = 10] = "DEBUG";
    LogLevel[LogLevel["INFO"] = 20] = "INFO";
    LogLevel[LogLevel["WARNING"] = 30] = "WARNING";
    LogLevel[LogLevel["ERROR"] = 40] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
// tslint:disable-next-line: object-literal-sort-keys
const LogLevelNames = {
    debug: LogLevel.DEBUG,
    info: LogLevel.INFO,
    warning: LogLevel.WARNING,
    error: LogLevel.ERROR,
};
exports.getLogLevel = (levelName) => LogLevelNames[levelName];
class ConsoleHandler {
    emit(record) {
        switch (record.level) {
            case LogLevel.DEBUG:
                // tslint:disable-next-line: no-console
                console.debug(record.msg);
                break;
            case LogLevel.INFO:
                // tslint:disable-next-line: no-console
                console.info(record.msg);
                break;
            case LogLevel.WARNING:
                // tslint:disable-next-line: no-console
                console.warn(record.msg);
                break;
            case LogLevel.ERROR:
                // tslint:disable-next-line: no-console
                console.error(record.msg);
                break;
        }
    }
}
exports.ConsoleHandler = ConsoleHandler;
class Logger {
    constructor() {
        this.level = LogLevel.INFO;
        this.handler = new ConsoleHandler();
    }
    setLevel(level) {
        this.level = level;
    }
    debug(msg) {
        if (this.level <= LogLevel.DEBUG) {
            const record = this.createRecord(LogLevel.DEBUG, msg);
            this.handler.emit(record);
        }
    }
    info(msg) {
        if (this.level <= LogLevel.DEBUG) {
            const record = this.createRecord(LogLevel.INFO, msg);
            this.handler.emit(record);
        }
    }
    warning(msg) {
        if (this.level <= LogLevel.WARNING) {
            const record = this.createRecord(LogLevel.WARNING, msg);
            this.handler.emit(record);
        }
    }
    error(msg) {
        if (this.level <= LogLevel.ERROR) {
            const record = this.createRecord(LogLevel.ERROR, msg);
            this.handler.emit(record);
        }
    }
    createRecord(level, msg) {
        return {
            level,
            msg,
        };
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logging.js.map