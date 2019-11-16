import React, {Component} from 'react';
import * as THREE from 'three';
import Dropzone from 'react-dropzone'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';

class ThreeScene extends Component {

    state = {
        fileRendered: false
    }

    onDrop = (files) => {
        var file = files[0];
        this.setState({fileRendered : true});
        this.openFile(file);
    }

    componentWillUnmount() {
        this.mesh = null;
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.controls = null;
    }

    componentDidMount() {
        var mesh, renderer, scene, camera, controls, bb, rect;

        this.openFile = (file) => {
            if (!mesh) {
                init();
                load(file, true);
            }
            else {
                update();
                load(file, false);
            }
        }

        function update() {
            scene.remove(mesh);
            mesh.geometry.dispose();
            mesh.material.dispose();
        }

        function load(file, doAnimate) {
            const tempURL = URL.createObjectURL(file);

            /*const vs = `
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
          `;*/

            var str = file.name.split('.').pop();
            var ext = str.toLowerCase();
            var loader;

            if (ext === 'stl') {
                loader = new STLLoader();
                loader.load(tempURL, function (geometry) {
                    geometry.center();
                    /*var material = new THREE.ShaderMaterial({
                      uniforms: {
                        tMatCap: {
                          type: 't',
                          value: THREE.ImageUtils.loadTexture(process.env.PUBLIC_URL + '/materials/matte.jpg')
                        },
                      },
                      vertexShader: vs,
                      fragmentShader: fs,
                      flatShading: THREE.SmoothShading
                    });
                    material.uniforms.tMatCap.value.wrapS = material.uniforms.tMatCap.value.wrapT = THREE.ClampToEdgeWrapping;*/
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
            var material = new THREE.MeshNormalMaterial();
            mesh = new THREE.Mesh(geometry, material);
            var boundingBox = new THREE.Box3().setFromObject(mesh);
            var sizeHouse = bb.getSize();
            var sizeObject = boundingBox.getSize();
            var ratio = sizeObject.divide(sizeHouse);
            var maxRatio = Math.max(ratio.x, ratio.y, ratio.z);
            var invertRatio = 1 / maxRatio;
            mesh.scale.set(invertRatio, invertRatio, invertRatio);
            mesh.position.set(0, 0.25, 0);
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
            controls.enablePan = false;

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
            mesh.rotation.y += 0.01;
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
        return <div><center><img src="download.svg" alt="Drop Icon" width="100" height="100"/></center></div>
      }

    render() {
        return (
            <div className="dragDrop">
                <div style={{ height: "100vh", width: "50%", float: "right", backgroundColor: "powderblue" }}/>

                <Dropzone onDrop={this.onDrop}>
                    {({ getRootProps, getInputProps, isDragActive }) => (
                <div style={{ height: "100vh", width: "50%", display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div
                        id="container"
                        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "85%", width: "85%", backgroundColor: "#F2F2F2" }}
                        {...getRootProps()}>
                        <input {...getInputProps()} />
                        { this.renderImage(isDragActive) }
                        { this.renderInstruction(isDragActive) }
                    </div>
                </div>
                )}
                </Dropzone>
            </div>
        );
    }
}

export default ThreeScene;
