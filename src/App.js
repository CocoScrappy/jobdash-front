import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import DashboardPage from "containers/DashboardPage";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import JobPosting from "containers/JobPosting";
import JobApplications from "containers/JobApplicationListingPage";
import JobApplicationForm from "components/JobApplicationForms/JobApplicationForm";
import ExternalJobApplicationForm from "components/JobApplicationForms/ExternalJobApplicationForm";
import MyCVPage from "containers/MyCVPage";
import AllApplicationsForPosting from "containers/AllApplicationsForPosting";
import UserProtectedRoute from "UserProtectedRoute";
import JobApplicationInfoPage from "containers/JobApplicationInfoPage";
import Error from "containers/Errors/ErrorPage";
// import SavedDateInfoPage from "containers/SavedDateInfoPage";
// CSS
import "./css/App.css";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
          path="/error/:errorCode"
          element={<Error />}
        />

      <Route path="/" element={<UserProtectedRoute />}>
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="jobpostings" element={<JobPosting />} />
        <Route
          path="/jobapplications/application/:appId"
          element={<JobApplicationInfoPage />}
        />
        {/* <Route
          path="/jobapplications/application/saved-date/:dateId"
          element={<SavedDateInfoPage />}
        /> */}
        <Route path="/jobapplications" element={<JobApplications />} />
        <Route path="/jobapplicationform" element={<JobApplicationForm />} />
        <Route
          path="/externaljobapplicationform"
          element={<ExternalJobApplicationForm />}
        />
        <Route path="cv" element={<MyCVPage />} />

        {/* employer only routes */}
        <Route
          path="/applicationForPosting"
          element={<AllApplicationsForPosting />}
        />
      </Route>
    </Routes>
  </Router>
);

export default App;
