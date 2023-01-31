import mongoose from "mongoose";
import { dbName, dbPassword, dbUser } from "../config";
import { Application } from "express";

// data base connection
export default async (app: Application) => {
  try {
    const url = `mongodb+srv://${dbUser}:${dbPassword}@cluster0.es5vaf2.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    // Database
    mongoose.connect(url);

    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error: "));
    db.once("open", function () {
      console.log("DB Connected successfully");
    });
  } catch (error) {
    console.log("error form service/database : ", error);
  }
};
