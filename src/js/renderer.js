function createRenderer(view, precision, alpha, premultipliedAlpha, antialias, stencil,
    preserveDrawingBuffer, maxLights, color, colorAlpha)
{
    // Create the renderer.
    var renderer = new THREE.WebGLRenderer({canvas:view, precision:precision,
        alpha, premultipliedAlpha:premultipliedAlpha, antialias:antialias,
        stencil:stencil, preserveDrawingBuffer:preserveDrawingBuffer,
        maxLights:maxLights});
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(view.width, view.height);
    renderer.setClearColorHex(color, colorAlpha);

    // Add renderer to document
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0)
    {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );

    // Return the renderer.
    return renderer;
}
