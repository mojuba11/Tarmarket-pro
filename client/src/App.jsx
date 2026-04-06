import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './features/auth/Login';
import BoostDashboard from './pages/BoostDashboard';
import EarnDashboard from './pages/EarnDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard/boost" element={<BoostDashboard />} />
        <Route path="/dashboard/earn" element={<EarnDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;