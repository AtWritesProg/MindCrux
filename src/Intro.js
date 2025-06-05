import React, { useEffect, useState } from 'react';
import './Intro.css'; 

const loadingTexts = [
  "Loading...",
  "Getting things ready...",
  "Almost done...",
  "Hang tight...",
];

export default function Intro({ onFinish }) {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loadingStarted, setLoadingStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);

  useEffect(() => {
    if (loadingStarted) {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            if (onFinish) onFinish();
            return 100;
          }
          return p + 2;
        });
        setLoadingTextIndex((i) => (i + 1) % loadingTexts.length);
      }, 100);

      return () => clearInterval(interval);
    }
  }, [loadingStarted, onFinish]);

  const handleEnter = () => {
    setShowWelcome(false);
    setLoadingStarted(true);
  };

  return (
    <div style={styles.container}>
      {showWelcome ? (
        <>
          <div className='intro-title-container'>
            <h1 className='intro-main-title'>MindCrux</h1>
          </div>
          <h1 style={styles.welcome}>Welcome To MindCrux<br/>Click To Enter.</h1>
          <button style={styles.enterButton} onClick={handleEnter}>Enter</button>
        </>
      ) : (
        <div style={styles.loadingContainer}>
          <div style={styles.progressBarBackground}>
            <div style={{ ...styles.progressBarFill, width: `${progress}%` }} />
          </div>
          <p style={styles.loadingText}>{loadingTexts[loadingTextIndex]}</p>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white',
    textAlign: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  welcome: {
    fontSize: '1.5rem',
    marginBottom: '40px',
    maxWidth: '600px',
    fontWeight: 'normal',
  },
  enterButton: {
    backgroundColor: '#00ffae',
    color: 'black',
    border: 'none',
    padding: '15px 30px',
    fontSize: '1.2rem',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
  },
  progressBarBackground: {
    width: '300px',
    height: '8px',
    backgroundColor: '#333',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00ffae',
    transition: 'width 0.1s ease',
  },
  loadingText: {
    fontSize: '1.1rem',
    color: '#ccc',
  },
};