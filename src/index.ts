import path from "path";
import express from "express";
import { PORTNO } from "./config";
import database from "./services/database";
import expressApp from "./services/expressApp";

export const imagePath = path.join(__dirname, "images");
const startServer = () => {
  const app = express();
  // due to async
  database(app);
  expressApp(app);
  const PORT = PORTNO || 3000;
  app.listen(PORT, () => {
    console.log(`server listening on ${PORT}`);
  });
};

startServer();
