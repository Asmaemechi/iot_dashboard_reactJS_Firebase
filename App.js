/*  // src/App.js
import React, { useState } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
*/


// src/App.js
import React, { useState } from 'react';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import Register from './components/Register';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <>
      {currentPage === 'home' && <Home setCurrentPage={setCurrentPage} />}
      {currentPage === 'dashboard' && <Dashboard setCurrentPage={setCurrentPage} />}
      {currentPage === 'register' && <Register setCurrentPage={setCurrentPage} />}
    </>
  );
}

export default App;
