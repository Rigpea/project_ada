import React from 'react';
import HomePage from './pages/HomePage/HomePage';
import { BrowserRouter as Router } from 'react-router-dom';
import Headers from './components/Headers/Headers';
import { Routes, Route } from 'react-router-dom';


function App() {
  return (
    <Router>
      <div className="App">
        <Headers />
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
