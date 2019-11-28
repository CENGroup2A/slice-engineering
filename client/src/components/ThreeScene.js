import React, {Component} from 'react';
import * as THREE from 'three';
import Dropzone from 'react-dropzone'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {TDSLoader} from 'three/examples/jsm/loaders/TDSLoader';
import {Redirect} from 'react-router-dom';
import Accepted from './Accepted';

class ThreeScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: null,
            link: null,
            fileRendered: false
        };
    }

    routeChange = () => {
        this.setState({link: '/material'});
    }

    getFile() {
        document.getElementById('renderInfo').style.display = 'none';
        var file = this.refs.fileUploader.files[0];
        if (file) {
            this.setState({fileRendered : true});
            this.openFile(file);
            var text = document.getElementById('but-upload');
            text.textContent = file.name;
            this.setState({currentFile: file});
        }
    }

    handleClick() {
        this.refs.fileUploader.click();
    }

    onDrop = (files) => {
        var file = files[0];
        this.setState({fileRendered : true});
        this.openFile(file);
        var text = document.getElementById('but-upload');
        text.textContent = file.name;
        this.setState({currentFile: file});
    }

    onOrientation = (eventKey) => {
        this.updateOrientation(eventKey);
        var text = document.getElementById('but-orientate');
        text.textContent = eventKey;
    }

    onFinish = (eventKey) => {
        var text = document.getElementById('but-finish');
        text.textContent = eventKey;
    }

    onRotation = (eventKey) => {
        this.updateRotation(eventKey);
        var text = document.getElementById('but-rotate');
        text.textContent = eventKey;
    }

    onMaterial = (eventKey) => {
        this.updateMaterial(eventKey);
        var text = document.getElementById('but-material');
        text.textContent = eventKey;
    }

    componentWillUnmount() {
        this.mesh = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;
    }

    componentDidMount() {
        var mesh, renderer, scene, camera, controls, bb, rect, uploadedFile, selectedMaterial;
        var rotate = 'Z';
        var vector = new THREE.Vector3(0, 1, 0);

        this.openFile = (file) => {
            uploadedFile = file;
            if (!mesh) {
                init();
                load(file, true);
            }
            else {
                update();
                load(file, false);
            }
        }

        this.updateOrientation = (type) => {
            if (uploadedFile) {
                if (type === 'XYZ') {
                    vector = new THREE.Vector3(0, 1, 0);
                }
                else if (type === 'XZY') {
                    vector = new THREE.Vector3(0, 0, 1);
                }
                else if (type === 'YXZ') {
                    vector = new THREE.Vector3(1, 0, 0);
                }
                else if (type === 'YZX') {
                    vector = new THREE.Vector3(-1, 0, 0);
                }
                else if (type === 'ZXY') {
                    vector = new THREE.Vector3(0, 0, -1);
                }
                else if (type === 'ZYX') {
                    vector = new THREE.Vector3(0, -1, 0);
                }
                update();
                load(uploadedFile, false);
            }
        }

        this.updateRotation = (eventKey) => {
            if (uploadedFile) {
                rotate = eventKey;
                update();
                load(uploadedFile, false);
            }
        }

        this.updateMaterial = (material) => {
            if (uploadedFile) {
                update();
                load(uploadedFile, false);

                var materialPath;

                if (material === 'ABS') {
                    materialPath = '/materials/poly.png';
                }
                else if (material === 'Alumide') {

                }
                else if (material === 'Aluminum') {

                }
                else if (material === 'Brass') {

                }
                else if (material === 'Bronze') {

                }
                else if (material === 'Copper') {

                }
                else if (material === 'Gold') {

                }
                else if (material === 'Gray Resin') {

                }
                else if (material === 'High Detail Resin') {

                }
                else if (material === 'High Detail Stainless Steel') {

                }
                else if (material === 'Mammoth Resin') {

                }
                else if (material === 'Multicolor+') {

                }
                else if (material === 'Polyamide (MJF)') {

                }
                else if (material === 'Polyamide (SLS)') {

                }
                else if (material === 'Polyamide Priority (SLS)') {

                }
                else if (material === 'Polypropylene') {

                }
                else if (material === 'Rubber-Like (MJF)') {

                }
                else if (material === 'Silver') {

                }
                else if (material === 'Standard Resin') {

                }
                else if (material === 'Steel') {

                }
                else if (material === 'Titanium') {

                }
                else if (material === 'Transparent Resin') {

                }

                const vs = `
                varying vec3 e;
                varying vec3 n;

                void main() {

                e = normalize( vec3( modelViewMatrix * vec4( position, 1.0 ) ) );
                n = normalize( normalMatrix * normal );

                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1. );

                }
                `;

                const fs = `
                uniform sampler2D tMatCap;

                varying vec3 e;
                varying vec3 n;

                void main() {

                vec3 r = reflect( e, n );
                float m = 2. * sqrt( pow( r.x, 2. ) + pow( r.y, 2. ) + pow( r.z + 1., 2. ) );
                vec2 vN = r.xy / m + .5;

                vec3 base = texture2D( tMatCap, vN ).rgb;

                gl_FragColor = vec4( base, 1. );

                }
                `;

                selectedMaterial = new THREE.ShaderMaterial({
                uniforms: {
                    tMatCap: {
                    type: 't',
                    value: THREE.ImageUtils.loadTexture(process.env.PUBLIC_URL + materialPath)
                    },
                },
                vertexShader: vs,
                fragmentShader: fs,
                flatShading: THREE.SmoothShading
                });
                selectedMaterial.uniforms.tMatCap.value.wrapS = selectedMaterial.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;
            }
        }

        function update() {
            scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
        }

        function load(file, doAnimate) {
            const tempURL = URL.createObjectURL(file);

            var str = file.name.split('.').pop();
            var ext = str.toLowerCase();
            var loader;

            if (ext === 'stl') {
                loader = new STLLoader();
                loader.load(tempURL, function (geometry) {
                    geometry.center();
                    make(geometry, doAnimate);
                });
            }
            else if (ext === 'obj') {
                loader = new OBJLoader();
                loader.load(tempURL, function (object) {
                    var g = new THREE.Geometry().fromBufferGeometry(object.children["0"].geometry);
                    g.center();
                    make(g, doAnimate);
                });
            }
            else if (ext === 'fbx') {
                loader = new FBXLoader();
                loader.load(tempURL, function(object) {
                    var g = new THREE.Geometry().fromBufferGeometry(object.children["0"].geometry);
                    g.center();
                    make(g, doAnimate);
                });
            }
            else if (ext === '3ds') {
                loader = new TDSLoader();
                loader.load(tempURL, function(object) {
                    var g = new THREE.Geometry().fromBufferGeometry(object.children["0"].geometry);
                    g.center();
                    make(g, doAnimate); 
                });
            }

            URL.revokeObjectURL(tempURL);
        }

        function make(geometry, doAnimate) {
            var material;
            if (selectedMaterial) {
                material = selectedMaterial;
            }
            else {
                material = new THREE.MeshNormalMaterial();
            }
            mesh = new THREE.Mesh(geometry, material);
            var boundingBox = new THREE.Box3().setFromObject(mesh);
            var sizeHouse = bb.getSize();
            var sizeObject = boundingBox.getSize();
            var ratio = sizeObject.divide(sizeHouse);
            var maxRatio = Math.max(ratio.x, ratio.y, ratio.z);
            var invertRatio = 1 / maxRatio;
            mesh.scale.set(invertRatio, invertRatio, invertRatio);
            mesh.position.set(0, 0.25, 0);
            mesh.setRotationFromAxisAngle(vector, Math.PI/2);
            scene.add(mesh);
            if (doAnimate) {
                animate();
            }
        }

        function init() {
            var container = document.getElementById("container");
            rect = container.getBoundingClientRect();

            renderer = new THREE.WebGLRenderer({ antialias: true });
            renderer.setSize(rect.width, rect.height);

            container.appendChild(renderer.domElement);

            scene = new THREE.Scene();
            scene.background = new THREE.Color(0xF8F9FA);
            camera = new THREE.PerspectiveCamera(1, rect.width / rect.height, 1, 1000);
            controls = new OrbitControls(camera, container);

            var axes = new THREE.AxesHelper(1);
            axes.position.set(0, -0.25, 0);
            scene.add(axes);

            var gridHelper = new THREE.GridHelper(1, 5);
            gridHelper.position.set(0, -0.25, 0);
            scene.add(gridHelper);

            var boxGeometry = new THREE.BoxGeometry(1, 1, 1);
            var boxMaterial = new THREE.MeshNormalMaterial();
            var boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
            bb = new THREE.Box3().setFromObject(boxMesh);
            var height = bb.getSize().y;
            var dist = height / 2 / Math.tan(Math.PI * 1 / 360);
            camera.position.set(dist + 25, dist + 25, dist + 25);
            camera.lookAt(boxMesh.position);
            camera.updateProjectionMatrix();

            window.addEventListener('resize', onWindowResize, false);
        }

        function onWindowResize() {
            camera.aspect = (rect.width) / (rect.height);
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width, rect.height);
        }

        function animate() {
            if (rotate === 'X') {
                mesh.rotation.x += 0.01;
            }
            else if (rotate === 'Y') {
                mesh.rotation.y += 0.01;
            }
            else if (rotate === 'Z') {
                mesh.rotation.z += 0.01;
            }
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    }

    renderInstruction(isDragActive) {
        if (this.state.fileRendered) {
            return <br/>;
        }
        return isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'
    }

    renderImage(isDragActive) {
        if (this.state.fileRendered) {
            return <br/>;
        }
        return <div><center><img src="upload.png" alt="Drop Icon" width="100" height="100"/></center></div>
      }

    render() {
        const {link} = this.state;
        if (link) {
            const {currentFile} = this.state;
            if (currentFile) {
                return (
                    <div>
                        <Redirect to={{pathname: link, state: {file: currentFile}}} />
                    </div>
                );
            }
            else {
                this.setState({link: null});
            }
        }

        return (
            <div className="dragDrop">
                <div style={{ height: "100vh", width: "50%", float: "right", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor : "#FFFFFF"}}>
                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: "85%", width: "85%", backgroundColor: "#FFFFFF" }}>
                        <div>
                            <div id="ui-text">Upload</div>
                            <input type="file" ref="fileUploader" onChange={this.getFile.bind(this)} style={{display: 'none'}}/>
                            <Button id="but-upload" type="file" onClick={this.handleClick.bind(this)}>
                                Upload a file...
                            </Button>
                            <div id="ui-text">Orientation</div>
                            <DropdownButton id="but-orientate" title="Select" onSelect={this.onOrientation}>
                                <div style={{width: "500px"}}>
                                    <Dropdown.Item eventKey="XYZ">XYZ</Dropdown.Item>
                                    <Dropdown.Item eventKey="XZY">XZY</Dropdown.Item>
                                    <Dropdown.Item eventKey="YXZ">YXZ</Dropdown.Item>
                                    <Dropdown.Item eventKey="YZX">YZX</Dropdown.Item>
                                    <Dropdown.Item eventKey="ZXY">ZXY</Dropdown.Item>
                                    <Dropdown.Item eventKey="ZYX">ZYX</Dropdown.Item>
                                </div>
                            </DropdownButton>
                            <div id="ui-text">Rotation</div>
                            <DropdownButton id="but-rotate" title="Select" onSelect={this.onRotation}>
                                <div style={{width: "500px"}}>
                                    <Dropdown.Item eventKey="X">X</Dropdown.Item>
                                    <Dropdown.Item eventKey="Y">Y</Dropdown.Item>
                                    <Dropdown.Item eventKey="Z">Z</Dropdown.Item>
                                </div>
                            </DropdownButton>
                            <div id="ui-text">Finish</div>
                            <DropdownButton drop="down" id="but-finish" title="Select" onSelect={this.onFinish}>
                                <div id="scroll" style={{width: "500px", overflowY: "scroll", maxHeight: "315px"}}>
                                    <Dropdown.Item eventKey="Dyed Black">Dyed Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Blue">Dyed Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Bordeaux">Dyed Bordeaux</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Brown">Dyed Brown</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Green">Dyed Green</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Grey">Dyed Grey</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Orange">Dyed Orange</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Petrol Blue">Dyed Petrol Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Purple">Dyed Purple</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Red">Dyed Red</Dropdown.Item>
                                    <Dropdown.Item eventKey="Dyed Yellow">Dyed Yellow</Dropdown.Item>
                                    <Dropdown.Item eventKey="Natural White">Natural White</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Black">Polished and Dyed Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Blue">Polished and Dyed Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Bordeaux">Polished and Dyed Bordeaux</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Brown">Polished and Dyed Brown</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Green">Polished and Dyed Green</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Orange">Polished and Dyed Orange</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Petrol Blue">Polished and Dyed Petrol Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Purple">Polished and Dyed Purple</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Red">Polished and Dyed Red</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished and Dyed Yellow">Polished and Dyed Yellow</Dropdown.Item>
                                    <Dropdown.Item eventKey="Polished Natural White">Polished Natural White</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Black">Satin Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Blue">Satin Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Bordeaux">Satin Bordeaux</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Brown">Satin Brown</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Green">Satin Green</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Orange">Satin Orange</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Petrol Blue">Satin Petrol Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Purple">Satin Purple</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Red">Satin Red</Dropdown.Item>
                                    <Dropdown.Item eventKey="Satin Yellow">Satin Yellow</Dropdown.Item>
                                    <Dropdown.Item eventKey="Spray Painted Black">Spray Painted Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="Spray Painted White">Spray Painted White</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Black">Velvet Black</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Blue">Velvet Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Bordeaux">Velvet Bordeaux</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Green">Velvet Green</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Ochre">Velvet Ochre</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Petrol Blue">Velvet Petrol Blue</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Pink">Velvet Pink</Dropdown.Item>
                                    <Dropdown.Item eventKey="Velvet Yellow">Velvet Yellow</Dropdown.Item>
                                    <Dropdown.Item eventKey="Waterproof White">Waterproof White</Dropdown.Item>
                                </div>
                            </DropdownButton>
                            <div id="ui-text">Material</div>
                            <DropdownButton drop="down" id="but-material" title="Select" onSelect={this.onMaterial}>
                            <div id="scroll" style={{width: "500px", overflowY: "scroll", maxHeight: "315px"}}>
                                <Dropdown.Item eventKey="ABS">ABS</Dropdown.Item>
                                <Dropdown.Item eventKey="Alumide">Alumide</Dropdown.Item>
                                <Dropdown.Item eventKey="Aluminum">Aluminum</Dropdown.Item>
                                <Dropdown.Item eventKey="Brass">Brass</Dropdown.Item>
                                <Dropdown.Item eventKey="Bronze">Bronze</Dropdown.Item>
                                <Dropdown.Item eventKey="Copper">Copper</Dropdown.Item>
                                <Dropdown.Item eventKey="Gold">Gold</Dropdown.Item>
                                <Dropdown.Item eventKey="Gray Resin">Gray Resin</Dropdown.Item>
                                <Dropdown.Item eventKey="High Detail Resin">High Detail Resin</Dropdown.Item>
                                <Dropdown.Item eventKey="High Detail Stainless Steel">High Detail Stainless Steel</Dropdown.Item>
                                <Dropdown.Item eventKey="Mammoth Resin">Mammoth Resin</Dropdown.Item>
                                <Dropdown.Item eventKey="Multicolor+">Multicolor+</Dropdown.Item>
                                <Dropdown.Item eventKey="Polyamide (MJF)">Polyamide (MJF)</Dropdown.Item>
                                <Dropdown.Item eventKey="Polyamide (SLS)">Polyamide (SLS)</Dropdown.Item>
                                <Dropdown.Item eventKey="Polyamide Priority (SLS)">Polyamide Priority (SLS)</Dropdown.Item>
                                <Dropdown.Item eventKey="Polypropylene">Polypropylene</Dropdown.Item>
                                <Dropdown.Item eventKey="Rubber-Like (MJF)">Rubber-Like (MJF)</Dropdown.Item>
                                <Dropdown.Item eventKey="Silver">Silver</Dropdown.Item>
                                <Dropdown.Item eventKey="Standard Resin">Standard Resin</Dropdown.Item>
                                <Dropdown.Item eventKey="Steel">Steel</Dropdown.Item>
                                <Dropdown.Item eventKey="Titanium">Titanium</Dropdown.Item>
                                <Dropdown.Item eventKey="Transparent Resin">Transparent Resin</Dropdown.Item>
                            </div>
                            </DropdownButton>
                            <Button id="ui-submit" type="submit" onClick={this.routeChange}>Request Quote</Button>
                        </div>
                    </div>
                </div>

                <Dropzone onDrop={this.onDrop} noClick={this.state.fileRendered}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                <div style={{ height: "100vh", width: "50%", float: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#FFFFFF"}}>
                    <div
                        id="container"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "85%", width: "85%", backgroundColor: "#F8F9FA" }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div id='renderInfo'> {this.renderImage(isDragActive)} {this.renderInstruction(isDragActive)}</div>
                    </div>
                </div>
                )}
                </Dropzone>
            </div>
        );
    }
}

export default ThreeScene;
