// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) localStorage.setItem('token', token);
//   }, [token]);

//   return (
//     <div className="app">
//       {!token ? (
//         <Login setToken={setToken} />
//       ) : (
//         <Dashboard token={token} setToken={setToken} />
//       )}
//     </div>
//   );
// }

// export default App;

// import { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import Dashboard from './components/Dashboard';

// function App() {
//   const [token, setToken] = useState(localStorage.getItem('token'));

//   useEffect(() => {
//     if (token) localStorage.setItem('token', token);
//   }, [token]);

//   return (
//     <Router>
//       <Routes>
//         {/* Redirect to dashboard if logged in */}
//         <Route 
//           path="/login" 
//           element={!token ? <Login setToken={setToken} /> : <Navigate to="/dashboard" />} 
//         />

//         {/* Protect dashboard route */}
//         <Route 
//           path="/dashboard" 
//           element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />} 
//         />

//         {/* Default route */}
//         <Route 
//           path="/" 
//           element={<Navigate to={token ? "/dashboard" : "/login"} />} 
//         />

//         {/* Optional: catch-all 404 */}
//         <Route path="*" element={<h2>Page Not Found</h2>} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  useEffect(() => {
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');

    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  }, [token, user]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!token ? <Login setToken={setToken} setUser={setUser} /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/dashboard" 
          element={token ? <Dashboard token={token} user={user} setToken={setToken} setUser={setUser} /> : <Navigate to="/login" />} 
        />
        <Route path="/" element={<Navigate to={token ? "/dashboard" : "/login"} />} />
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;