import { focusOnObject } from "./focusOnObject";
import { resetCamera } from "./resetCamera";

export const focusOnClick = (
    isClicked,
    target,
    camera,
    initialCameraPosition,
    initialTarget,
    controls
) => {
    if (!isClicked) {
        if (!target || !controls) return false;

        focusOnObject(target, camera, controls);
        return true;
        // // Lancia il raycaster dalla camera
        // raycaster.setFromCamera(pointer, camera);

        // const intersects = raycaster.intersectObjects(scene.children, true); // true = cerca in profondità

        // if (intersects.length > 0 && controls) {
        //     const targetMesh = intersects[0].object;
        //     focusOnObject(targetMesh, camera, controls);
        // }
    } else {
        resetCamera(camera, initialCameraPosition, initialTarget, controls);
        return false;
    }
};
