import { useEffect, useState } from 'react';
import '../App.css'

const SplashScreen = ({ onAnimationEnd }:{ onAnimationEnd: () => void }) => {

  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 100) return prev + 1;
        return prev;
      });
    }, 30); // Will take 3 seconds to reach 100%

    const timer = setTimeout(() => {
      setIsClosing(true);
    }, 2500);

    const unmountTimer = setTimeout(() => {
      onAnimationEnd();
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
      clearTimeout(unmountTimer);
    };
  }, [onAnimationEnd]);

  return (
    <div className={`splash-screen ${isClosing ? 'fade-out' : ''}`}>
      <div className="fade-in-out">
        <h2>  <span/> Under Development</h2>
        <div className="loading-bar-container">
          <div 
            className="loading-bar" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;