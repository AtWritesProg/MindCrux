import React from 'react';
import './SideBar.css'; 
import './App.css'; 

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      {/* Close button for mobile */}
      <button className="sidebar-close-btn" onClick={onClose}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      <h2 className="sidebar-title">MindCrux</h2>
      <ul className="sidebar-list">
        <li>New Chat</li>
        <li>History</li>
        <li>Settings</li>
        <li className="coming-soon">
          <h3>Coming Soon!<br />Stay Tuned.</h3>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;