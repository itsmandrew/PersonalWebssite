import * as THREE from "three";
import Experience from "../Experience";
import GSAP from "gsap";

export default class Room {
    constructor() {
        this.experience = new Experience();
        this.scene = this.experience.scene;
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        this.lerp = {
            current: 0, 
            target: 0,
            ease: 0.1,
        };


        this.setModel();
        this.onMouseMove();

    }


    setModel() {
        this.actualRoom.children.forEach(child=> {


            child.castShadow=true;
            child.receiveShadow=true;

            if (child instanceof THREE.Group) {
                child.children.forEach((groupChild)=> {
                    groupChild.castShadow=true;
                    groupChild.receiveShadow=true;
                })
            }

            // child.scale.set(1, 1, 1);

        });

        this.actualRoom.children.castShadow = true;
        this.actualRoom.children.receiveShadow = true;

        const width = 0.5;
        const height = 0.7;
        const intensity = 1;
        const rectLight = new THREE.RectAreaLight(
            0xffffff,
            intensity,
            width,
            height
        );
        rectLight.position.set(7.68244, 7, 0.5);
        rectLight.rotation.x = -Math.PI / 2;
        rectLight.rotation.z = Math.PI / 4;
        this.actualRoom.add(rectLight);

        this.roomChildren["rectLight"] = rectLight;

        // const rectLightHelper = new RectAreaLightHelper(rectLight);
        // rectLight.add(rectLightHelper);
        // console.log(this.room);

        this.scene.add(this.actualRoom);


        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.4, 0.4, 0.4);
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            this.rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation * 0.05;
        });
    }

    resize() {
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current,
            this.lerp.target,
            this.lerp.ease
        );

        this.actualRoom.rotation.y = this.lerp.current;

    }
}