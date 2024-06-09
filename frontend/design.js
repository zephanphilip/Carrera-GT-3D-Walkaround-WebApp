let scene, camera, renderer;
let model;

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 7;
    camera.position.y = 1.7;
    camera.rotation.x = -0.5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Increase pixel ratio for better quality
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xffffff); // Set the background color to white
    document.getElementById("viewer-container1").appendChild(renderer.domElement);

    // Load and add your 3D model here
    const loader = new THREE.GLTFLoader();
    loader.load('design.glb', (glb) => {
        model = glb.scene;
        scene.add(model);
        // Set the position of the model after it's loaded and added to the scene
        model.position.set(0, 1.0, 0);
        model.rotation.set(0, 0, 0);
    });

    // Add lights (optional)
    const hemilight = new THREE.HemisphereLight(0xffeeb1, 0x080820, 4);
    scene.add(hemilight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.position.set(0, 0, 0);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff,8);
    directionalLight.position.set(2, 100, 5);
    scene.add(directionalLight);
    // scene.add(new THREE.AxesHelper(500));
}
// Create an animation loop
function animate() {
    requestAnimationFrame(animate);
     model.rotation.y += 0.001;
    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    // Update the camera aspect ratio based on the viewer-container size
camera.aspect = 800 / 300; // Use the dimensions you set for the container
camera.updateProjectionMatrix();
renderer.setSize(800, 300); // Use the dimensions you set for the container

});

// Start the app
init();
animate();