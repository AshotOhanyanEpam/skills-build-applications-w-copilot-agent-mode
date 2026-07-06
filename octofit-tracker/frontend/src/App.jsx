import { NavLink, Route, Routes } from 'react-router-dom'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import './App.css'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

function App() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-10">
          <div className="card shadow-sm mb-4">
            <div className="card-body p-4">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-3">
                A modern multi-tier fitness experience for tracking activity, teams, and progress.
              </p>
              <div className="alert alert-info">
                API base: <code>{baseUrl}</code>
                <br />
                {codespaceName ? (
                  <span>Using Codespaces endpoint with <strong>VITE_CODESPACE_NAME</strong>.</span>
                ) : (
                  <span>
                    No <code>VITE_CODESPACE_NAME</code> defined; falling back to <code>http://localhost:8000</code>.
                  </span>
                )}
              </div>
            </div>
          </div>

          <nav className="nav nav-pills nav-fill mb-4">
            <NavLink to="/" className="nav-link" end>
              Home
            </NavLink>
            <NavLink to="/users" className="nav-link">
              Users
            </NavLink>
            <NavLink to="/activities" className="nav-link">
              Activities
            </NavLink>
            <NavLink to="/teams" className="nav-link">
              Teams
            </NavLink>
            <NavLink to="/leaderboard" className="nav-link">
              Leaderboard
            </NavLink>
            <NavLink to="/workouts" className="nav-link">
              Workouts
            </NavLink>
          </nav>

          <div className="card shadow-sm">
            <div className="card-body p-4">
              <Routes>
                <Route
                  path="/"
                  element={
                    <div>
                      <h2>Welcome to OctoFit Tracker</h2>
                      <p className="text-muted">
                        Navigate the app to view user profiles, activities, teams, leaderboard entries, and workouts.
                      </p>
                      <p className="mb-0">
                        Make sure <code>VITE_CODESPACE_NAME</code> is defined in <code>.env.local</code> if you want to use the GitHub Codespaces URL.
                      </p>
                    </div>
                  }
                />
                <Route path="/users" element={<Users />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/teams" element={<Teams />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/workouts" element={<Workouts />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
