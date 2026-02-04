import React, { useEffect } from 'react';
import * as THREE from 'three';

export function KeyboardControls({ controlsRef, initialPosition, initialTarget }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!controlsRef.current) return;

      const controls = controlsRef.current;
      const camera = controls.object;
      const moveSpeed = 5;

      // Get camera direction vectors
      const forward = camera.getWorldDirection(new THREE.Vector3());
      const right = new THREE.Vector3();
      right.crossVectors(forward, camera.up).normalize();

      switch(event.key.toLowerCase()) {
        case 'w':
        case 'arrowup':
          camera.position.addScaledVector(forward, moveSpeed);
          controls.target.addScaledVector(forward, moveSpeed);
          break;
        case 's':
        case 'arrowdown':
          camera.position.addScaledVector(forward, -moveSpeed);
          controls.target.addScaledVector(forward, -moveSpeed);
          break;
        case 'a':
        case 'arrowleft':
          camera.position.addScaledVector(right, -moveSpeed);
          controls.target.addScaledVector(right, -moveSpeed);
          break;
        case 'd':
        case 'arrowright':
          camera.position.addScaledVector(right, moveSpeed);
          controls.target.addScaledVector(right, moveSpeed);
          break;
        case 'q':
          camera.position.y += moveSpeed;
          controls.target.y += moveSpeed;
          break;
        case 'e':
          camera.position.y -= moveSpeed;
          controls.target.y -= moveSpeed;
          break;
      }

      controls.update();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [controlsRef]);

  const handleResetCamera = () => {
    if (!controlsRef.current) return;
    
    const controls = controlsRef.current;
    const camera = controls.object;
    
    camera.position.set(...initialPosition);
    controls.target.set(...initialTarget);
    controls.update();
  };

  return (
    <div style={styles.container}>
      <div style={styles.instructions}>
        <div style={styles.title}>🎮 Navigation Controls</div>
        <div style={styles.hint}>WASD / Arrow Keys - Move</div>
        <div style={styles.hint}>Q / E - Up / Down</div>
        <div style={styles.hint}>Mouse Drag - Rotate View</div>
        <div style={styles.hint}>Scroll - Zoom In/Out</div>
      </div>
      <button style={styles.resetButton} onClick={handleResetCamera}>
        🎯 Reset Camera
      </button>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: '15px',
    borderRadius: '10px',
    zIndex: 1000,
    color: '#fff',
    fontFamily: 'Arial, sans-serif',
    minWidth: '200px',
  },
  instructions: {
    marginBottom: '15px',
  },
  title: {
    fontSize: '16px',
    fontWeight: 'bold',
    marginBottom: '10px',
    textAlign: 'center',
  },
  hint: {
    fontSize: '12px',
    marginBottom: '5px',
    opacity: 0.9,
  },
  resetButton: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
};
