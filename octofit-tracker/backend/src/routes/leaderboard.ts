import { Router } from 'express';
import { Leaderboard } from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await Leaderboard.find({}).lean();
    res.json({ message: 'Leaderboard endpoint', leaderboard });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load leaderboard', error });
  }
});

export default router;
