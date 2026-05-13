import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

function App() {
  return (
    <div className="app-shell min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar sticky-top shadow-sm">
        <div className="container">
          <span className="navbar-brand fw-semibold d-flex align-items-center gap-2">
            <span className="brand-mark">OF</span>
            <span>OctoFit Tracker</span>
          </span>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#octofit-nav"
            aria-controls="octofit-nav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="octofit-nav">
            <div className="navbar-nav ms-auto gap-lg-2 app-nav-links">
              <NavLink className="nav-link" to="/users">
                Users
              </NavLink>
              <NavLink className="nav-link" to="/teams">
                Teams
              </NavLink>
              <NavLink className="nav-link" to="/activities">
                Activities
              </NavLink>
              <NavLink className="nav-link" to="/leaderboard">
                Leaderboard
              </NavLink>
              <NavLink className="nav-link" to="/workouts">
                Workouts
              </NavLink>
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4 py-lg-5">
        <section className="card border-0 shadow-lg hero-card mb-4 mb-lg-5">
          <div className="card-body p-4 p-lg-5">
            <div className="row g-4 align-items-center">
              <div className="col-12 col-lg-8">
                <p className="text-uppercase fw-semibold small text-primary mb-2">Fitness Operations Dashboard</p>
                <h1 className="display-5 fw-bold mb-3">Track teams, workouts, and leaderboard momentum in one place.</h1>
                <p className="lead text-secondary mb-0">
                  Every screen now uses the same Bootstrap-first data layout so the app feels like a single product instead of isolated pages.
                </p>
              </div>
              <div className="col-12 col-lg-4">
                <div className="row g-3">
                  <div className="col-6 col-lg-12">
                    <div className="card stat-card h-100 border-0">
                      <div className="card-body">
                        <p className="text-muted text-uppercase small fw-semibold mb-2">Navigation</p>
                        <h2 className="h5 mb-0">Bootstrap navbar + cards</h2>
                      </div>
                    </div>
                  </div>
                  <div className="col-6 col-lg-12">
                    <div className="card stat-card h-100 border-0">
                      <div className="card-body">
                        <p className="text-muted text-uppercase small fw-semibold mb-2">Data Views</p>
                        <h2 className="h5 mb-0">Shared tables, forms, buttons, modals</h2>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
