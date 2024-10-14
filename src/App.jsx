import { useState } from "react";
import "./App.css";
import { Register } from "./MyComponents/Register";
import { CharacterCards } from "./MyComponents/CharacterCards";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Register />}></Route>
            <Route path="/dashboard" element={<CharacterCards />}></Route>
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
