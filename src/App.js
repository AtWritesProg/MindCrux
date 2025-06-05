import React, { useState } from 'react';
import Sidebar from './Sidebar';
import './App.css';
import Intro from './Intro';
import axios from 'axios';

function App() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [showIntro, setShowIntro] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (showIntro) {
    return <Intro onFinish={() => setShowIntro(false)} />;
  }

  const handleSummarize = async () => {
    if (!text.trim()) return;
  
    setLoading(true);
    setSummary(''); // Clear the summary before fetching
  
    try {
      // Log request details
      console.log('Sending POST request with text:', text);
      
      // Update the API endpoint URL to match your backend
      const response = await axios.post('https://mindcrux-backend.onrender.com', { text });

      console.log('Received response:', response);

      // Set the summary from the backend response
      setSummary(response.data.summary);
      
      // Clear the input text after summary is set
      setText('');
    } catch (error) {
      console.error('Error occurred during summarization:', error);
      
      // Set the summary to an error message
      setSummary('Error summarizing.');
    }
  
    setLoading(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="app">
      {/* Mobile hamburger menu button */}
      <button className="mobile-menu-btn" onClick={toggleSidebar}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12H21M3 6H21M3 18H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {/* Sidebar overlay for mobile */}
      <div 
        className={`sidebar-overlay ${sidebarOpen ? 'active' : ''}`}
        onClick={closeSidebar}
      ></div>

      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      <div className="main">
        <div className="chat-box">
          {text && <div className="message user"><p>{text}</p></div>}
          {loading && <div className="message bot"><p>Summarizing...</p></div>}
          {summary && <div className="message bot"><p>{summary}</p></div>}
        </div>

        <div className="input-area">
          <div className="messageBox">
            <div className="fileUploadWrapper">
              <label htmlFor="file">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 337 337">
                  <circle strokeWidth="20" stroke="#6c6c6c" fill="none" r="158.5" cy="168.5" cx="168.5"></circle>
                  <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M167.759 79V259"></path>
                  <path strokeLinecap="round" strokeWidth="25" stroke="#6c6c6c" d="M79 167.138H259"></path>
                </svg>
                <span className="tooltip">Add an image</span>
              </label>
              <input disabled type="file" id="file" name="file" />
            </div>
            <input
              required
              placeholder="Message..."
              type="text"
              id="messageInput"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSummarize()}
            />
            <button id="sendButton" onClick={handleSummarize}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 664 663">
                <path fill="none" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
                <path strokeLinejoin="round" strokeLinecap="round" strokeWidth="33.67" stroke="#6c6c6c" d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;