import { Router } from 'express';
import { Team } from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find({}).lean();
    res.json({ message: 'Teams endpoint', teams });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load teams', error });
  }
});

export default router;
