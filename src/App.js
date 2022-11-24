//import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "containers/HomePage";
import DashboardPage from "containers/DashboardPage";
import LoginPage from "containers/LoginPage";
import RegisterPage from "containers/RegisterPage";
import JobPosting from "pages/JobPosting";
import MyCVPage from "containers/MyCVPage";

import { store } from "store";

const App = () => (
  <Provider store={store}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/jobpostings" element={<JobPosting />} />
        <Route path="/cv" element={<MyCVPage />} />
      </Routes>
    </HashRouter>
  </Provider>
);

export default App;
