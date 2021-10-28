import chalk from "chalk";
import _ from "lodash";

const error = (message: string, ...args: any[]) =>
    logLevelWithArgs("error", `${chalk.red("[ERROR]")} ${message}`, args);

const info = (message: string, ...args: any[]) =>
    logLevelWithArgs("log", `${chalk.blue("[INFO] ")} ${message}`, args);

const success = (message: string, ...args: any[]) =>
    logLevelWithArgs("log", `${chalk.green("[OK]   ")} ${message}`, args);

const warn = (message: string, ...args: any[]) =>
    logLevelWithArgs("warn", `${chalk.yellow("[WARN] ")} ${message}`, args);

const logLevelWithArgs = (
    level: "error" | "log" | "warn",
    message: string,
    args: any[]
) => {
    if (_.isEmpty(args)) {
        return console[level](message);
    }

    return console[level](message, ...args);
};

const log = { info, warn, error, success };

export { log };
