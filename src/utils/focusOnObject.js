import { Box3, Vector3 } from "three";
import gsap from "gsap";

export const focusOnObject = (object, camera, controls) => {
    const duration = 1.5;
    const ease = "power2.out";
    // Ottieni bounding box
    const box = new Box3().setFromObject(object);
    const center = new Vector3();
    box.getCenter(center);

    // Calcola dimensione per adattare la distanza
    const size = new Vector3();
    box.getSize(size);
    const maxDim = Math.max(size.x, size.y, size.z);

    // Calcola nuova posizione camera (all'indietro rispetto al centro)
    const direction = new Vector3(0, 0, 1); // lungo Z
    direction.applyQuaternion(object.quaternion); // considera rotazione oggetto
    direction.normalize();

    const distance = maxDim * 1.5; // Puoi modificare questo fattore
    const newCameraPos = center.clone().add(direction.multiplyScalar(distance));

    // ANIMAZIONE camera.position
    gsap.to(camera.position, {
        x: newCameraPos.x,
        y: newCameraPos.y,
        z: newCameraPos.z,
        duration,
        ease,
        onUpdate: () => {
            camera.lookAt(center); // aggiorna verso
        },
    });

    // ANIMAZIONE OrbitControls (se usato)
    gsap.to(controls.target, {
        x: center.x,
        y: center.y,
        z: center.z,
        duration,
        ease,
        onUpdate: () => controls.update(),
    });
};
