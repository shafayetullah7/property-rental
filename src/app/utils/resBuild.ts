interface IstandaredResponse {
  success: true;
  statusCode: number;
  message: string;
  data: unknown;
}

const resBuild = (
  statusCode: number,
  message: string,
  data: unknown
): IstandaredResponse => {
  return {
    success: true,
    statusCode,
    message,
    data,
  };
};

export default resBuild;
