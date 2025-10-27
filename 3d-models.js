// Initialize Three.js scenes
let scenes = [];
let renderers = [];
let cameras = [];
let models = [];

// Common settings
const settings = {
    containerIds: ['chemicalModel', 'recyclingModel', 'transportModel'],
    cameraPosition: { x: 2, y: 2, z: 4 },
    lightPosition: { x: 5, y: 5, z: 5 },
    modelPaths: {
        chemical: 'models/chemical_container.glb',
        recycling: 'models/recycling_plant.glb',
        transport: 'models/transport_truck.glb'
    }
};

// Initialize 3D scenes
function initScenes() {
    settings.containerIds.forEach((containerId, index) => {
        const container = document.getElementById(containerId);
        if (!container) return;

        // Create scene
        const scene = new THREE.Scene();
        scenes[index] = scene;

        // Create camera
        const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
        camera.position.set(settings.cameraPosition.x, settings.cameraPosition.y, settings.cameraPosition.z);
        cameras[index] = camera;

        // Create renderer
        const renderer = new THREE.WebGLRenderer({ 
            canvas: container, 
            alpha: true, 
            antialias: true 
        });
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.outputEncoding = THREE.sRGBEncoding;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderers[index] = renderer;

        // Add lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(settings.lightPosition.x, settings.lightPosition.y, settings.lightPosition.z);
        directionalLight.castShadow = true;
        scene.add(directionalLight);

        // Add environment map
        const pmremGenerator = new THREE.PMREMGenerator(renderer);
        pmremGenerator.compileEquirectangularShader();

        // Load environment map
        new THREE.TextureLoader().load('textures/environment.jpg', function(texture) {
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            scene.environment = envMap;
            texture.dispose();
            pmremGenerator.dispose();
        });

        // Load specific model based on index
        loadModel(scene, index);
    });
}

// Load 3D models
function loadModel(scene, index) {
    const loader = new THREE.GLTFLoader();
    const modelPath = getModelPath(index);

    loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5);
        model.position.set(0, 0, 0);
        scene.add(model);
        models[index] = model;

        // Add animations
        addModelAnimations(model, index);
    });
}

// Get model path based on index
function getModelPath(index) {
    switch(index) {
        case 0:
            return settings.modelPaths.chemical;
        case 1:
            return settings.modelPaths.recycling;
        case 2:
            return settings.modelPaths.transport;
        default:
            return settings.modelPaths.chemical;
    }
}

// Add animations to models
function addModelAnimations(model, index) {
    // Rotation animation
    gsap.to(model.rotation, {
        y: Math.PI * 2,
        duration: 12,
        repeat: -1,
        ease: "none"
    });

    // Hover animation
    gsap.to(model.position, {
        y: 0.2,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });

    // Scroll-based animation
    gsap.to(model.position, {
        y: 0.5,
        scrollTrigger: {
            trigger: scenes[index].userData.container,
            start: "top center",
            end: "bottom center",
            scrub: true,
            onEnter: () => {
                gsap.to(model.scale, {
                    x: 0.6,
                    y: 0.6,
                    z: 0.6,
                    duration: 0.5
                });
            },
            onLeave: () => {
                gsap.to(model.scale, {
                    x: 0.5,
                    y: 0.5,
                    z: 0.5,
                    duration: 0.5
                });
            }
        }
    });
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    scenes.forEach((scene, index) => {
        if (scene && renderers[index] && cameras[index]) {
            // Add subtle camera movement
            cameras[index].position.y = settings.cameraPosition.y + Math.sin(Date.now() * 0.001) * 0.1;
            
            // Render scene
            renderers[index].render(scene, cameras[index]);
        }
    });
}

// Handle window resize
function onWindowResize() {
    settings.containerIds.forEach((containerId, index) => {
        const container = document.getElementById(containerId);
        if (!container || !cameras[index] || !renderers[index]) return;

        cameras[index].aspect = container.clientWidth / container.clientHeight;
        cameras[index].updateProjectionMatrix();
        renderers[index].setSize(container.clientWidth, container.clientHeight);
    });
}

// Initialize everything
window.addEventListener('load', () => {
    initScenes();
    animate();
    window.addEventListener('resize', onWindowResize);

    // Initialize GSAP ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
}); 