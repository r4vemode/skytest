import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './components/Search';
import UserDetail from './components/UserDetail';
import './styles/styles.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/user/:username" element={<UserDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
