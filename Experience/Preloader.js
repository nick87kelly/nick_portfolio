import { EventEmitter } from "events"
import Experience from "./Experience.js"

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.world = this.experience.world;

        this.world.on("worldready", () => {
            this.loadPage()
        })
    }

    loadPage() {
        var opacityPage = 0;
        var intervalIDPage = 0;
        setInterval(() => {
            var page = document.getElementsByClassName("page")[0];
            opacityPage = Number(window.getComputedStyle(page)
                .getPropertyValue("opacity"));
            if (opacityPage < 1) {
                opacityPage = opacityPage + 0.1;
                page.style.opacity = opacityPage
            } else {
                clearInterval(intervalIDPage);
            }
        }, 200)

        var opacityLoader = 0;
        var intervalIDLoader = 0;

        setInterval(() => {
            var loader = document.getElementsByClassName("loader")[0];
            opacityLoader = Number(window.getComputedStyle(loader)
                .getPropertyValue("opacity"));
            if (opacityLoader > 0) {
                opacityLoader = opacityLoader - 0.1;
                loader.style.opacity = opacityLoader
            } else {
                clearInterval(intervalIDLoader);
            }
        }, 100)
    }
}