import Experience from "../Experience.js";
import * as THREE from "three";
import GSAP from "gsap";
import { RectAreaLightHelper } from "three/examples/jsm/helpers/RectAreaLightHelper.js";
import fragmentAffine from "../Utils/fragment-affine.js";
import vertexJitter from "../Utils/vertex-jitter.js";

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
      ease: 0.1,
    };

    this.stillLerp = true;

    this.setModel();
    this.setAnimation();
    this.onMouseMove();
  }

  setModel() {
    const jitterLevel = 200;

    let texture = null;

    this.actualRoom.children.forEach((child) => {
      if (child instanceof THREE.Group) {
        child.children.forEach((groupChild) => {
          groupChild.castShadow = true;
          groupChild.receiveShadow = true;
        });
      } else {
        child.castShadow = true;
        child.receiveShadow = true;
      }

      if (child.name === "tv_screen") {
        child.material = new THREE.MeshBasicMaterial({
          map: this.resources.items.tvScreen,
        });
        return;
      }
      if (child instanceof THREE.Mesh) {
        if (child.material.map) {
          texture = child.material.map;
        } else if (child.material.metalnessMap) {
          texture = child.material.metalnessMap;
        } else if (child.material.roughnessMap) {
          texture = child.material.roughnessMap;
        } else if (child.material.emissiveMap) {
          texture = child.material.emissiveMap;
        } else if (child.material.normalMap) {
          texture = child.material.normalMap;
        } else if (child.material.bumpMap) {
          texture = child.material.bumpMap;
        } else if (child.material.alphaMap) {
          texture = child.material.alphaMap;
        } else {
          return;
        }
        if (child.name == "wall" || child.name == "floor") {
          child.material = new THREE.ShaderMaterial({
            uniforms: {
              uTexture: {
                type: "t",
                value: texture,
              },
              uJitterLevel: { value: jitterLevel },
              uRepeat: { value: [8, 8] },
            },
            vertexShader:
              "varying vec2 vUv;\nuniform float uJitterLevel;\n\nvoid main()\n{\nvUv = uv;\nvec4 v = modelViewMatrix * vec4(position, 1.0);\ngl_Position = projectionMatrix * v;\n\ngl_Position /= gl_Position.w;\n\ngl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;\n}",
            fragmentShader:
              "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 3.0, color.a);\n}",
          });
        } else {
          var fs;
          if (
            child.name == "pothos" ||
            child.name == "pothos001" ||
            child.name == "pothos002" ||
            child.name == "pothos003" ||
            child.name == "pothos004" ||
            child.name == "anubias" ||
            child.name == "anubias001" ||
            child.name == "anubias002" ||
            child.name == "driftwood" ||
            child.name == "driftwood001" ||
            child.name == "driftwood002" ||
            child.name == "sand" ||
            child.name == "shelf" ||
            child.name == "rug"
          ) {
            fs =
              "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 1.5, color.a);\n}";
          } else if (
            child.name == "fish_tank_stand" ||
            child.name == "side_table" ||
            child.name == "side_table001" ||
            child.name == "desk"
          ) {
            fs =
              "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 9.0, color.a);\n}";
          } else if (child.name == "door" || child.name == "door001") {
            fs =
              "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 6.0, color.a);\n}";
          } else {
            fs =
              "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 3.0, color.a);\n}";
          }
          child.material = new THREE.ShaderMaterial({
            uniforms: {
              uTexture: {
                type: "t",
                value: texture,
              },
              uJitterLevel: { value: jitterLevel },
              uRepeat: { value: [1, 1] },
            },
            vertexShader:
              "varying vec2 vUv;\nuniform float uJitterLevel;\n\nvoid main()\n{\nvUv = uv;\nvec4 v = modelViewMatrix * vec4(position, 1.0);\ngl_Position = projectionMatrix * v;\n\ngl_Position /= gl_Position.w;\n\ngl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;\n}",
            fragmentShader: fs,
          });
        }
      } else {
        child.children.forEach((groupChild) => {
          if (groupChild.material && child.name != "rig") {
            if (groupChild.material.map) {
              texture = groupChild.material.map;
            } else if (groupChild.material.metalnessMap) {
              texture = groupChild.material.metalnessMap;
            } else if (groupChild.material.roughnessMap) {
              texture = groupChild.material.roughnessMap;
            } else if (groupChild.material.emissiveMap) {
              texture = groupChild.material.emissiveMap;
            } else if (groupChild.material.normalMap) {
              texture = groupChild.material.normalMap;
            } else if (groupChild.material.bumpMap) {
              texture = groupChild.material.bumpMap;
            } else if (groupChild.material.alphaMap) {
              texture = groupChild.material.alphaMap;
            } else {
              return;
            }
          } else {
            return;
          }
          if (child.name == "wall") {
            groupChild.material = new THREE.ShaderMaterial({
              uniforms: {
                uTexture: {
                  type: "t",
                  value: texture,
                },
                uJitterLevel: { value: jitterLevel },
                uRepeat: { value: [2, 2] },
              },
              vertexShader:
                "varying vec2 vUv;\nuniform float uJitterLevel;\n\nvoid main()\n{\nvUv = uv;\nvec4 v = modelViewMatrix * vec4(position, 1.0);\ngl_Position = projectionMatrix * v;\n\ngl_Position /= gl_Position.w;\n\ngl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;\n}",
              fragmentShader:
                "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb, color.a);\n}",
            });
          } else {
            var fs;
            console.log(child.name);
            if (
              child.name == "plant002" ||
              child.name == "plant001" ||
              child.name == "bedframe"
            ) {
              fs =
                "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 1.5, color.a);\n}";
            } else {
              fs =
                "uniform sampler2D uTexture;\nuniform vec2 uRepeat;\nvarying vec2 vUv;\n\nvoid main()\n{\nvec4 color = texture2D(uTexture, vUv * uRepeat);\ngl_FragColor = vec4(color.rgb * 3.0, color.a);\n}";
            }
            groupChild.material = new THREE.ShaderMaterial({
              uniforms: {
                uTexture: {
                  type: "t",
                  value: texture,
                },
                uJitterLevel: { value: jitterLevel },
                uRepeat: { value: [1, 1] },
              },
              vertexShader:
                "varying vec2 vUv;\nuniform float uJitterLevel;\n\nvoid main()\n{\nvUv = uv;\nvec4 v = modelViewMatrix * vec4(position, 1.0);\ngl_Position = projectionMatrix * v;\n\ngl_Position /= gl_Position.w;\n\ngl_Position.xy = floor(gl_Position.xy * uJitterLevel) / uJitterLevel * gl_Position.w;\n}",
              fragmentShader: fs,
            });
          }
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

    this.actualRoom.scale.set(0.3, 0.3, 0.3);
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
      this.rotation =
        ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
      this.lerp.target = this.rotation * 0.1;
    });
  }

  update() {
    this.lerp.current = GSAP.utils.interpolate(
      this.lerp.current,
      this.lerp.target,
      this.lerp.ease
    );
    if (!this.stillLerp) {
      this.actualRoom.rotation.y = 0;
    } else {
      this.actualRoom.rotation.y = this.lerp.current;
    }
    this.mixer.update(this.time.delta * 0.001);
  }
}
