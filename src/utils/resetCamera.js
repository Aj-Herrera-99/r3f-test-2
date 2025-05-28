import gsap from "gsap";

export const resetCamera = (camera, initialCameraPosition, initialTarget, controls) => {
    const duration = 1.5;
    const ease = "power2.out";

    gsap.to(camera.position, {
        x: initialCameraPosition.x,
        y: initialCameraPosition.y,
        z: initialCameraPosition.z,
        duration,
        ease,
        onUpdate: () => camera.lookAt(initialTarget),
    });

    gsap.to(controls.target, {
        x: initialTarget.x,
        y: initialTarget.y,
        z: initialTarget.z,
        duration,
        ease,
        onUpdate: () => controls.update(),
    });
};
