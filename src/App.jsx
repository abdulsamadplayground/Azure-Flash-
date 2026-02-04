import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Model } from './Model';
import { AnimationControls } from './AnimationControls';
import { KeyboardControls } from './VirtualKeypad';
import * as THREE from 'three';

console.log('📱 App.jsx: Component loaded');

function LoadingFallback() {
  console.log('⏳ App.jsx: Loading fallback displayed');
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function ModelWithControls({ onAnimationsLoaded }) {
  return <Model onAnimationsLoaded={onAnimationsLoaded} />;
}

function App() {
  console.log('🎨 App.jsx: App component rendering');
  const [animationData, setAnimationData] = useState(null);
  const [modelLoaded, setModelLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const controlsRef = useRef();
  
  // Camera settings centered on the animated character
  const initialCameraPosition = [-62, 10, 45];
  const initialCameraTarget = [-62, 5, 25];

  const handleAnimationsLoaded = (actions, animations) => {
    console.log('📡 App.jsx: Model fully loaded with animations');
    setAnimationData({ actions, animations });
    setModelLoaded(true);
    // Small delay to ensure rendering is complete
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Loading Overlay */}
      {isLoading && (
        <div style={loadingStyles.overlay}>
          <div style={loadingStyles.container}>
            <div style={loadingStyles.spinner}></div>
            <div style={loadingStyles.text}>Loading 3D Model...</div>
            <div style={loadingStyles.subtext}>Please wait while we render the scene</div>
          </div>
        </div>
      )}

      <Canvas
        camera={{ 
          position: initialCameraPosition, 
          fov: 60,
          near: 0.1,
          far: 1000
        }}
        onCreated={({ camera }) => {
          console.log('✅ App.jsx: Canvas created successfully');
          camera.lookAt(...initialCameraTarget);
        }}
      >
        <color attach="background" args={['#1a1a1a']} />
        
        <ambientLight intensity={0.6} />
        <directionalLight position={[-50, 20, 30]} intensity={1.2} />
        <directionalLight position={[50, 20, -30]} intensity={0.5} />
        
        <Suspense fallback={<LoadingFallback />}>
          <ModelWithControls onAnimationsLoaded={handleAnimationsLoaded} />
        </Suspense>
        
        <OrbitControls 
          ref={controlsRef}
          target={initialCameraTarget}
          enableDamping
          dampingFactor={0.05}
          minDistance={5}
          maxDistance={200}
          maxPolarAngle={Math.PI / 1.5}
          onStart={() => console.log('🎮 App.jsx: OrbitControls started')}
        />
        
        <Environment preset="sunset" />
      </Canvas>

      {!isLoading && (
        <>
          <KeyboardControls 
            controlsRef={controlsRef} 
            initialPosition={initialCameraPosition}
            initialTarget={initialCameraTarget}
          />

          {modelLoaded && animationData && (
            <AnimationControls 
              actions={animationData.actions} 
              animations={animationData.animations} 
            />
          )}
        </>
      )}
    </div>
  );
}

const loadingStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.95)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    animation: 'fadeIn 0.3s ease-in',
  },
  container: {
    textAlign: 'center',
    color: '#fff',
    animation: 'fadeIn 0.5s ease-in',
  },
  spinner: {
    width: '60px',
    height: '60px',
    margin: '0 auto 20px',
    border: '4px solid rgba(255, 255, 255, 0.1)',
    borderTop: '4px solid #4CAF50',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
  text: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
    fontFamily: 'Arial, sans-serif',
    animation: 'pulse 2s ease-in-out infinite',
  },
  subtext: {
    fontSize: '14px',
    opacity: 0.7,
    fontFamily: 'Arial, sans-serif',
  },
};

export default App;
