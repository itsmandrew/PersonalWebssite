import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";


export default class Controls {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.camera = this.experience.camera;


    }



    resize() {
    }

    update() {
    }
}