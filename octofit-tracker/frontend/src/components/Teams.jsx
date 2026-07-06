import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiArray } from '../utils/api.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${getApiBaseUrl()}/api/teams/`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((payload) => setTeams(normalizeApiArray(payload, 'teams')))
      .catch((err) => setError(err?.message ?? 'Failed to load teams'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h1 className="mb-4">Teams</h1>
      <p className="text-muted">
        API endpoint: <code>{apiUrl}</code>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading teams…</div>
      ) : teams.length === 0 ? (
        <div className="alert alert-warning">No teams were returned from the API.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>City</th>
                <th>Members</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team) => (
                <tr key={team._id ?? team.name}>
                  <td>{team.name}</td>
                  <td>{team.city}</td>
                  <td>{Array.isArray(team.members) ? team.members.length : 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Teams;
