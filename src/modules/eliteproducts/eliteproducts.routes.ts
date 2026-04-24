import { Router } from "express";
import { fetchEliteProducts } from "./eliteproducts.controller.js";

const router = Router();

router.get("/", fetchEliteProducts);

export default router;