import { Router } from "express";
import * as contentController from "../controllers/contentController.js";
import validate from "../middlewares/validationMiddleware.js";
import { createContentSchema } from "../validations/contentValidation.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import roleMiddleware from "../middlewares/roleMiddleware.js";

const router = Router();

router.get("/", contentController.getAllMovie);
router.get("/:id", contentController.getMoviebyId);
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validate(createContentSchema),
  contentController.createContent,
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validate(createContentSchema),
  contentController.updateContent,
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  contentController.deleteContent,
);

export default router;
