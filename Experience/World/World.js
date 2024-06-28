import Experience from "../Experience.js";
import * as THREE from "three";
import Room from "./Room.js";
import Environment from "./Environment.js";
import Controls from "./Controls.js";
import Floor from "./Floor.js";
import { EventEmitter } from "events";

export default class World extends EventEmitter {
  constructor() {
    super();
    this.experience = new Experience();
    this.sizes = this.experience.sizes;
    this.scene = this.experience.scene;
    this.canvas = this.experience.canvas;
    this.camera = this.experience.camera;
    this.resources = this.experience.resources;

    this.resources.on("ready", () => {
      this.environment = new Environment();
      this.room = new Room();
      this.floor = new Floor();
      this.controls = new Controls();
      this.emit("worldready");
    });
  }

  update() {
    if (this.room) {
      this.room.update();
    }
  }
}
