import React, {Component} from 'react';
import * as THREE from 'three';
import Dropzone from 'react-dropzone'
import Button from "react-bootstrap/Button";
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

class ThreeScene extends Component {

    state = {
        fileRendered: false
    }

    getFile() {
        document.getElementById('renderInfo').style.display = 'none';
        var file = this.refs.fileUploader.files[0];
        if (file) {
            this.setState({fileRendered : true});
            this.openFile(file);
            var text = document.getElementById('but-upload');
            text.textContent = file.name;
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
    }

    onOrientation = (eventKey) => {
        this.updateOrientation(eventKey);
        var text = document.getElementById('but-orientate');
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
        var rotate = 'z';
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
                if (type === 'xyz') {
                    vector = new THREE.Vector3(0, 1, 0);
                }
                else if (type === 'xzy') {
                    vector = new THREE.Vector3(0, 0, 1);
                }
                else if (type === 'yxz') {
                    vector = new THREE.Vector3(1, 0, 0);
                }
                else if (type === 'yzx') {
                    vector = new THREE.Vector3(-1, 0, 0);
                }
                else if (type === 'zxy') {
                    vector = new THREE.Vector3(0, 0, -1);
                }
                else if (type === 'zyx') {
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

                if (material === 'copper') {
                    materialPath = '/materials/copper.png';
                }
                else if (material === 'matte') {
                    materialPath = '/materials/matte.jpg';
                }
                else if (material === 'glossy') {
                    materialPath = '/materials/glossy.jpg';
                }
                else if (material === 'aluminum') {
                    materialPath = '/materials/alum.jpg';
                }
                else if (material === 'pearl') {
                    materialPath = '/materials/pearl.jpg';
                }
                else if (material === 'rose') {
                    materialPath = '/materials/rose.jpg';
                }
                else if (material === 'bronze') {
                    materialPath = '/materials/bronze.png';
                }
                else if (material === 'magenta') {
                    materialPath = '/materials/magenta.jpg';
                }
                else if (material === 'gold') {
                    materialPath = '/materials/gold.png';
                }
                else if (material === 'topaz') {
                    materialPath = '/materials/topaz.png'
                }
                else if (material === 'turquoise') {
                    materialPath = '/materials/turquoise.jpg';
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
            scene.background = new THREE.Color(0xF2F2F2);
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
            if (rotate === 'x') {
                mesh.rotation.x += 0.01;
            }
            else if (rotate === 'y') {
                mesh.rotation.y += 0.01;
            }
            else if (rotate === 'z') {
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
        return (
            <div className="dragDrop">
                <div style={{ height: "100vh", width: "50%", float: "right", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor : "#F8F9FA"}}>
                    <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: "85%", width: "85%", backgroundColor: "#F8F9FA" }}>
                        <div>
                            <div id="ui-text">Upload file</div>
                            <input type="file" ref="fileUploader" onChange={this.getFile.bind(this)} style={{display: 'none'}}/>
                            <Button id="but-upload" type="file" onClick={this.handleClick.bind(this)}>
                                Upload a file...
                            </Button>
                            <div id="ui-text">Fix orientation</div>
                            <DropdownButton id="but-orientate" title="Select" onSelect={this.onOrientation}>
                                <Dropdown.Item eventKey="xyz">XYZ</Dropdown.Item>
                                <Dropdown.Item eventKey="xzy">XZY</Dropdown.Item>
                                <Dropdown.Item eventKey="yxz">YXZ</Dropdown.Item>
                                <Dropdown.Item eventKey="yzx">YZX</Dropdown.Item>
                                <Dropdown.Item eventKey="zxy">ZXY</Dropdown.Item>
                                <Dropdown.Item eventKey="zyx">ZYX</Dropdown.Item>
                            </DropdownButton>
                            <div id="ui-text">Fix rotation</div>
                            <DropdownButton id="but-rotate" title="Select" onSelect={this.onRotation}>
                                <Dropdown.Item eventKey="x">X</Dropdown.Item>
                                <Dropdown.Item eventKey="y">Y</Dropdown.Item>
                                <Dropdown.Item eventKey="z">Z</Dropdown.Item>
                            </DropdownButton>
                            <div id="ui-text">Type of printing service</div>
                            <DropdownButton id="ui-dropdown" title="Select">
                                <Dropdown.Item eventKey="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item eventKey="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item eventKey="#/action-3">Something else</Dropdown.Item>
                            </DropdownButton>
                            <div id="ui-text">Material</div>
                            <DropdownButton id="but-material" title="Select" onSelect={this.onMaterial}>
                                <Dropdown.Item eventKey="copper">Copper</Dropdown.Item>
                                <Dropdown.Item eventKey="matte">Matte</Dropdown.Item>
                                <Dropdown.Item eventKey="glossy">Glossy</Dropdown.Item>
                                <Dropdown.Item eventKey="aluminum">Aluminum</Dropdown.Item>
                                <Dropdown.Item eventKey="pearl">Pearl</Dropdown.Item>
                                <Dropdown.Item eventKey="rose">Rose</Dropdown.Item>
                                <Dropdown.Item eventKey="bronze">Bronze</Dropdown.Item>
                                <Dropdown.Item eventKey="magenta">Magenta</Dropdown.Item>
                                <Dropdown.Item eventKey="gold">Gold</Dropdown.Item>
                                <Dropdown.Item eventKey="topaz">Topaz</Dropdown.Item>
                                <Dropdown.Item eventKey="turquoise">Turquoise</Dropdown.Item>
                            </DropdownButton>
                            <Button id="ui-submit" type="submit">Request Quote</Button>
                        </div>
                    </div>
                </div>

                <Dropzone onDrop={this.onDrop} noClick={this.state.fileRendered}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                <div style={{ height: "100vh", width: "50%", float: "left", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: "#F8F9FA"}}>
                    <div
                        id="container"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "85%", width: "85%", backgroundColor: "#F2F2F2" }}
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
