import Experience from "../Experience.js"
import * as THREE from "three"
import GSAP from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.time = this.experience.time;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room;
        this.floor = this.experience.world.floor.plane;
        GSAP.registerPlugin(ScrollTrigger);

        this.setPath();
    }

    setPath() {
        ScrollTrigger.matchMedia({

            // desktop
            "(min-width: 969px)": () => {
                this.camera.orthographicCamera.position.y = 3.44;
                this.camera.orthographicCamera.lookAt(0, 1.44, 0);

                this.room.actualRoom.scale.set(.3, .3, .3);
                this.firstTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                        onEnter: () => {
                            this.room.stillLerp = false;
                        },
                        onLeaveBack: () => {
                            this.room.stillLerp = true;
                        }
                    }
                });
                this.firstTimeline.to(this.room.actualRoom.position, {
                    z: .5,
                }, "same");
                this.firstTimeline.to(this.camera.orthographicCamera.position, {
                    x: -1,
                    y: 1.44,
                    z: 1,
                    onUpdate: () => {
                        this.camera.orthographicCamera.lookAt(0, 1.44, 0);
                    }
                }, "same");
                this.firstTimeline.to(this.camera.orthographicCamera, {
                    zoom: 9.4,
                    onUpdate: () => {
                        this.camera.orthographicCamera.updateProjectionMatrix();
                    }
                }, "same");


                this.secondTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                    }
                });
                this.secondTimeline.to(this.room.actualRoom.position, {
                    z: .035,
                });

                this.thirdTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                    }
                });
                this.thirdTimeline.to(this.room.actualRoom.position, {
                    z: -.43,
                });
            },

            //mobile
            "(max-width: 968px)": () => {
                this.camera.orthographicCamera.position.y = 1.5;
                this.camera.orthographicCamera.lookAt(0, .5, 0);

                this.room.actualRoom.scale.set(.15, .15, .15);
                this.firstTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                        onEnter: () => {
                            this.room.stillLerp = false;
                        },
                        onLeaveBack: () => {
                            this.room.stillLerp = true;
                        }
                    }
                });
                this.firstTimeline.to(this.room.actualRoom.scale, {
                    x: .2,
                    y: .2,
                    z: .2
                });


                this.secondTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                    }
                });
                this.secondTimeline.to(this.camera.orthographicCamera, {
                    zoom: 9.4,
                    onUpdate: () => {
                        this.camera.orthographicCamera.updateProjectionMatrix();
                    }
                }, "same");
                this.secondTimeline.to(this.room.actualRoom.position, {
                    x: .38,
                    z: .8

                }, "same");

                this.thirdTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        markers: false,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: .6,
                    }
                });
                this.thirdTimeline.to(this.room.actualRoom.position, {
                    x: -.3,
                    z: 0
                }, "same");
                this.thirdTimeline.to(this.camera.orthographicCamera, {
                    zoom: 3,
                    onUpdate: () => {
                        this.camera.orthographicCamera.updateProjectionMatrix();
                    }
                }, "same");
            },
        });
    }
}