import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from "gsap"
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js'

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.resources = this.experience.resources;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1
        };

        this.stillLerp = true;

        this.setModel();
        this.setAnimation();
        this.onMouseMove();
    }

    setModel() {
        this.actualRoom.children.forEach(child => {
            if (child instanceof THREE.Group) {
                child.children.forEach(groupChild => {
                    groupChild.castShadow = true;
                    groupChild.receiveShadow = true;
                })
            }
            else {
                child.castShadow = true;
                child.receiveShadow = true;
            }

            if (child.name === "tv_screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.tvScreen
                });
            }
        });

        this.actualRoom.position.z = -1;

        const tankLight = new THREE.PointLight(0x393cf7, 4, 2);
        tankLight.position.set(1.60549, 3.6, -2.49463);
        this.actualRoom.add(tankLight);

        const lampLight = new THREE.PointLight(0xffffff, 4, 1);
        lampLight.position.set(0.48378, 2.08, 4.41287);
        this.actualRoom.add(lampLight);

        const skullLight = new THREE.PointLight(0xffffff, 2, 1);
        skullLight.position.set(3.65733, 1.7, 0.907071);
        this.actualRoom.add(skullLight);

        this.actualRoom.scale.set(.3, .3, .3);
        this.scene.add(this.actualRoom);
    }

    setAnimation() {
        this.mixer = new THREE.AnimationMixer(this.actualRoom);
        for (let i = 0; i < this.room.animations.length; i++) {
            this.swim = this.mixer.clipAction(this.room.animations[i]);
            this.swim.play();
        }
    }

    onMouseMove() {
        var opacity = 0;
        var intervalID = 0;
        var loaded = 0;

        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * .1;
        });
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(this.lerp.current, this.lerp.target, this.lerp.ease);
        if (!this.stillLerp) {
            this.actualRoom.rotation.y = 0;
        }
        else {
            this.actualRoom.rotation.y = this.lerp.current;
        }
        this.mixer.update(this.time.delta * .001);
    }
}