import { Router } from 'express';
import { Activity } from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find({}).lean();
    res.json({ message: 'Activities endpoint', activities });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load activities', error });
  }
});

export default router;
