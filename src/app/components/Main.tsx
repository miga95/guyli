import React, { useRef, useEffect } from 'react';
import { Scene, PerspectiveCamera, AmbientLight, DirectionalLight, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Button } from './ui/button';
import Link from 'next/link';

let OrbitControls: new (arg0: PerspectiveCamera, arg1: HTMLCanvasElement) => any;
if (typeof window !== 'undefined') {
  OrbitControls = require('three/examples/jsm/controls/OrbitControls').OrbitControls;
}
export default function Main() {

    const containerRef = useRef<HTMLDivElement>(null);


    useEffect(() => {
        if (!containerRef.current) return;

        const scene = new Scene();
        const fov = 30;
        const aspect = containerRef.current.clientWidth / containerRef.current.clientHeight; // Assurez-vous que cette division n'est pas par zéro
        const near = 0.1;
        const far = 1000;

        // Setup camera
        const camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(-2, 0, 4);

        // Lighting
        const ambient = new AmbientLight(0x404040, 2);
        const directionalLight = new DirectionalLight(0xffffff, 10);
        const directionalLight2 = new DirectionalLight(0xffffff, 2);
        directionalLight.position.set(-20, 20, -20);
        directionalLight2.position.set(10, 10, 10);
        camera.add(directionalLight);
        camera.add(directionalLight2);
        scene.add(ambient);
        scene.add(camera);
      


        // Renderer
        const renderer = new WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        containerRef.current.appendChild(renderer.domElement);
        // OrbitControls
        const controls = new OrbitControls(camera, renderer.domElement);
        // Load 3D model
        let model;
        const loader = new GLTFLoader();
        loader.load("/assets/mesh/character_unpacked.gltf", function (gltf) {
            scene.add(gltf.scene);
            model = gltf.scene.children[0];
            animate();
        });

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);
            controls.update();
            // if (model) model.rotation.z += 0.01;
            renderer.render(scene, camera);
        };

        // Clean up on component unmount
        return () => {
            if (containerRef.current) {
                containerRef.current.removeChild(renderer.domElement);
            }
            scene.clear();
            renderer.dispose();
        };
    }, []); // Empty dependency array ensures this effect only runs once on mount

    return (
        <main className='max-sm:flex-col sm:flex sm:pt-16 '>
            <div ref={containerRef} className='w-full sm:w-1/2 h-96' />
            <div className='flex flex-col justify-center'>
              <h1 className='text-4xl font-semibold text-center max-sm:pt-8'>Reinvent Your Social World</h1>
              <Button size='lg' className='mt-5 w-1/2 block mx-auto'><Link href="/auth/signUp">Explore Now</Link></Button>
            </div>
        </main>
    );
}
