import { useEffect, useState } from 'react';
import { getApiBaseUrl, normalizeApiArray } from '../utils/api.js';

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = `${getApiBaseUrl()}/api/users`;

  useEffect(() => {
    setLoading(true);
    fetch(apiUrl)
      .then((res) => res.json())
      .then((payload) => setUsers(normalizeApiArray(payload, 'users')))
      .catch((err) => setError(err?.message ?? 'Failed to load users'))
      .finally(() => setLoading(false));
  }, [apiUrl]);

  return (
    <section>
      <h1 className="mb-4">Users</h1>
      <p className="text-muted">
        API endpoint: <code>{apiUrl}</code>
      </p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center py-5">Loading users…</div>
      ) : users.length === 0 ? (
        <div className="alert alert-warning">No users were returned from the API.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Fitness Goal</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id ?? user.email ?? user.name}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>{user.fitnessGoal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Users;
