import express, { Request, Response } from 'express';
import cors from 'cors';
import router from './app/router';
const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req: Request, res: Response) => {
  res.send({
    success: true,
    message: 'Server is runnig...',
  });
});

app.use('/api', router);

export default app;
