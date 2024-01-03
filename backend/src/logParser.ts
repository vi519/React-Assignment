interface LogEntry {
    timestamp: number;
    loglevel: string;
    transactionId: string;
    err?: string;
  }
  
  export default class LogParser {
    parseLogs(logs: string[] | undefined): any[] {
      if (!logs || !Array.isArray(logs)) {
        console.error('Invalid or missing logs array');
        return [];
      }
  
      const logEntries: any[] = [];
  
      for (const log of logs) {
        try {
          const logObject = JSON.parse(log.substr(24)); // Remove timestamp and parse JSON
          const entry: any = {
            timestamp: new Date(log.substr(0, 24)).getTime(),
            loglevel: logObject.loglevel,
            transactionId: logObject.transactionId,
            err: logObject.err,
          };
  
          if (entry.loglevel === 'error' || entry.loglevel === 'warn') {
            logEntries.push(entry);
          }
        } catch (error) {
          console.error('Error parsing log entry:', error);
        }
      }
  
      return logEntries;
    }
  }
  