import  { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import JobPosting from './pages/JobPosting'
import axios from "axios";

function App() {

  return (

  
  <div className="App">
   <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route 
            path="/jobpostings" 
            element={<JobPosting />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </div>
  );
};

export default App;
