import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { Leaderboard } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Patel',
        email: 'ava@example.com',
        role: 'captain',
        fitnessGoal: 'Build endurance',
      },
      {
        name: 'Ben Carter',
        email: 'ben@example.com',
        role: 'member',
        fitnessGoal: 'Lose weight',
      },
      {
        name: 'Lina Gomez',
        email: 'lina@example.com',
        role: 'member',
        fitnessGoal: 'Increase strength',
      },
    ]);

    await Team.insertMany([
      {
        name: 'Code Ninjas',
        city: 'Seattle',
        members: users.map((user) => user.name),
      },
      {
        name: 'Peak Performers',
        city: 'Austin',
        members: [users[0].name, users[2].name],
      },
    ]);

    await Activity.insertMany([
      {
        userId: users[0]._id.toString(),
        type: 'run',
        durationMinutes: 35,
        calories: 420,
        date: new Date('2026-07-01'),
      },
      {
        userId: users[1]._id.toString(),
        type: 'cycle',
        durationMinutes: 45,
        calories: 500,
        date: new Date('2026-07-02'),
      },
      {
        userId: users[2]._id.toString(),
        type: 'strength',
        durationMinutes: 50,
        calories: 610,
        date: new Date('2026-07-03'),
      },
    ]);

    await Leaderboard.insertMany([
      {
        userId: users[0]._id.toString(),
        userName: users[0].name,
        score: 1250,
        streak: 7,
      },
      {
        userId: users[1]._id.toString(),
        userName: users[1].name,
        score: 1100,
        streak: 4,
      },
      {
        userId: users[2]._id.toString(),
        userName: users[2].name,
        score: 1320,
        streak: 8,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Morning HIIT',
        category: 'cardio',
        durationMinutes: 20,
        difficulty: 'intermediate',
      },
      {
        name: 'Core Stability',
        category: 'strength',
        durationMinutes: 30,
        difficulty: 'beginner',
      },
      {
        name: 'Long Run',
        category: 'endurance',
        durationMinutes: 60,
        difficulty: 'advanced',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
