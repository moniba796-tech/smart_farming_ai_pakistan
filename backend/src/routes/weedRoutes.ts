import { Router } from "express";
import { listWeeds, getWeed, listAllWeeds } from "../controllers/weedController";

const router = Router();

// GET /api/weeds              -> all weeds
// GET /api/weeds?crop=wheat   -> weeds common to that crop
router.get("/", listWeeds);

// GET /api/weeds/all (explicit alias, same as no query)
router.get("/all", listAllWeeds);

// GET /api/weeds/:key  (e.g. /api/weeds/phalaris_minor)
router.get("/:key", getWeed);

export default router;
