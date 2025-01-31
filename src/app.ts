import express, { Request, Response } from 'express';
import cors from 'cors';
import { BlogRoutes } from './app/modules/blog/blog.route';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
import { AdminActionRouter } from './app/modules/admin/admin.route';
import { UserLoginRouter } from './app/modules/auth/auth.route';
const app = express();
app.use(express.json());
app.use(cors());

const testServer = async (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is runnig...',
  });
};

app.get('/', testServer);

app.use('/api/auth', UserLoginRouter);
app.use('/api/blogs', BlogRoutes);
app.use('/api/admin', AdminActionRouter);
// global error route
app.use(globalErrorHandeling);
// any router not found handeler
app.use('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: false,
    message: 'Route not found',
  });
});
export default app;
