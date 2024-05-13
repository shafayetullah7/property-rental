class AppError extends Error {
  statusCode: number;
  stack?: string;

  constructor(statusCode: number = 500, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
