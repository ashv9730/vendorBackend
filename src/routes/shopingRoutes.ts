import express from "express";
import {
  getFoodAvailability,
  getFoodIn30Min,
  getTopRestuarents,
  restuarentById,
  searchFood,
} from "../controllers";

const router = express.Router();

// find availability
router.get("/:pincode", getFoodAvailability);
// Top restuarents
router.get("/top-restuarents/:pincode", getTopRestuarents);
// food avialable in 30 minutes
router.get("/foods-in-30-min/:pincode", getFoodIn30Min);
// search foods
router.get("/serach/:pincode", searchFood);
// find restuarents by Id
router.get("/restuarent/:id", restuarentById);

export { router as shopingRouter };
