import { useEffect, useRef } from "react";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from 'dat.gui';

var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg";
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg";
var worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg";

export default function Landing() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;

    // RENDERER
    const renderer = new THREE.WebGLRenderer();
    renderer.shadowMap.enabled = true;
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // ESCENA
    const scene = new THREE.Scene();

    // CÁMARA
    const camera = new THREE.PerspectiveCamera(
      45,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(-10, 30, 30);
    scene.add(camera);

    // CONTROLES
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.update();

    // AXES
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // BOX
    const boxGeometry = new THREE.BoxGeometry();
    const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const box = new THREE.Mesh(boxGeometry, boxMaterial);
    scene.add(box);

    // PLANO
    const planeGeometry = new THREE.PlaneGeometry(30, 30);
    const planeMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
    });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -0.5 * Math.PI;
    plane.receiveShadow = true;
    scene.add(plane);

    // GRID
    const gridHelper = new THREE.GridHelper(30, 30);
    scene.add(gridHelper);

    // TEXTURAS
    const textureLoader = new THREE.TextureLoader();
    var texture = textureLoader.load(textureURL);
    var displacementMap = textureLoader.load(displacementURL);

    var material = new THREE.MeshPhongMaterial({
      color: 0xffffff,
      map: texture,
      displacementMap: displacementMap,
      displacementScale: 0.06,
      bumpMap: displacementMap,
      bumpScale: 0.04,
      reflectivity: 0,
      shininess: 0,
    });

    // SPHERE
    const sphereGeometry = new THREE.SphereGeometry(2, 60, 60);
    const sphere = new THREE.Mesh(sphereGeometry, material);
    sphere.position.set(-10, 10, 0);
    sphere.castShadow = true;
    scene.add(sphere);

    // LUCES
    const ambientLight = new THREE.AmbientLight(0x333333);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 50000);
    spotLight.position.set(-100, 100, 0);
    spotLight.castShadow = true;
    spotLight.angle = 0.2;
    scene.add(spotLight);

    const sLightHelper = new THREE.SpotLightHelper(spotLight);
    scene.add(sLightHelper);

    // FONDO
    scene.background = textureLoader.load(worldURL);

    // BOX2 con texturas
    const box2Geomtry = new THREE.BoxGeometry(4, 4, 4);
    const box2MultiMaterial = [
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
      new THREE.MeshBasicMaterial({ map: textureLoader.load(worldURL) }),
    ];
    const box2 = new THREE.Mesh(box2Geomtry, box2MultiMaterial);
    box2.position.set(0, 15, 10);
    box2.name = "theBox";
    scene.add(box2);

    // GUI
    const gui = new dat.GUI();
    const options = {
      sphereColor: "#ffea00",
      wireframe: false,
      speed: 0.01,
      angle: 0.2,
      penumbra: 0,
      intensity: 40000,
      rotation: 0.01,
    };

    gui.addColor(options, "sphereColor").onChange((e) => {
      sphere.material.color.set(e);
    });
    gui.add(options, "wireframe").onChange((e) => {
      sphere.material.wireframe = e;
    });
    gui.add(options, "speed", 0, 0.1);
    gui.add(options, "angle", 0, 1);
    gui.add(options, "penumbra", 0, 1);
    gui.add(options, "intensity", 0, 100000);
    gui.add(options, "rotation", 0, 1);

    // ANIMACIÓN
    let step = 0;
    function animate() {
      box.rotation.x += options.rotation;
      box.rotation.y += options.rotation;

      step += options.speed;
      sphere.position.y = 10 * Math.abs(Math.sin(step));

      spotLight.angle = options.angle;
      spotLight.penumbra = options.penumbra;
      spotLight.intensity = options.intensity;
      sLightHelper.update();

      renderer.render(scene, camera);
    }

    renderer.setAnimationLoop(animate);

    // CLEANUP
    return () => {
      currentMount.removeChild(renderer.domElement);
      renderer.dispose();
      gui.destroy();
    };
  }, [])

  return (
    <div 
      className="container3d"
      ref={mountRef}
      style={{ width: '100%', height: '100vh' }}
    >
      
    </div>
  )
}