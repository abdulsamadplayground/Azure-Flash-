import React, { useState, useRef } from 'react';

export function AnimationControls({ actions, animations }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef(null);

  const animationNames = Object.keys(actions || {});

  const handlePlay = () => {
    if (animationNames.length > 0) {
      const firstAnimation = animationNames[0];
      console.log('▶️ AnimationControls: Playing animation:', firstAnimation);
      
      // Start 3D animation
      actions[firstAnimation].reset().fadeIn(0.5).play();
      setIsPlaying(true);
      setShowVideo(true);
      
      // Start video when it's ready
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.play();
        }
      }, 100);
    }
  };

  const handleStop = () => {
    console.log('⏹️ AnimationControls: Stopping animation');
    
    // Stop 3D animation
    if (animationNames.length > 0) {
      const firstAnimation = animationNames[0];
      actions[firstAnimation].stop();
    }
    
    // Stop and reset video
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    
    setIsPlaying(false);
    setShowVideo(false);
  };

  const handleVideoEnded = () => {
    console.log('🎬 AnimationControls: Video ended');
    handleStop();
  };

  const handleCloseVideo = () => {
    handleStop();
  };

  if (animationNames.length === 0) {
    return null; // Don't show anything if no animations
  }

  return (
    <>
      <div style={styles.container}>
        <button 
          onClick={isPlaying ? handleStop : handlePlay} 
          style={{
            ...styles.button,
            backgroundColor: isPlaying ? '#f44336' : '#4CAF50',
          }}
        >
          {isPlaying ? '⏹️ Stop Animation' : '▶️ Play Animation'}
        </button>
      </div>

      {showVideo && (
        <div style={styles.modal} onClick={handleCloseVideo}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeButton} onClick={handleCloseVideo}>
              ✕
            </button>
            <video 
              ref={videoRef}
              controls 
              autoPlay 
              style={styles.video}
              src="/ModelAnimation.mp4"
              onEnded={handleVideoEnded}
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      )}
    </>
  );
}

const styles = {
  container: {
    position: 'absolute',
    bottom: '30px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000,
  },
  button: {
    padding: '15px 40px',
    fontSize: '16px',
    fontWeight: 'bold',
    backgroundColor: '#4CAF50',
    color: '#ffffff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    transition: 'all 0.3s',
  },
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000,
  },
  modalContent: {
    position: 'relative',
    maxWidth: '90%',
    maxHeight: '90%',
    backgroundColor: '#000',
    borderRadius: '12px',
    padding: '20px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#ff4444',
    color: '#fff',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.5)',
    zIndex: 2001,
  },
  video: {
    width: '100%',
    maxWidth: '1200px',
    height: 'auto',
    borderRadius: '8px',
  },
};
