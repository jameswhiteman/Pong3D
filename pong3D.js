
/*global, THREE, Coordinates, $, document, window, dat*/

var camera, scene, renderer, cameraControls, effectController;
var meshPaddle1, meshPaddle2, meshBall;

var clock = new THREE.Clock();

var gridX = false;
var gridY = false;
var gridZ = false;
var axes = false;
var ground = true;

var score1 = 0;
var score2 = 0;

var direction = 1;
var xBall = 0;
var yBall = 270;
var zBall = -140;

var xPaddle1 = 0;
var yPaddle1 = 230;
var zPaddle1 = 500;

var xPaddle2 = 0;
var yPaddle2 = 230;
var zPaddle2 = -500;

var widthPaddle = 200;
var heightPaddle = 200;
var depthPaddle = 50;

function init(width, height) {
    var canvasWidth = width;
    var canvasHeight = height;
    var canvasRatio = canvasWidth / canvasHeight;

    // RENDERER
    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.gammaInput = true;
    renderer.gammaOutput = true;
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.setClearColorHex( 0xAAAAAA, 1.0 );

    // CAMERA
    camera = new THREE.PerspectiveCamera( 90, canvasRatio, 1, 40000 );
    camera.position.set(800, 800, 800);
    // CONTROLS
    cameraControls = new THREE.OrbitAndPanControls(camera, renderer.domElement);
    cameraControls.target.set(400, 400, 400);
    fillScene();
    document.addEventListener("keydown", onDocumentKeyDown, false);
}

function addObjects() {

    // MATERIALS
    var meshLambertMaterialPaddle = new THREE.MeshLambertMaterial({color: 0xFFFFFF});
    var meshLambertMaterialBall = new THREE.MeshLambertMaterial({color: 0xBBBBBB});

    var radiusBall = 25;

    var paddle = new THREE.CubeGeometry(widthPaddle, heightPaddle, depthPaddle);
    var ball = new THREE.SphereGeometry(radiusBall, 100, 100);

    meshPaddle1 = new THREE.Mesh( paddle, meshLambertMaterialPaddle );
    meshPaddle1.position.x = xPaddle1;			// centered at origin
    meshPaddle1.position.y = yPaddle1;	// half of height: put it above ground plane
    meshPaddle1.position.z = zPaddle1;			// centered at origin

    meshPaddle2 = new THREE.Mesh(paddle, meshLambertMaterialPaddle);
    meshPaddle2.position.x = xPaddle2;
    meshPaddle2.position.y = yPaddle2;
    meshPaddle2.position.z = zPaddle2;

    meshBall = new THREE.Mesh(ball, meshLambertMaterialBall);
    meshBall.position.x = xBall;
    meshBall.position.y = yBall;
    meshBall.position.z = zBall;
    meshBall.overdraw = true;

    scene.add(meshPaddle1);
    scene.add(meshPaddle2);
    scene.add(meshBall);
}

function addToDOM() {
    var container = document.getElementById('container');
    var canvas = container.getElementsByTagName('canvas');
    if (canvas.length>0) {
        container.removeChild(canvas[0]);
    }
    container.appendChild( renderer.domElement );
}
function fillScene() {
    // SCENE
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog( 0x808080, 3000, 6000 );
    // LIGHTS
    var ambientLight = new THREE.AmbientLight( 0x222222 );
    var light = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light.position.set( 200, 400, 500 );

    var light2 = new THREE.DirectionalLight( 0xffffff, 1.0 );
    light2.position.set( -400, 200, -300 );

    scene.add(ambientLight);
    scene.add(light);
    scene.add(light2);

    scene.add(camera);

    if (ground) {
        Coordinates.drawGround({size:1000});
    }
    if (gridX) {
        Coordinates.drawGrid({size:1000,scale:0.01});
    }
    if (gridY) {
        Coordinates.drawGrid({size:1000,scale:0.01, orientation:"y"});
    }
    if (gridZ) {
        Coordinates.drawGrid({size:1000,scale:0.01, orientation:"z"});
    }
    if (axes) {
        Coordinates.drawAllAxes({axisLength:300,axisRadius:2,axisTess:50});
    }
    var objects = addObjects();
    scene.add(objects);
}

function animate() {
    window.requestAnimationFrame(animate);
    render();
    zBall += 10 * direction;
    if (yBall > (yPaddle1 - (heightPaddle / 2)) && yBall < (yPaddle1 + (heightPaddle / 2)) &&
        zBall > zPaddle1 - (depthPaddle / 2))
        {
            direction = -1;
        }
        else if (yBall > (yPaddle2 - (heightPaddle / 2)) && yBall < (yPaddle2 + (heightPaddle / 2)) &&
            zBall < zPaddle2 + (depthPaddle / 2))
            {
                direction = 1;
            }

            if (zBall > 800)
                {
                    score1++;
                    zBall = 0;
                    yBall = 270;
                    direction *= -1;
                }
                else if (zBall < -800)
                    {
                        score2++;
                        zBall = 0;
                        yBall = 270;
                        direction *= -1;
                    }
                    meshBall.position.set(xBall, yBall, zBall);
                    meshPaddle1.position.set(xPaddle1, yPaddle1, zPaddle1);
                    meshPaddle2.position.set(xPaddle2, yPaddle2, zPaddle2);
                }

                function render() {
                    var delta = clock.getDelta();
                    cameraControls.update(delta);
                    if ( effectController.newGridX !== gridX || effectController.newGridY !== gridY || effectController.newGridZ !== gridZ || effectController.newGround !== ground || effectController.newAxes !== axes)
                        {
                            gridX = effectController.newGridX;
                            gridY = effectController.newGridY;
                            gridZ = effectController.newGridZ;
                            ground = effectController.newGround;
                            axes = effectController.newAxes;

                            fillScene();
                        }
                        renderer.render(scene, camera);
                    }

                    function onDocumentKeyDown(event) {
                        // Get the key code of the pressed key
                        var keyCode = event.which;
                        // 'F' - Toggle through the texture filters
                        if(keyCode == 81)
                            {
                                yPaddle1 += 20;
                            }
                            if (keyCode == 65)
                                {
                                    yPaddle1 -= 20;
                                }
                                if (keyCode == 79)
                                    {
                                        yPaddle2 += 20;
                                    }
                                    if (keyCode == 76)
                                        {
                                            yPaddle2 -= 20;
                                        }
                                    }

                                    function setupGui() {

                                        effectController = {

                                            newGridX: gridX,
                                            newGridY: gridY,
                                            newGridZ: gridZ,
                                            newGround: ground,
                                            newAxes: axes,

                                            dummy: function() {
                                            }
                                        };

                                        var gui = new dat.GUI();
                                        gui.add(effectController, "newGridX").name("Show XZ grid");
                                        gui.add( effectController, "newGridY" ).name("Show YZ grid");
                                        gui.add( effectController, "newGridZ" ).name("Show XY grid");
                                        gui.add( effectController, "newGround" ).name("Show ground");
                                        gui.add( effectController, "newAxes" ).name("Show axes");
                                    }
                                    function createCup() {addObjects();}
                                    function createStairs() {}


                                    try {
                                        init();
                                        setupGui();
                                        addToDOM();
                                        animate();
                                    } catch(e) {
                                        var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
                                        $('#container').append(errorReport+e);
                                    }

