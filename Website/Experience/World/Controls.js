import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js"
import ASScroll from "@ashthornton/asscroll";


export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.sizes = this.experience.sizes;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;

        this.room = this.experience.world.room.actualRoom;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();

    }

    setScrollTrigger() {
        let mm = GSAP.matchMedia();

        mm.add("(min-width: 969px)", () => {
            console.log("desktop");

            // first section -------------
            this.firstMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".first-move",
                    // markers: true,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            });

            this.firstMoveTimeline.to(this.room.position, {
                x: ()=> {
                    return this.sizes.width * 0.0015;
                },
                z: -0.55,
            });

            this.firstMoveTimeline.to(this.room.scale, {
                x: 0.3,
                y: 0.3,
                z: 0.3,
            });

            // second section ------------------
            this.secondMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".second-move",
                    // markers: true,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                },
            });

            this.secondMoveTimeline.to(this.room.position, {
                x: ()=> {
                    return -0.7;
                },
                z: ()=> {
                    return this.sizes.height * 0.00028
                },
                y: () => {
                    return -0.5
                },
            }, "same");


            this.secondMoveTimeline.to(this.room.scale, {
                x: 0.55,
                y: 0.55,
                z: 0.55,
            }, "same");


            // third section -------------
            this.thirdMoveTimeline = new GSAP.timeline({
                scrollTrigger: {
                    trigger: ".third-move",
                    // markers: true,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                    invalidateOnRefresh: true,
                },
            });
            
            
            this.thirdMoveTimeline.to(this.room.position, {
                x: ()=> {
                    return this.sizes.width * 0.0015;
                },
                z: -0.55,
            }, "same");


            this.thirdMoveTimeline.to(this.room.scale, {
                x: 0.3,
                y: 0.3,
                z: 0.3,
            }, "same");
            
        })

        mm.add("all", () => {
            this.sections = document.querySelectorAll(".section");
            this.sections.forEach((section) => {
                this.progressWrapper =
                    section.querySelector(".progress-wrapper");
                this.progressBar = section.querySelector(".progress-bar");

                if (section.classList.contains("right")) {
                    GSAP.to(section, {
                        borderTopLeftRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });
                    GSAP.to(section, {
                        borderBottomLeftRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                } else {
                    GSAP.to(section, {
                        borderTopRightRadius: 10,
                        scrollTrigger: {
                            trigger: section,
                            start: "top bottom",
                            end: "top top",
                            scrub: 0.6,
                        },
                    });

                    GSAP.to(section, {
                        borderBottomRightRadius: 700,
                        scrollTrigger: {
                            trigger: section,
                            start: "bottom bottom",
                            end: "bottom top",
                            scrub: 0.6,
                        },
                    });
                }
                
                GSAP.from(this.progressBar, {
                    scaleY: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 0.4,
                        pin: this.progressWrapper,
                        pinSpacing: false,
                    },
                });
            
            });

        }); /* end */
        
    }



    setPath() {
        this.timeline = new GSAP.timeline();
        this.timeline.to(this.room.position, {
            x: ()=> {
                return this.sizes.width * 0.0015;
            },
            z: -0.55,

            scrollTrigger: {
                trigger: ".first-move",
                // markers: true,
                start: "top top",
                end: "bottom bottom",
                scrub: 0.5,
                invalidateOnRefresh: true,
            },
        });
    }

    resize() {
    }

    update() {
    }
}