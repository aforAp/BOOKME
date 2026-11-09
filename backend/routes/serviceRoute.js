import express from "express";
import { createServices, deleteService, listServices, updateService } from "../controllers/serviceController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, listServices);
router.post("/", auth, createServices);
router.patch("/:id", auth, updateService);
router.delete("/:id", auth, deleteService);

export default router;