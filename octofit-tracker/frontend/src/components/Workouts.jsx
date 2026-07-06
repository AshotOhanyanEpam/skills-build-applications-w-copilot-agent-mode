import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiArray } from '../utils/api.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${getApiBaseUrl()}/api/workouts/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((payload) => setWorkouts(normalizeApiArray(payload, 'workouts')))
      .catch((err) => setError(err?.message ?? 'Failed to load workouts'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h1 className="mb-4">Workouts</h1>
      <p className="text-muted">
        API endpoint: <code>{apiUrl}</code>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading workouts…</div>
      ) : workouts.length === 0 ? (
        <div className="alert alert-warning">No workouts were returned from the API.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Duration</th>
                <th>Difficulty</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout) => (
                <tr key={workout._id ?? workout.name}>
                  <td>{workout.name}</td>
                  <td>{workout.category}</td>
                  <td>{workout.durationMinutes} min</td>
                  <td>{workout.difficulty}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Workouts;
