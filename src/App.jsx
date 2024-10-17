import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Dashboard } from "./MyComponents/Dashboard";
import { LandingPage } from "./MyComponents/LandingPage";
import { MyProfile } from "./MyComponents/MyProfile";
import { UniverseStats } from "./MyComponents/UniverseStats";

function App() {

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/landing-page" element={<LandingPage />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/my-profile" element={<MyProfile />}></Route>
            <Route path='/universe-stats' element={<UniverseStats />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
