import express, { Application, urlencoded } from "express";
import { imagePath } from "..";
import {
  adminRoutes,
  customerRoutes,
  shopingRouter,
  vendorRoutes,
} from "../routes";
import { testRoutes } from "../routes/testRouter";
import { pageNotFound } from "../utility/pageNotFound";

export default async (app: Application) => {
  app.use(express.json());
  app.use(urlencoded({ extended: true }));
  app.use("/images", express.static(imagePath));

  app.use("/admin", adminRoutes);
  app.use("/vendor", vendorRoutes);
  app.use("/test", testRoutes);
  app.use("/shoping", shopingRouter);
  app.use("/customer", customerRoutes);
  app.use("*", pageNotFound);

  return app;
};
