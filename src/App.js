import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import DashboardPage from "containers/DashboardPage";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import JobPosting from "pages/JobPosting";
import MyCVPage from "containers/MyCVPage";
import UserProtectedRoute from "UserProtectedRoute";

const App = () => (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route path="/" element={<UserProtectedRoute/>}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="jobpostings" element={<JobPosting />} />
          <Route path="cv" element={<MyCVPage />} />
        </Route>
      </Routes>
    </Router>
);

export default App;
