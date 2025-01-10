import express, { Request, Response } from 'express';
import cors from 'cors';
import { BlogRoutes } from './app/modules/blog/blog.route';
import globalErrorHandeling from './app/middlewares/globalErrorHandeling';
import { UserRegistrationRouter } from './app/modules/auth/auth.route';
import { UserRoute } from './app/modules/user/user.route';
import { AdminActionRouter } from './app/modules/admin/admin.route';
// import notFound from './app/middlewares/notFound';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is runnig...',
  });
});

app.use('/api/auth', UserRegistrationRouter);
app.use('/api/auth', UserRoute);
app.use('/api', BlogRoutes);
app.use('/api', AdminActionRouter);
// global error route
app.use(globalErrorHandeling);
// notfound route
// not found handeler
// app.use(notFound);
export default app;
