import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-sm">
            <div className="card-body p-5">
              <h1 className="display-6 fw-bold mb-3">OctoFit Tracker</h1>
              <p className="lead text-muted mb-4">
                A modern multi-tier fitness experience for tracking activity, teams, and progress.
              </p>
              <ul className="list-group list-group-flush mb-4">
                <li className="list-group-item">User profiles and authentication</li>
                <li className="list-group-item">Activity logging and leaderboards</li>
                <li className="list-group-item">Team management and workout suggestions</li>
              </ul>
              <a className="btn btn-primary" href="http://localhost:8000/health">
                Check API health
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
