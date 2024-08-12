//
// export type MessageTypes = "ERROR" | "WARN" | "LOG" | "INFO" | "DEBUG";
// export type LogLevelTypes = MessageTypes | "SILENT";
//
// export type Message = {
//     type: MessageTypes,
//     data: string,
//     more: string | null,
// };
//
// export interface LogFunction {
//     (msg: string, ...more: any[]): void;
// }
//
// export interface LogTo {
//     debug: LogFunction;
//     info: LogFunction;
//     log: LogFunction;
//     warn: LogFunction;
//     error: LogFunction;
//     clear?: LogFunction;
// }
//
// // unneeded / unused, but preserved to show LogLevel order of precedence
// // const _logLevelPrecedence: LogLevelTypes[] = ["SILENT", "ERROR", "WARN", "LOG", "INFO", "DEBUG"];
//
// export default class LogHelper {
//
//     static _messages : Array<Message> = [];
//
//     static _includePrefix = false;
//     public static get IncludePrefix(): boolean { return LogHelper._includePrefix; }
//     public static set IncludePrefix(value: boolean) { LogHelper._includePrefix = value; }
//
//     static _outputModule: LogTo | undefined = undefined;
//     public static set OutputModule(value: LogTo | undefined) { LogHelper._outputModule = value; }
//
//     static _logLevel: LogLevelTypes = "DEBUG";
//     public static get LogLevel() { return LogHelper._logLevel; }
//     public static set LogLevel(level: LogLevelTypes) { LogHelper._logLevel = level; }
//
//     public static DoLogItem(level: MessageTypes) {
//         switch(LogHelper.LogLevel) {
//             case "SILENT":
//                 return false;
//             case "ERROR":
//                 return ["ERROR"].indexOf(level) >= 0;
//             case "WARN":
//                 return ["ERROR", "WARN"].indexOf(level) >= 0;
//             case "LOG":
//                 return ["ERROR", "WARN", "LOG"].indexOf(level) >= 0;
//             case "INFO":
//                 return ["ERROR", "WARN", "LOG", "INFO"].indexOf(level) >= 0;
//             case "DEBUG":
//             default:
//                 return true;
//         }
//     }
//
//     public static LogMessage(type: MessageTypes, msg: string, more?: string | any) : void {
//
//         if(LogHelper.DoLogItem(type)) {
//
//             const message = {
//                 type: type,
//                 data: LogHelper.IncludePrefix ? type + ': ' + msg : msg,
//                 more: more ? (typeof more === 'string' ? more : JSON.stringify(more, null, 3)) : "",
//             } as Message;
//
//             LogHelper._messages.push(message);
//
//             const outputModule = LogHelper._outputModule;
//             if (outputModule) {
//                 switch (type) {
//                     case "DEBUG":
//                         outputModule.debug(message.data);
//                         if (message.more) outputModule.debug(message.more);
//                         break;
//                     case "INFO":
//                         outputModule.info(message.data);
//                         if (message.more) outputModule.info(message.more);
//                         break;
//                     case "LOG":
//                         outputModule.log(message.data);
//                         if (message.more) outputModule.log(message.more);
//                         break;
//                     case "WARN":
//                         outputModule.warn(message.data);
//                         if (message.more) outputModule.warn(message.more);
//                         break;
//                     case "ERROR":
//                         outputModule.error(message.data);
//                         if (message.more) outputModule.error(message.more);
//                         break;
//                 }
//             }
//         }
//     }
//
//     public static Clear() : void {
//         LogHelper._messages.length = 0;
//     }
// }