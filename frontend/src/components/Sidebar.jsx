import { NavLink } from "react-router-dom";
import {
  FiUsers,
  FiFileText,
  FiBarChart2,
  FiClipboard,
  FiMenu
} from "react-icons/fi";
import { useState } from "react";
import "./styles/Sidebar.scss";

function Sidebar() {

  const [collapsed, setCollapsed] = useState(true);

  return (
    <div className={`sidebar ${collapsed ? "collapsed" : ""}`}>

      <div className="sidebar-header">
        {/* <h2>Admin</h2> */}
        <button
          className="collapse-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <FiMenu />
        </button>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/dashboard">
          <FiBarChart2 />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/clients">
          <FiUsers />
          <span>Clients</span>
        </NavLink>

        <NavLink to="/gst">
          <FiFileText />
          <span>GST Filings</span>
        </NavLink>

        <NavLink to="/audit">
          <FiClipboard />
          <span>Audits</span>
        </NavLink>

        <NavLink to="/reports">
          <FiBarChart2 />
          <span>Reports</span>
        </NavLink>

      </nav>

    </div>
  );
}

export default Sidebar;