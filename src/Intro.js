import React, { useEffect, useState } from 'react';

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
          <div className='container'>
            <h1 style={{ color: '#00ffae',
                fontSize: '100px',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: '20px' 

            }}>MindCrux</h1>
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
    height: '100vh',
    backgroundColor: '#121212',
    color: 'white',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: 20,
  },
  welcome: {
    fontSize: 24,
    textAlign: 'center',
    maxWidth: 400,
    marginBottom: 20,
  },
  enterButton: {
    padding: '10px 30px',
    fontSize: 18,
    borderRadius: 10,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: '#00ffae',
    color: 'black',
    fontWeight: 'bold',
    transition: 'background-color 0.3s',
  },
  loadingContainer: {
    width: 300,
    textAlign: 'center',
  },
  progressBarBackground: {
    width: '100%',
    height: 20,
    backgroundColor: '#2d2d2d',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#00ffae',
    borderRadius: 10,
    transition: 'width 0.1s linear',
  },
  loadingText: {
    fontSize: 16,
  },
};
