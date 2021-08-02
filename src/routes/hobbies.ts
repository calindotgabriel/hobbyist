import express from "express";
import { Request, Response, NextFunction } from "express";
import controller from "../controllers/hobbies";

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  const hobbies = await controller.hobbies.findAll();
  return res.status(200).json(hobbies);
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const user = await controller.hobbies.findOne({_id: req.params.id});
    return res.status(200).json(user);
});

router.post('/', async (req: Request, res: Response, next: NextFunction) => {
  const { hobby } = req.body;
  const hobbyObj = await controller.hobbies.save(hobby);

  return res.status(200).json({ success: true });
});


router.delete('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const hobby = await controller.hobbies.delete({_id: req.params.id});
    return res.status(200).json({
        success: true,
        found: !!hobby,
    });
});

router.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { hobby } = req.body;
    const updHobby = await controller.hobbies.update({_id: req.params.id}, hobby);
    return res.status(200).json({
        success: true,
        found: !!updHobby,
    });
});

export = router;
