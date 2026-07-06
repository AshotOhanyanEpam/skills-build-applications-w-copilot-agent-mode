import { Router } from 'express';
import { Workout } from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json({ message: 'Workouts endpoint', workouts });
  } catch (error) {
    res.status(500).json({ message: 'Failed to load workouts', error });
  }
});

export default router;
