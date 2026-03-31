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
import { FiEdit, FiTrash2, FiPlus, FiSettings, FiLogOut, FiBell } from 'react-icons/fi';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import Sidebar from "../components/Sidebar";

function Dashboard({ token, user, setToken, setUser }) {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const dropdownRef = useRef();
  const notifRef = useRef();
  const navigate = useNavigate();
  const [notifOpen, setNotifOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: '' });
  const [deleteUserId, setDeleteUserId] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Dummy statistics (later connect to API)
  const stats = {
    clients: 128,
    gstFilings: 42,
    audits: 19,
    pending: 5,
    revenue: "₹4.5L"
  };

  const notifications = [
    "GST Filing submitted for ABC Pvt Ltd",
    "Audit completed for XYZ Ltd",
    "New client registered",
    "ITR filing deadline approaching"
  ];

  const [unreadCount, setUnreadCount] = useState(notifications.length);

  const revenueData = [
    { month: "Jan", revenue: 20000, gst: 10, audit: 4 },
    { month: "Feb", revenue: 28000, gst: 15, audit: 6 },
    { month: "Mar", revenue: 35000, gst: 18, audit: 7 },
    { month: "Apr", revenue: 42000, gst: 20, audit: 9 },
    { month: "May", revenue: 50000, gst: 25, audit: 11 }
  ];

  const activities = [
    "ABC Pvt Ltd - GST Filed",
    "XYZ Ltd - Audit Started",
    "DEF Ltd - ITR Submitted",
    "GHI Ltd - Documents Uploaded"
  ];

  const deadlines = [
    "GST Return - 30 March",
    "ITR Filing - 10 April",
    "Audit Submission - 20 April"
  ];

  // Logout and profile dropdown logic

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
      if (notifRef.current && !notifRef.current.contains(event.target)) {
      setNotifOpen(false);
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
    // eslint-disable-next-line
  }, [token]);

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
      showToast(
        editingUser ? "User updated successfully" : "User added successfully",
        "success"
      );
    } catch (err) {
      alert(err.response?.data?.message || 'Error occurred');
    }
  };

  const handleDelete = (id) => {
    setDeleteUserId(id);
  };
  const confirmDelete = async () => {
    try {

      await axios.delete(`https://auth-dashboard-app-l1iq.onrender.com/api/users/${deleteUserId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchUsers();
      showToast("User deleted successfully", "danger");
    } catch (err) {
      showToast("Failed to delete user", "danger");
    }
    setDeleteUserId(null);
  };

  const toggleNotifications = () => {
    setNotifOpen(!notifOpen);

    if (!notifOpen) {
      setUnreadCount(0);
    }
  };

  return (
    <div className="dashboard-layout">
      <Sidebar />
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>{user ? `${user.name}'s Dashboard` : 'Dashboard'}</h1>
          <div className="header-right">

          {/* Notifications */}
          <div className="notifications" ref={notifRef}>
            <div className="bell" onClick={toggleNotifications}>
              <FiBell />
              {unreadCount > 0 && (
                <span className="badge">{unreadCount}</span>
              )}
            </div>

            {notifOpen && (
              <div className="notif-dropdown">
                {notifications.map((n, i) => (
                  <p key={i}>{n}</p>
                ))}
              </div>
            )}
          </div>

          {/* Profile */}
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
        </div>
      </header>

      USERS SECTION
      <div className="crud-header">
        <h2>All Users</h2>
        <button className="create-btn" onClick={() => openModal()}>
          <FiPlus /> Add User
        </button>
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
                <button className="edit-btn" onClick={() => openModal(u)}>
                  <FiEdit /> Edit
                </button>
                <button className="delete-btn" onClick={() => handleDelete(u.id)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="stats-cards">

        <div className="stat-card">
          <h4>Total Clients</h4>
          <p>{stats.clients}</p>
        </div>

        <div className="stat-card">
          <h4>Active GST Filings</h4>
          <p>{stats.gstFilings}</p>
        </div>

        <div className="stat-card">
          <h4>Completed Audits</h4>
          <p>{stats.audits}</p>
        </div>

        <div className="stat-card">
          <h4>Pending Tasks</h4>
          <p>{stats.pending}</p>
        </div>

        <div className="stat-card">
          <h4>Total Revenue</h4>
          <p>{stats.revenue}</p>
        </div>

      </div>

      <div className="chart-section">

        <h2>Business Performance</h2>

        <ResponsiveContainer width="100%" height={300}>

          <LineChart data={revenueData}>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis />

            <Tooltip />

            <Line type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={3} />

            <Line type="monotone" dataKey="gst" stroke="#10b981" strokeWidth={2} />

            <Line type="monotone" dataKey="audit" stroke="#f97316" strokeWidth={2} />

          </LineChart>

        </ResponsiveContainer>

      </div>

      {/* Activity + Deadlines */}
      <div className="dashboard-panels">

        <div className="panel">
          <h3>Recent Activity</h3>
          <ul>
            {activities.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </div>

        <div className="panel">
          <h3>Upcoming Deadlines</h3>
          <ul>
            {deadlines.map((d, i) => (
              <li key={i}>{d}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Modal remains same (your existing code) */}
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
      {deleteUserId && (
        <div className="modal-overlay">
          <div className="modal delete-modal">

            <h3>Delete User</h3>

            <p>Are you sure you want to delete this user?</p>

            <div className="modal-actions">
              <button
                className="delete-confirm-btn"
                onClick={confirmDelete}
              >
                Delete
              </button>

              <button
                className="cancel-btn"
                onClick={() => setDeleteUserId(null)}
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
      {toast.show && (
        <div className={`toast ${toast.type}`}>
          {toast.message}
        </div>
      )}
    </div>
    </div>
  );
}

export default Dashboard;