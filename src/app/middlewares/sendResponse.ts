import { Response } from 'express';
// send response interface defination
interface ISendResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
}
//send response with custom function defination
const sendResponse = <T>(res: Response, data: ISendResponse<T>) => {
  res.status(data?.statusCode).json({
    success: data?.success,
    message: data?.message,
    data: data.data,
  });
};

export default sendResponse;
