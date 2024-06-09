let scene, camera, renderer;
let model;
let mouseX = 0;
let mouseY = 0;
let isDragging = false;

// Define the camera movement speed
const moveSpeed = 2;

// Define the camera rotation speed
const rotateSpeed = 0.005;

// Define the maximum up and down rotation angles (in radians)
const maxUpRotation = Math.PI / 4; // Adjust this value to your preference
const maxDownRotation = -Math.PI / 4; // Adjust this value to your preference

// Initialize the scene
function init() {
    // Create a scene
    scene = new THREE.Scene();

    // Create a camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create a renderer
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio); // Increase pixel ratio for better quality
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xb0b0b0); // Set the background color to white
    document.getElementById("viewer-container").appendChild(renderer.domElement);

    // Load and add your 3D model here
    const loader = new THREE.GLTFLoader();
    loader.load('podium2.glb', (glb) => {
        model = glb.scene;
        scene.add(model);
        // Set the position of the model after it's loaded and added to the scene
        model.position.set(0, -1.5, -2);
        model.rotation.set(0, -4, 0);
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

    // Add event listeners for keyboard input
    window.addEventListener('keydown', (event) => {
        // Calculate the forward, right, and backward vectors based on the camera's current rotation
        const forwardVector = new THREE.Vector3(0, 0, -1);
        forwardVector.applyEuler(camera.rotation);
        forwardVector.normalize();

        const rightVector = new THREE.Vector3(1, 0, 0);
        rightVector.applyEuler(camera.rotation);
        rightVector.normalize();

        // Define the movement speed for each direction
        const moveSpeed = 0.1;

        switch (event.key) {
            case 'ArrowUp':
                // Move the camera forward
                camera.position.add(forwardVector.clone().multiplyScalar(moveSpeed));
                break;
            case 'ArrowDown':
                // Move the camera backward
                camera.position.add(forwardVector.clone().multiplyScalar(-moveSpeed));
                break;
            case 'ArrowLeft':
                // Move the camera to the left
                camera.position.add(rightVector.clone().multiplyScalar(-moveSpeed));
                break;
            case 'ArrowRight':
                // Move the camera to the right
                camera.position.add(rightVector.clone().multiplyScalar(moveSpeed));
                break;
            // ... (Other key presses)
        }
    });

    // Add event listeners for mouse input
    window.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.movementX || event.mozMovementX || 0;

            // Rotate the camera based on mouse movement, restricting to X (vertical) and Y (horizontal) axes
            camera.rotation.y -= deltaX * rotateSpeed;

            // Limit camera rotation to prevent flipping and control mouse rotation range
            camera.rotation.x = Math.max(maxDownRotation, Math.min(maxUpRotation, camera.rotation.x));
        }
    });

    // Start dragging when the mouse button is pressed
    window.addEventListener('mousedown', () => {
        isDragging = false;
    });

    // Stop dragging when the mouse button is released
    window.addEventListener('mouseup', () => {
        isDragging = true;
    });
}

// Create an animation loop
function animate() {
    requestAnimationFrame(animate);
    // Render the scene
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});

// Start the app
init();
animate();