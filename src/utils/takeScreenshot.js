export const takeScreenshot = (gl, scene, camera, setState) => {
    setTimeout(() => {
        // screenshot
        gl.render(scene, camera);
        const dataUrl = gl.domElement.toDataURL("image/png");
        setState(dataUrl);
    }, 600);
};
