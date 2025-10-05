import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Landing = () => {
  const mountRef = useRef(null);
  const [isLaunching, setIsLaunching] = useState(false);

  useEffect(() => {
    // === ESCENA Y CÁMARA ===
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // === TEXTURAS ===
    const loader = new THREE.TextureLoader();
    const moonTexture = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg");
    const displacementMap = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg");
    const worldTexture = loader.load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg");

    // === LUNA ===
    const moonMaterial = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: moonTexture,
      displacementMap,
      displacementScale: 0.06,
      bumpMap: displacementMap,
      bumpScale: 0.04,
      reflectivity: 0,
      shininess: 0
    });
    const moon = new THREE.Mesh(new THREE.SphereGeometry(2, 100, 100), moonMaterial);
    moon.position.set(-2, 0, 0);
    moon.rotation.x = Math.PI * 0.02;
    moon.rotation.y = Math.PI * 1.54;
    scene.add(moon);

    // === LUCES ===
    const directionalLight = new THREE.DirectionalLight(0xffffff, 4);
    directionalLight.position.set(100, 10, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x404040, 4);
    scene.add(ambientLight);

    // === FONDO ===
    const world = new THREE.Mesh(
      new THREE.SphereGeometry(1000, 60, 60),
      new THREE.MeshBasicMaterial({ map: worldTexture, side: THREE.BackSide })
    );
    scene.add(world);

    // === COHETE ===
    const rocketGroup = new THREE.Group();
    const rocketBody = new THREE.Mesh(
      new THREE.CylinderGeometry(0.2, 0.2, 1.2, 32),
      new THREE.MeshStandardMaterial({ color: 0xaaaaaa, metalness: 0.7, roughness: 0.3 })
    );
    rocketGroup.add(rocketBody);
    rocketGroup.position.set(1.5, -0.5, 0);
    scene.add(rocketGroup);

    // === ANIMACIÓN ===
    let floatTime = 0;
    let launchProgress = 0;
    let rotatingMoon = true;

    const animate = () => {
      requestAnimationFrame(animate);

      if (rotatingMoon) {
        moon.rotation.y += 0.0009;
        world.rotation.y += 0.00005;
      }

      if (!isLaunching) {
        floatTime += 0.02;
        rocketGroup.position.y = 0.3 * Math.sin(floatTime);
        rocketGroup.rotation.y += 0.01;
      } else {
        launchProgress += 0.01;
        rocketGroup.position.y += 0.02;
        rocketGroup.position.z -= 0.2;
        rocketGroup.rotation.x -= 0.003;

        if (launchProgress > 4) {
          setIsLaunching(false);
          setTimeout(() => window.location.href = "https://www.nasa.gov/missions/", 800);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // === RESIZE ===
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
  window.removeEventListener("resize", handleResize);
  if (mountRef.current) {
    mountRef.current.removeChild(renderer.domElement);
    }
  };
  }, [isLaunching]);

  return (
    <>
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />
      <button
        className="floating-button"
        onClick={() => setIsLaunching(true)}
        disabled={isLaunching}
      >
        {isLaunching ? "🌌 Despegando..." : "🚀 Misiones Espaciales"}
      </button>
    </>
  );
};

export default Landing;
