function createPerspective(view, fov, near, far, x, y, z)
{
    var perspective = new THREE.PerspectiveCamera(fov, view.width / view.height,
        near, far);
    perspective.position.set(x, y, z);
    return perspective;
}

function createOrbitPerspectiveControl(renderer, perspective, targetPoint)
{
    cameraControls = new THREE.OrbitAndPanControls(perspective, renderer.domElement);
    cameraControls.target.set(targetPoint);
}

function Point(x, y, z)
{
    this.x = x;
    this.y = y;
    this.z = z;
}
