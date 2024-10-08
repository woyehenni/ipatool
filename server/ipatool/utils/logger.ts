export enum LogLevel {
  ERROR,
  WARNING,
  INFO,
  DEBUG,
}

export class Logger {
  public level: LogLevel

  constructor(level: LogLevel | string) {
    if (typeof level === "string") {
      this.level = LogLevel[level.toUpperCase() as keyof typeof LogLevel]
    } else {
      this.level = level
    }
  }

  public debug(...args: any[]) {
    if (this.level >= LogLevel.DEBUG) {
      console.debug("[debug]", ...args)
    }
  }

  public info(...args: any[]) {
    if (this.level >= LogLevel.INFO) {
      console.log("[info]", ...args)
    }
  }

  public warning(...args: any[]) {
    if (this.level >= LogLevel.WARNING) {
      console.warn("[warning]", ...args)
    }
  }

  public error(...args: any[]) {
    if (this.level >= LogLevel.ERROR) {
      console.error("[error]", ...args)
    }
  }
}
