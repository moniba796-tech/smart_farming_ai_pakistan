import { Router } from "express";
import {
  listRetailers,
  verifyRetailer,
  deleteRetailer,
  listFarmers,
  getAnalytics,
} from "../controllers/adminController";
import { requireAdmin } from "../middleware/auth";

const router = Router();

// Every route below requires a valid admin JWT.
router.use(requireAdmin);

router.get("/retailers", listRetailers);
router.patch("/retailers/:id/verify", verifyRetailer);
router.delete("/retailers/:id", deleteRetailer);

router.get("/farmers", listFarmers);

router.get("/analytics", getAnalytics);

export default router;
