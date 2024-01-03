"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class LogParser {
    parseLogs(logs) {
        if (!logs || !Array.isArray(logs)) {
            console.error('Invalid or missing logs array');
            return [];
        }
        const logEntries = [];
        for (const log of logs) {
            try {
                const logObject = JSON.parse(log.substr(24)); // Remove timestamp and parse JSON
                const entry = {
                    timestamp: new Date(log.substr(0, 24)).getTime(),
                    loglevel: logObject.loglevel,
                    transactionId: logObject.transactionId,
                    err: logObject.err,
                };
                if (entry.loglevel === 'error' || entry.loglevel === 'warn') {
                    logEntries.push(entry);
                }
            }
            catch (error) {
                console.error('Error parsing log entry:', error);
            }
        }
        return logEntries;
    }
}
exports.default = LogParser;
