import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiArray } from '../utils/api.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${getApiBaseUrl()}/api/activities/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((payload) => setActivities(normalizeApiArray(payload, 'activities')))
      .catch((err) => setError(err?.message ?? 'Failed to load activities'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h1 className="mb-4">Activities</h1>
      <p className="text-muted">
        API endpoint: <code>{apiUrl}</code>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading activities…</div>
      ) : activities.length === 0 ? (
        <div className="alert alert-warning">No activities were returned from the API.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped align-middle">
            <thead>
              <tr>
                <th>Type</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id ?? `${activity.userId}-${activity.date}`}>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes} min</td>
                  <td>{activity.calories}</td>
                  <td>{new Date(activity.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Activities;
