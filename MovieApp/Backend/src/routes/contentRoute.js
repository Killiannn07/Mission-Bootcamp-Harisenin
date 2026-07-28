import { Router } from "express";
import *  as contentController from "../controllers/contentController.js";
import validate from "../middlewares/validationMiddleware.js";
import { createContentSchema } from "../validations/contentValidation.js";

const router = Router();

router.get("/", contentController.getAllMovie);
router.get("/:id", contentController.getMoviebyId);
router.post("/", validate(createContentSchema), contentController.createContent)
router.put("/:id", validate(createContentSchema), contentController.updateContent)
router.delete("/:id", contentController.deleteContent)

export default router;
