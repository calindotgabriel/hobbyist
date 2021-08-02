import express from "express";
import { Request, Response, NextFunction } from "express";
import controller from "../controllers/users";

const router = express.Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const users = await controller.users.findAll();
  return res.status(200).json(users);
});

router.get("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const user = await controller.users.findOne({ _id: req.params.id });
  return res.status(200).json(user);
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  const userObj = await controller.users.save(user);

  return res.status(200).json({ userObj, success: true });
});

router.delete(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await controller.users.delete({ _id: req.params.id });
    return res.status(200).json({
    //   ...user,
      success: true,
    });
  }
);

router.put("/:id", async (req: Request, res: Response, next: NextFunction) => {
  const { user } = req.body;
  // console.log({user});
  const updUser = await controller.users.update({ _id: req.params.id }, user);
  return res.status(200).json({
    // ...updUser,
    success: true,
  });
});

export = router;
