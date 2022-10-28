import Experience from "../Experience.js"
import * as THREE from "three"
import { AmbientLight, DirectionalLight } from "three";

export default class Environment {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;

        this.setSunlight();


    }

    setSunlight() {
        this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-2.5, 6, 9);
        this.scene.add(this.sunLight);

        this.ambientLight = new THREE.AmbientLight("#fb9062", 1);
        this.scene.add(this.ambientLight);
    }
}