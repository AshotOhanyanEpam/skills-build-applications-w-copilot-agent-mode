import express from 'express';
import './config/database';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, '0.0.0.0', () => {
  console.log(`OctoFit backend listening on port ${port}`);
});
