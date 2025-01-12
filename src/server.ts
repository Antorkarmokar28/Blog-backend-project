/* eslint-disable no-undef */
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import { Server } from 'http';
let server: Server;
async function main() {
  await mongoose.connect(config.server_url as string);

  server = app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
}
main();

process.on('unhandledRejection', () => {
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
});

process.on('uncaughtException', () => {
  process.exit(1);
});
