// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import './styles/Dashboard.scss';
// import { useNavigate } from 'react-router-dom';


// function Dashboard({ token, user, setToken, setUser  }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     navigate('/login'); // redirect after logout
//   };

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/users', {
//       headers: { Authorization: `Bearer ${token}` }
//     })
//     .then(res => {
//       setUsers(res.data);
//       setLoading(false);
//     })
//     .catch(() => {
//       setToken(null);
//       localStorage.removeItem('token');
//     });
//   }, [token, setToken]);

//   return (
//     <div className="dashboard">
//       <header>
//         <h1>{user ? `${user.name}'s Dashboard` : 'User Dashboard'}</h1>
//         <button onClick={handleLogout}>Logout</button>
//       </header>

//       <h2>All Users</h2>

//       {loading ? <p>Loading users...</p> : (
//         <table>
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Registered On</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{new Date(user.created_at).toLocaleDateString()}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// }

// export default Dashboard;


// import { useState, useEffect,  useRef } from 'react';
// import axios from 'axios';
// import './styles/Dashboard.scss';
// import { useNavigate } from 'react-router-dom';

// function Dashboard({ token, user, setToken, setUser }) {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const navigate = useNavigate();
//   const dropdownRef = useRef();

//   const handleLogout = () => {
//     setToken(null);
//     setUser(null);
//     localStorage.removeItem('user');
//     localStorage.removeItem('token');
//     navigate('/login');
//   };

//   const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

//   const handleSettings = () => {
//     alert('Settings page coming soon!');
//     setDropdownOpen(false);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/users', {
//       headers: { Authorization: `Bearer ${token}` },
//     })
//     .then(res => {
//       setUsers(res.data);
//       setLoading(false);
//     })
//     .catch(() => {
//       setToken(null);
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       navigate('/login');
//     });
//   }, [token, setToken, navigate, setUser]);

//   return (
//     <div className="dashboard">
//       <header className="dashboard-header">
//         <h1>{user ? `${user.name}'s Dashboard` : 'Dashboard'}</h1>
//         <div className="profile" ref={dropdownRef}>
//           <div className="profile-btn" onClick={toggleDropdown}>
//             <div className="avatar">{user?.name[0]}</div>
//             {/* <span className="username">{user?.name}</span> */}
//           </div>
//           {dropdownOpen && (
//             <div className="dropdown-menu">
//               <button onClick={handleSettings}>Settings</button>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           )}
//         </div>
//       </header>

//       <h2>All Users</h2>

//       {loading ? (
//         <p className="loading">Loading users...</p>
//       ) : (
//         <div className="user-grid">
//           {users.map(u => (
//             <div key={u.id} className="user-card">
//               <div className="avatar">{u.name[0]}</div>
//               <div className="user-info">
//                 <h3>{u.name}</h3>
//                 <p>{u.email}</p>
//                 <span>Joined: {new Date(u.created_at).toLocaleDateString()}</span>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './styles/Dashboard.scss';
import { useNavigate } from 'react-router-dom';
import { FiEdit, FiTrash2, FiPlus, FiSettings, FiLogOut } from 'react-icons/fi';

function Dashboard({ token, user, setToken, setUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // Profile dropdown
  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const handleSettings = () => {
    alert('Settings page coming soon!');
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://auth-dashboard-app-l1iq.onrender.com/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [token, setToken, navigate, setUser]);

  // Handle form change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Open modal for create or edit
  const openModal = (user = null) => {
    setEditingUser(user);
    if (user) setForm({ name: user.name, email: user.email, password: '' });
    else setForm({ name: '', email: '', password: '' });
    setModalOpen(true);
  };

  const closeModal = () => {
    setEditingUser(null);
    setModalOpen(false);
  };

  // Create or update user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        // Update user
        await axios.put(`https://auth-dashboard-app-l1iq.onrender.com/api/users/${editingUser.id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        // Create user
        await axios.post('https://auth-dashboard-app-l1iq.onrender.com/api/users', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      closeModal();
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  // Delete user
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`https://auth-dashboard-app-l1iq.onrender.com/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchUsers();
      } catch (err) {
        alert(err.response?.data?.message || 'Error occurred');
      }
    }
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{user ? `${user.name}'s Dashboard` : 'Dashboard'}</h1>
        <div className="profile" ref={dropdownRef}>
          <div className="profile-btn" onClick={toggleDropdown}>
            <div className="avatar">{user?.name[0]}</div>
          </div>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button onClick={handleSettings}><FiSettings />Settings</button>
              <button onClick={handleLogout} className="logout-btn"><FiLogOut />Logout</button>
            </div>
          )}
        </div>
      </header>

      <div className="crud-header">
        <h2>All Users</h2>
        <button className="create-btn" onClick={() => openModal()}><FiPlus />Add User</button>
      </div>

      {loading ? (
        <p className="loading">Loading users...</p>
      ) : (
        <div className="user-grid">
          {users.map(u => (
            <div key={u.id} className="user-card">
              <div className="avatar">{u.name[0]}</div>
              <div className="user-info">
                <h3>{u.name}</h3>
                <p>{u.email}</p>
                <span>Joined: {new Date(u.created_at).toLocaleDateString()}</span>
              </div>
              <div className="card-actions">
                <button className="edit-btn" onClick={() => openModal(u)}><FiEdit />Edit</button>
                <button className="delete-btn" onClick={() => handleDelete(u.id)}><FiTrash2 />Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>{editingUser ? 'Edit User' : 'Add User'}</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                type="password"
                name="password"
                placeholder={editingUser ? 'Leave blank to keep password' : 'Password'}
                value={form.password}
                onChange={handleChange}
                required={!editingUser}
              />
              <div className="modal-actions">
                <button type="submit" className="save-btn">Save</button>
                <button type="button" onClick={closeModal} className="cancel-btn">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;