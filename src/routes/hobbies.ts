import express from "express";
import { Request, Response, NextFunction } from "express";
import { body, param, validationResult } from "express-validator";

import controller from "../controllers/hobbies";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const hobbies = await controller.hobbies.findAll();
  return res.status(200).json(hobbies);
});

router.get(
  "/:id",
  param("id").isMongoId(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await controller.hobbies.findOne({ _id: req.params.id });
    return res.status(200).json(user);
  }
);

router.post(
  "/",
  body("name").isString().isLength({ min: 4, max: 30 }),
  body("user").isMongoId(),
  body("passionLevel").isString().isIn(["Low", "Medium", "High", "Very-High"]),
  body("year").isInt(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hobby = req.body;
    const hobbyObj = await controller.hobbies.save(hobby);
    const { _id } = hobbyObj;

    return res.status(200).json({ success: true, _id });
  }
);

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const hobby = await controller.hobbies.delete({ _id: req.params.id });
    return res.status(200).json({
      success: true,
      found: !!hobby,
    });
  }
);

router.put(
  "/:id",
  param("id").isMongoId(),
  body("passionLevel").isString().isIn(["Low", "Medium", "High", "Very-High"]),
  body("year").isInt(),
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const hobby = req.body;
    const updHobby = await controller.hobbies.update(
      { _id: req.params.id },
      hobby
    );
    return res.status(200).json({
      success: true,
      found: !!updHobby,
    });
  }
);

export = router;
