import express from "express";
import { Request, Response, NextFunction } from "express";
import {
  body,
  CustomSanitizer,
  param,
  validationResult,
} from "express-validator";
import controller from "../controllers/users";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const users = await controller.users.findAll();
  return res.status(200).json(users);
});

router.get(
  "/:id",
  param("id").isMongoId(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await controller.users.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  }
);

router.post(
  "/",
  body("name").isString().isLength({ min: 4 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.body;
    const userObj = await controller.users.save(user);
    return res.status(200).json({ userObj, success: true });
  }
);

router.delete(
  "/:id",
  param("id").isMongoId(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = await controller.users.delete({ _id: req.params.id });
    return res.status(200).json({
      success: true,
    });
  }
);

router.put(
  "/:id",
  param("id").isMongoId(),
  body("name").isString().isLength({ min: 4 }),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const user = req.body;
    const updUser = await controller.users.update({ _id: req.params.id }, user);
    return res.status(200).json({
      success: true,
    });
  }
);

export = router;
