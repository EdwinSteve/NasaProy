import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'dat.gui';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

import nebula from '../img/nasaNebulosa.jpg'
import stars from '../img/stars.jpg'
import moon from '../img/moon8k.jpg'
import nasaback from '../img/8kmilk.jpg'
import displacement from '../img/displacement.jpg'

var textureURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/lroc_color_poles_1k.jpg"; 
var displacementURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/ldem_3_8bit.jpg"; 
var worldURL = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/17271/hipp8_s.jpg"
var worldURL2 = "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=1211&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"

//const moon = new URL('../assets/moon.glb', import.meta.resolve.url)

const renderer = new THREE.WebGLRenderer();

renderer.shadowMap.enabled = true;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color: 0x00FF00})
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box)

const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xFFFFFF,
    side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true;

const gridHelper = new THREE.GridHelper(30, 30);
scene.add(gridHelper);

const textureLoader = new THREE.TextureLoader();
var texture = textureLoader.load(textureURL);
var displacementMap = textureLoader.load(displacementURL);

var material = new THREE.MeshPhongMaterial ( 
  { color: 0xffffff ,
  map: texture ,
     displacementMap: displacementMap,
  displacementScale: 0.06,
  bumpMap: displacementMap,
  bumpScale: 0.04,
   reflectivity:0, 
   shininess :0
  } 

);

const sphereGeometry = new THREE.SphereGeometry(2, 60, 60);
//const sphereMaterial = new THREE.MeshStandardMaterial({
    //color: 0x0000FF,
    //wireframe: false
//})
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

sphere.position.set(-10, 10, 0);
sphere.castShadow = true;

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

//const direcionalLight = new THREE.DirectionalLight(0xFFFFFF, 2);
//scene.add(direcionalLight);
//direcionalLight.position.set(120, 100, 0);
//direcionalLight.castShadow = true;
//direcionalLight.shadow.camera.bottom = 40;

//const dLightHelper = new THREE.DirectionalLightHelper(direcionalLight, 5);
//scene.add(dLightHelper);

//const dLightShadowHelper = new THREE.CameraHelper(direcionalLight.shadow.camera);
//scene.add(dLightShadowHelper);

const spotLight = new THREE.SpotLight(0xFFFFFF, 50000);
scene.add(spotLight);
spotLight.position.set(-100, 100, 0);
spotLight.castShadow = true;
spotLight.angle = 0.2;

const sLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(sLightHelper);

//scene.fog = new THREE.Fog(0xFFFFFF, 0, 200);
//scene.fog = new THREE.FogExp2(0xFFFFFF, 0.01);

//renderer.setClearColor(0xFFEA00);




scene.background = textureLoader.load(worldURL);

const cubeTextureLoader = new THREE.CubeTextureLoader();
//scene.background = cubeTextureLoader.load([
    //worldURL2,
    //worldURL2,
    //worldURL,
    //worldURL,
    //worldURL,
    //worldURL
//]);

const box2Geomtry = new THREE.BoxGeometry(4,4,4);
//const box2Material = new THREE.MeshBasicMaterial({
    //color: 0x00FF00,
    //map: textureLoader.load(worldURL)
//});

const box2MultiMaterial = [
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)}),
    new THREE.MeshBasicMaterial({map: textureLoader.load(worldURL)})
]

const box2 = new THREE.Mesh(box2Geomtry, box2MultiMaterial);

scene.add(box2);
box2.position.set(0, 15, 10);

const plane2Geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
const plane2Material = new THREE.MeshBasicMaterial({
    color: 0xFFFFFF,
    wireframe: true
});

const plane2 = new THREE.Mesh(plane2Geometry, plane2Material);
scene.add(plane2);
plane2.position.set(10, 10, 15);

//plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
//plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
//plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
//const lastPointZ = plane2.geometry.attributes.position.array.length - 1;
//plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();

const sphere2Geometry = new THREE.SphereGeometry(4);

//const vShader = `
//    void main() {
//        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
//    }
//`;

//const fShader = `
    //void main() {
        //gl_FragColor = vec4(0.5, 0.5, 1.0, 1.0);
    //}
//`;

const sphere2Material = new THREE.ShaderMaterial({
    //vertexShader: document.getElementById("vertexShader").textContent,
    //fragmentShader: document.getElementById("vertexShader").textContent
})
const sphere2 = new THREE.Mesh(sphere2Geometry, sphere2Material);
scene.add(sphere2);
sphere2.position.set(-5, 10, 10);

const gui = new dat.GUI();

const options = {
    sphereColor: '#ffea00',
    wireframe: false,
    speed: 0.01,
    angle: 0.2,
    penumbra: 0,
    intensity: 40000,
    rotation: 0.01

};

gui.addColor(options, 'sphereColor').onChange(function(e){
    sphere.material.color.set(e);
});

gui.add(options, 'wireframe').onChange(function(e){
    sphere.material.wireframe = e;
});

gui.add(options, 'speed', 0, 0.1);
gui.add(options, 'angle', 0, 1);
gui.add(options, 'penumbra', 0, 1);
gui.add(options, 'intensity', 0, 100000);
gui.add(options, 'rotation', 0, 1);

let step = 0;

const mousePosition = new THREE.Vector2();

window.addEventListener('mousemove', function(e){
    mousePosition.x = (e.clientX / window.innerWidth) * 2 - 1;
    mousePosition.y = - (e.clientY / window.innerHeight) * 2 + 1;
});

const rayCaster = new THREE.Raycaster();

const sphereId = sphere.id;
box2.name = 'theBox';

function animate() {    
    box.rotation.x += options.rotation;
    box.rotation.y += options.rotation;    

    step += options.speed;
    sphere.position.y = 10 * Math.abs(Math.sin(step));

    spotLight.angle = options.angle;
    spotLight.penumbra = options.penumbra;
    spotLight.intensity = options.intensity;
    sLightHelper.update();

    rayCaster.setFromCamera(mousePosition, camera);
    const intersects = rayCaster.intersectObjects(scene.children);
    console.log(intersects);

    for (let i = 0; i < intersects.length; i++){
        if(intersects[i].object.id === sphereId){
            intersects[i].object.material.color.set(0xFF0000);
        }

        if (intersects[i].object.name == 'theBox'){
            box2.rotation.x += 0.01;
            box2.rotation.y += 0.01;
        }
    }

    //plane2.geometry.attributes.position.array[0] -= 10 * Math.random();
    //plane2.geometry.attributes.position.array[1] -= 10 * Math.random();
    //plane2.geometry.attributes.position.array[2] -= 10 * Math.random();
    //plane2.geometry.attributes.position.array[lastPointZ] -= 10 * Math.random();
    //plane2.geometry.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);