import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 15;
    camera.position.y = 8;
    camera.rotation.x = -0.5;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // optimize performance
    mountRef.current.appendChild(renderer.domElement);

    // Create a terrain-like plane (low poly)
    const geometry = new THREE.PlaneGeometry(80, 40, 50, 25);
    
    // We need to modify vertices for the wave effect
    const count = geometry.attributes.position.count;
    
    // Material - elegant green wireframe for "agri" tech vibe
    const material = new THREE.MeshBasicMaterial({ 
      color: 0x16a34a, // matches primary green from design
      wireframe: true,
      transparent: true,
      opacity: 0.25
    });

    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    // Mouse interaction for parallax
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const windowHalfX = window.innerWidth / 2;
    const windowHalfY = window.innerHeight / 2;

    const onDocumentMouseMove = (event) => {
      mouseX = (event.clientX - windowHalfX) * 0.001;
      mouseY = (event.clientY - windowHalfY) * 0.001;
    };

    document.addEventListener('mousemove', onDocumentMouseMove);

    // Animation Loop
    let clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime() * 0.5; // speed of waves

      // Animate vertices to create rolling hills/waves
      const positions = geometry.attributes.position;
      for (let i = 0; i < count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        
        // Complex wave math for organic feel
        const z = 
          Math.sin(x * 0.2 + time) * 1.5 + 
          Math.cos(y * 0.2 + time) * 1.5 +
          Math.sin(x * 0.1 - time * 0.5) * 1.0;
          
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;

      // Subtle parallax camera movement based on mouse
      targetX = mouseX * 5;
      targetY = mouseY * 5;
      
      // Slowly rotate the entire terrain
      plane.rotation.z += 0.0005;
      
      camera.position.x += (targetX - camera.position.x) * 0.02;
      
      // Constrain camera Y to prevent looking under the plane
      const intendedY = 8 + (-targetY * 0.5);
      camera.position.y += (intendedY - camera.position.y) * 0.02; 
      
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onDocumentMouseMove);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 1, 
        pointerEvents: 'none',
        overflow: 'hidden'
      }} 
    />
  );
};

export default ThreeScene;
