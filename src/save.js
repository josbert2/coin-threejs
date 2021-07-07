import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { Sphere } from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
//Loading

const textureLoader = new THREE.TextureLoader()

//const normalTexture = textureLoader.load('/texture/NormalMap.png')
const normalTexture = textureLoader.load('https://free3dicon.com/wp-content/uploads/2021/06/binance_usd_perspective_matte_s-1-300x300.png.webp')
const sprite = new THREE.TextureLoader().load( '/texture/Daco_4267714.png' );


// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')


const scene = new THREE.Scene()


//const geometry = new THREE.SphereBufferGeometry(.5, 64, 64)
const geometry = new THREE.TorusBufferGeometry(.7, .2, 16, 100)


const particlesGeometry = new THREE.BufferGeometry
const particlesCnt = 4000

const posArray = new Float32Array(particlesCnt * 3)


for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 6
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3))



const material = new THREE.PointsMaterial({
    size: 0.001,
    transparent: true,
    alphaTest: 0.9,
    opacity: 0.9,
    
})


const materialParticles = new THREE.PointsMaterial({
    size: 0.006,
    map: sprite,
    //sizeAttenuation: true,
   // transparent: true,
    //blending: THREE.NormalBlending,
    //transparent: true,
    //alphaTest: 0.6,
    //opacity: 0.9,
    //depthWrite: false,
    //depthTest: false,
    color: 'white'
 
})



var loader = new THREE.GLTFLoader();

loader.crossOrigin = true;

loader.load( 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/39255/ladybug.gltf', function ( data ) {
    var object = data.scene;
     object.position.set(0, -10, -0.1);
    // object.scale.set(0.5,0.5,0.5);
    scene.add( object );
});


// Mesh
const sphere = new THREE.Points (geometry,material)
const particlesMesh = new THREE.Points(particlesGeometry, materialParticles)
scene.add(sphere, particlesMesh)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 6
pointLight.position.z = 4
scene.add(pointLight)
// LIGHT 2
const pointLight2 = new THREE.PointLight(0xff0000, 2)
pointLight2.position.set(1,1,1)
pointLight2.intensity = 0.21
scene.add(pointLight2)

const light1 = gui.addFolder('Light 1') 

light1.add(pointLight2.position, 'y').min(-3).max(3).step(0.01)
light1.add(pointLight2.position, 'x').min(-3).max(6).step(0.01)
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01)
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01)

/*const pointLightHelper = new THREE.PointLightHelper(pointLight2, 2)
scene.add(pointLightHelper) */


// LIGHT 3
const light2= gui.addFolder('Light 2') 

const pointLight3 = new THREE.PointLight(0x4a00ff, 2)
pointLight3.position.set(-2.31,-1.27,-1.78)
pointLight3.intensity = 0.49
scene.add(pointLight3)


light2.add(pointLight3.position, 'y').min(-3).max(3).step(0.01)
light2.add(pointLight3.position, 'x').min(-3).max(6).step(0.01)
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01)
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01)

const light2Color = {
    color: 0xff0000
}
light2.addColor(light2Color, 'color')
      .onChange(() => {
    pointLight3.color.set(light2Color.color)
})
/*const pointLightHelper2 = new THREE.PointLightHelper(pointLight3, 2)
scene.add(pointLightHelper2) */



/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor(new THREE.Color('#21282a'), 1)
// MOUSE
/**
 * Animate
 */



let mouseX = 0
let mouseY = 0


let targetX = 0
let targetY = 0

const windowHalfX = window.innerWidth / 2
const windowHalfY = window.innerHeight / 2

const onDocumentMouseMove = (event) => {
    mouseX = (event.clientX - windowHalfX)
    mouseY = (event.clientY - windowHalfY)
    
}

document.addEventListener('mousemove', onDocumentMouseMove)

const updateSphere = (event) => {
    sphere.position.y = window.scrollY * .001
}
window.addEventListener('scroll', updateSphere)

const clock = new THREE.Clock()




function animateParticles(event){
    mouseX = event.clientX
    mouseY = event.clientY
}

document.addEventListener('mousemove', animateParticles)

const tick = () =>
{
    targetX = mouseX - .0001
    targetY = mouseY - .0001
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    //sphere.rotation.y = .5 * elapsedTime

    //sphere.rotation.y += .00005 * (targetX - sphere.rotation.y)
    //sphere.rotation.x += .00005 * (targetY - sphere.rotation.x)
    //sphere.position.z += - .000005 * (targetY - sphere.rotation.x)

    particlesMesh.rotation.y = -.01 * elapsedTime
    sphere.rotation.y += .005 *  0.5
    sphere.rotation.x += .005 *  0.5
   
   
    if (mouseX > 0){
        //particlesMesh.rotation.y = mouseX * (elapsedTime * 0.000008)
        //particlesMesh.rotation.x = mouseY * (elapsedTime * 0.000008)
    }
    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()