import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiArray } from '../utils/api.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${getApiBaseUrl()}/api/leaderboard/`;
  // Example Codespaces endpoint: https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((payload) => setEntries(normalizeApiArray(payload, 'leaderboard')))
      .catch((err) => setError(err?.message ?? 'Failed to load leaderboard'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h1 className="mb-4">Leaderboard</h1>
      <p className="text-muted">
        API endpoint: <code>{apiUrl}</code>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading leaderboard…</div>
      ) : entries.length === 0 ? (
        <div className="alert alert-warning">No leaderboard entries were returned from the API.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>User</th>
                <th>Score</th>
                <th>Streak</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id ?? entry.userId}>
                  <td>{entry.userName}</td>
                  <td>{entry.score}</td>
                  <td>{entry.streak}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Leaderboard;
