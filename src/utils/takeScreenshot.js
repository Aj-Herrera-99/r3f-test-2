import html2canvas from "html2canvas";

export const takeScreenshot = (gl, scene, camera, setState) => {
    setTimeout(() => {
        // screenshot
        gl.render(scene, camera);
        // html2canvas(document.body).then((canvas) => {
        //     const dataURL = canvas.toDataURL("image/png");
        //     setState(dataURL);
        //     // download, save, etc.
        // });
        const dataUrl = gl.domElement.toDataURL("image/png");
        setState(dataUrl);
    }, 600);
};
