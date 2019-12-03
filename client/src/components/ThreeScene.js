import React, {Component} from 'react';
import * as THREE from 'three';
import Dropzone from 'react-dropzone'
import Button from 'react-bootstrap/Button';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ReactTooltip from 'react-tooltip';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {STLLoader} from 'three/examples/jsm/loaders/STLLoader';
import {OBJLoader} from 'three/examples/jsm/loaders/OBJLoader';
import {FBXLoader} from 'three/examples/jsm/loaders/FBXLoader';
import {TDSLoader} from 'three/examples/jsm/loaders/TDSLoader';
import {Redirect} from 'react-router-dom';
import Accepted from './Accepted';
var axios = require('axios');
const S3Upload = require('./S3Upload.js');

//Variables that are sent to Price.server.controller
var materialzID = "";
var finishID = "";
var city = ""
var zipcode = ""
var currency = "";
var finishes = [];
var uploadedFile;
var url;

//Variables needed for parsing, searching, different things like that
var supportedFileExtensions = ["stl", "obj", "fbx", "3ds"]
var materialObjects = [];
var finishesObjects = [];
var finishNames = ['please choose a material'];
var materialz = "Polyamide (SLS)";
var countryCodes = ["US"];
var stateCodes = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY",	"NC", "ND", "OH", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"]

function isMaterial(materialPassedIn) {
    return materialPassedIn.name === materialz;
}

class ThreeScene extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentFile: null,
            link: null,
            fileRendered: false,

            //Two lists needed for drop down menus
            materialsList: [''],
            finishList: ["Natural white","Polished natural white","Dyed yellow","Satin Yellow","Polished and Dyed Yellow","Dyed orange","Satin Orange","Polished and Dyed Orange","Dyed red","Satin Red","Polished and Dyed Red","Satin Green","Polished and Dyed Green","Dyed blue","Satin Blue","Polished and Dyed Blue","Dyed purple","Satin Purple","Polished and Dyed Purple","Dyed black","Satin black","Polished and Dyed Black","Dyed bordeaux","Satin Bordeaux","Polished and Dyed Bordeaux","Dyed petrol blue","Satin Petrol Blue","Polished and Dyed Petrol blue","Dyed brown","Satin Brown","Polished and Dyed Brown","Velvet yellow","Velvet ochre","Velvet pink","Velvet bordeaux","Velvet green","Velvet petrol blue","Velvet blue","Velvet black","Spray painted white","Spray painted black","Waterproof white","Dyed green","Dyed grey"],
            mats: [],
            price: '0.00',
            scale: '',
            //Needed to send to Price.server.controller
            coutryCode: '',
            stateCode: '',
            modelID: '',
            finishState: true,
            cartState: true,
            error: ''
        };

        this.handleChangeMaterial = this.handleChangeMaterial.bind(this);
        this.handleChangeFinish = this.handleChangeFinish.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeFileUpload = this.onChangeFileUpload.bind(this)
        this.handleChangeState = this.handleChangeState.bind(this)
        this.handleChangeCountry = this.handleChangeCountry.bind(this)
        this.handleChangeCity = this.handleChangeCity.bind(this)
        this.handleChangeZipcode = this.handleChangeZipcode.bind(this)
        this.handleChangeScale = this.handleChangeScale.bind(this)
        this.handleChangeCurrency = this.handleChangeCurrency.bind(this);
        this.getMats()
        this.handleChangeNext = this.handleChangeNext.bind(this)
    }

    routeChange = () => {
        this.setState({link: '/material'});
    }

    getFile() {
        var file = this.refs.fileUploader.files[0];
        this.renderFile(file);
    }

    handleClick() {
        this.refs.fileUploader.click();
        document.getElementById("renderInstruc").textContent = 'Click me or drag a file to upload!';
    }

    checkExtensionValidity(file) {
      var fileExtension = file.name.substring(file.name.lastIndexOf('.')+1, file.name.length) || file.name;

      if (supportedFileExtensions.includes(fileExtension.toLowerCase())) return true;
      else return false;
    }

    renderFile(file) {
        if (file) {
            if (this.checkExtensionValidity(file)) {
                document.getElementById('infoAndInstruc').style.visibility = 'hidden';
                this.setState({ fileRendered: true });
                this.openFile(file);
                var text = document.getElementById('but-upload');
                text.textContent = file.name;
                this.setState({ currentFile: file });

                S3Upload.upload(file, function (URL) {
                    url = URL
                })
            }
            else {
                this.setState({ fileRendered: false });
                document.getElementById('infoAndInstruc').style.visibility = 'visible';
                document.getElementById("renderInstruc").textContent = "File not accepted. Try again.";
            }
        }
    }

    onDrop = (files) => {
        var file = files[0];
        this.renderFile(file);
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
        var vector = new THREE.Vector3(-1, 0, 0);
        var pause = false;

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
                    vector = new THREE.Vector3(-1, 0, 0);
                }
                else if (type === 'XZY') {
                    vector = new THREE.Vector3(0, 0, 1);
                }
                else if (type === 'YXZ') {
                    vector = new THREE.Vector3(1, 0, 0);
                }
                else if (type === 'YZX') {
                    vector = new THREE.Vector3(0, 1, 0);
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

        this.updateMaterial = (material, finish) => {
            if (uploadedFile) {
                update();
                load(uploadedFile, false);

                material = material.replace(/\s/g, '-');
                finish = finish.replace(/\s/g, '-');
                var materialPath = '/materials/' + material.toLowerCase() + '/' + finish.toLowerCase() + '.png';
                console.log(materialPath);

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
            renderer.setSize(rect.width - 2, rect.height - 2);

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
            document.getElementById("container").addEventListener('mousedown', mousedownfunc, false);
            document.getElementById("container").addEventListener('mouseup', mouseupfunc, false);
        }

        function mousedownfunc() {
            pause = true;
        }

        function mouseupfunc() {
            pause = false;
        }

        function onWindowResize() {
            camera.aspect = (rect.width) / (rect.height);
            camera.updateProjectionMatrix();
            renderer.setSize(rect.width - 2, rect.height - 2);
        }

        function animate() {
            if (!pause) {
                if (rotate === 'X') {
                    mesh.rotation.x += 0.01;
                }
                else if (rotate === 'Y') {
                    mesh.rotation.y += 0.01;
                }
                else if (rotate === 'Z') {
                    mesh.rotation.z += 0.01;
                }
            }
            requestAnimationFrame(animate);
            renderer.render(scene, camera);
        }
    }

    getSupportedFileString() {
      return supportedFileExtensions.join(", ")
    }

    //<-------------------------------------------------------------------------Copied from Material.js Component------------------------------------------------------------------------->
    //Gets the materials and finishes from the API
    getMats = () =>
    {
        axios.get("/api/mat")
        .then((mat) =>
        {
            var matNames = [];
            mat.data.forEach(function(element){
                materialObjects.push(element)
                matNames.push(element.name)
            });
            this.setState({ materialsList: matNames })
            this.setState({mats: mat.data})
        })
    }

    handleChangeNext(value){
        console.log('Sending')
        //Maybe need to send?
        //countryCode: this.state.countryCode, stateCode: this.state.stateCode, city: city, zipcode: zipcode, currency: currency
    }

    //Changes the finishes based on the material chosen
    handleChangeMaterial(eventKey) {
        var string = eventKey.toString();
        var array = string.split(',');
        var index = array[0];
        var name = array[1];
        var text = document.getElementById('but-material');
        text.textContent = name;
        this.setState({finishState: false});

        materialzID = materialObjects[index].materialID;
        finishesObjects = materialObjects[index].finishes

        finishNames = [];
        materialz = name;
        var materialChosen = this.state.mats.find(isMaterial);
        console.log(materialChosen)

        materialChosen.finishes.forEach(function(element){
            finishes.push(element)
            finishNames.push(element.name);
        });

        this.setState({finishList: finishNames, finish: this.state.finishList[0]})
        finishID = finishes[0].finishID;

        this.updateMaterial(name, finishNames[0]);
        document.getElementById('but-material').style.borderColor = "#949494";
        document.getElementById('but-finish').style.borderColor = "#949494";
    }

    checkFinish() {
        if (this.state.finishState) {
            return "Select";
        }
        else {
            return this.state.finishList[0];
        }
    }

    handleChangeFinish(eventKey) {
        var string = eventKey.toString();
        var array = string.split(',');
        var index = array[0];
        var name = array[1];
        var text = document.getElementById('but-finish');
        text.textContent = name;

        finishID = finishes[index].finishID;
        this.setState({finish: name})
        this.updateMaterial(materialz, name);
        document.getElementById('but-finish').style.borderColor = "#949494";
    }

    handleChangeState(eventKey) {
        var string = eventKey.toString();
        var array = string.split(',');
        var index = array[0];
        var name = array[1];
        var text = document.getElementById('but-state');
        text.textContent = name;

        this.setState({stateCode: stateCodes[index]})
        document.getElementById('but-state').style.borderTopColor = "#949494";
        document.getElementById('but-state').style.borderBottomColor = "#949494";
        if (this.state.countryCode) {
            document.getElementById('but-country').style.borderRightColor = "#949494";
        }
        if (currency) {
            document.getElementById('but-currency').style.borderLeftColor = "#949494";
        }
    }

    handleChangeCountry(eventKey) {
        var string = eventKey.toString();
        var array = string.split(',');
        var index = array[0];
        var name = array[1];
        var text = document.getElementById('but-country');
        text.textContent = name;

        this.setState({countryCode: countryCodes[index]})
        if (!this.state.stateCode) {
            document.getElementById('but-country').style.borderTopColor = "#949494";
            document.getElementById('but-country').style.borderBottomColor = "#949494";
            document.getElementById('but-country').style.borderLeftColor = "#949494";
        }
        else {
            document.getElementById('but-country').style.borderColor = "#949494";
        }
    }

    handleChangeCity(event) {
        city = event.target.value
        document.getElementById('but-city').style.borderColor = "#949494";
    }

    handleChangeZipcode(event) {
        zipcode = event.target.value
        document.getElementById('but-zip').style.borderColor = "#949494";
    }

    handleChangeCurrency(eventKey) {
        var text = document.getElementById('but-currency');
        text.textContent = eventKey;
        currency = eventKey;
        if (!this.state.stateCode) {
            document.getElementById('but-currency').style.borderTopColor = "#949494";
            document.getElementById('but-currency').style.borderBottomColor = "#949494";
            document.getElementById('but-currency').style.borderRightColor = "#949494";
        }
        else {
            document.getElementById('but-currency').style.borderColor = "#949494";
        }
    }

    onChangeFileUpload=event=>{
        uploadedFile = event.target.files[0];
    }

    handleSubmit(event) {
        if (materialzID && finishID && this.state.countryCode && this.state.stateCode && city && zipcode && currency && this.state.scale) {
            var text = document.getElementById('priceText');
            text.textContent = "Calculating";
            document.getElementById('wave').style.display = '';
            this.setState({cartState: false});
            this.setState({error: ''});
            event.preventDefault();

            const reactData = {
                material: materialzID,
                finish: finishID,
                countryCode: this.state.countryCode,
                stateCode: this.state.stateCode,
                city: city,
                zipcode: zipcode,
                currency: currency,
                scale: this.state.scale,
                url: url
            }

            //Send the information to Price.server.controller
            axios.post("/api/sendMat", reactData)
                .then((price) => //Get the price back from Price.server.controller
                {
                    console.log(price)
                    this.setState({price: price.data.modelPrice})
                    if (this.state.price == '0') {
                        this.setState({error: "This error will be the error that we will return if the price returned is $0."})
                        text.textContent = "Error";
                        document.getElementById('wave').style.display = 'none';
                    } else {
                      text.textContent = "Add to Cart for: $" + price.data.modelPrice;
                      document.getElementById('wave').style.display = 'none';
                    }
                })
                .catch((err) => {
                    text.textContent = "Error: Please Refresh the Page!";
                    document.getElementById('wave').style.display = 'none';
                    console.log('error', err)
                })
        }
        else {
            if (!materialzID) {
                document.getElementById('but-material').style.borderColor = "#e32c2b";
            }
            if (!finishID) {
                document.getElementById('but-finish').style.borderColor = "#e32c2b";
            }
            if (!this.state.countryCode) {
                document.getElementById('but-country').style.borderColor = "#e32c2b";
            }
            if (!this.state.stateCode) {
                if (this.state.countryCode) {
                    document.getElementById('but-country').style.borderRightColor = "#e32c2b";
                }
                if (currency) {
                    document.getElementById('but-currency').style.borderLeftColor = "#e32c2b";
                }
                document.getElementById('but-state').style.borderTopColor = "#e32c2b";
                document.getElementById('but-state').style.borderBottomColor = "#e32c2b";
            }
            if (!currency) {
                document.getElementById('but-currency').style.borderColor = "#e32c2b";
            }
            if (!city) {
                document.getElementById('but-city').style.borderColor = "#e32c2b";
            }
            if (!zipcode) {
                document.getElementById('but-zip').style.borderColor = "#e32c2b";
            }
            if (!this.state.scale) {
                document.getElementById('but-scale').style.borderColor = "#e32c2b";
            }
        }
    }

    handleChangeScale(eventKey){
        this.state.scale = eventKey/100;
        var text = document.getElementById('but-scale');
        text.textContent = eventKey + '%';

        document.getElementById('but-scale').style.borderColor = "#949494";
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

        const handleSubmit = event => {
            const form = event.currentTarget;
            if (form.checkValidity() === false) {
                event.preventDefault();
                event.stopPropagation();
            }
        }

        return (
            <div>
                <div id="ui-title"> Upload 3D CAD Files</div>
                <div className="renderBody" style={{ marginTop: "35px", display: "flex", justifyContent: 'center'}}>
                    <div>
                        <Dropzone onDrop={this.onDrop} noClick={this.state.fileRendered}>{({ getRootProps, getInputProps, isDragActive }) => (
                            <div>
                                <div id="infoAndInstruc" style={{ position: "absolute", marginRight: "70px", borderStyle: "solid", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "700px", width: "700px", backgroundColor: "#F8F9FA" }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                    <ul>
                                        <li>
                                            <div> <div><center><img src="upload.png" alt="Drop Icon" width="100" height="100"/></center></div> </div>
                                        </li>
                                        <li>
                                            <div id="renderInstruc">{isDragActive ? "Drop it like it's hot!" : 'Click me or drag a file to upload!'}</div>
                                        </li>
                                    </ul>
                                </div>

                                <div id="container" style={{ postion: "absolute", marginRight: "70px", borderStyle: "solid", display: 'flex', justifyContent: 'center', alignItems: 'center', height: "700px", width: "700px", backgroundColor: "#F8F9FA" }} {...getRootProps()}>
                                    <input {...getInputProps()} />
                                </div>
                            </div>
                        )}
                        </Dropzone>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: "700px", width: "500px", backgroundColor: "#FFFFFF" }}>
                        <div>
                            <div id="ui-text"><a data-tip data-for='upload'> Upload </a></div>
                            <div>
                                <ReactTooltip id='upload' type='warning' effect='solid' place={'right'}>
                                    <span>supported files are {this.getSupportedFileString()}</span>
                                </ReactTooltip>
                                <input type="file" ref="fileUploader" onChange={this.getFile.bind(this)} style={{ display: 'none' }} />
                                <Button id="but-upload" type="file" onClick={this.handleClick.bind(this)}>
                                    Upload a file ({this.getSupportedFileString()})
                                </Button>
                            </div>

                            <ButtonGroup>
                                <ul style={{ zIndex: 3 }}>
                                    <li>
                                        <div id="ui-text">Orientation</div>
                                    </li>
                                    <li>
                                        <DropdownButton id="but-orientate" title="Select" onSelect={this.onOrientation}>
                                            <div style={{ width: "167px" }}>
                                                <Dropdown.Item eventKey="XYZ">XYZ</Dropdown.Item>
                                                <Dropdown.Item eventKey="XZY">XZY</Dropdown.Item>
                                                <Dropdown.Item eventKey="YXZ">YXZ</Dropdown.Item>
                                                <Dropdown.Item eventKey="YZX">YZX</Dropdown.Item>
                                                <Dropdown.Item eventKey="ZXY">ZXY</Dropdown.Item>
                                                <Dropdown.Item eventKey="ZYX">ZYX</Dropdown.Item>
                                            </div>
                                        </DropdownButton>
                                    </li>
                                </ul>

                                <ul style={{ zIndex: 1 }}>
                                    <li>
                                        <div id="ui-text">Rotation</div>
                                    </li>
                                    <li>
                                        <DropdownButton id="but-rotate" title="Select" onSelect={this.onRotation}>
                                            <div style={{ width: "166px" }}>
                                                <Dropdown.Item eventKey="X">X</Dropdown.Item>
                                                <Dropdown.Item eventKey="Y">Y</Dropdown.Item>
                                                <Dropdown.Item eventKey="Z">Z</Dropdown.Item>
                                            </div>
                                        </DropdownButton>
                                    </li>
                                </ul>

                                <ul style={{ zIndex: 2 }}>
                                    <li>
                                        <div id="ui-text">Scale</div>
                                    </li>
                                    <li>
                                        <DropdownButton id="but-scale" title="Select" onSelect={this.handleChangeScale}>
                                            <div style={{ width: "167px" }}>
                                                <Dropdown.Item eventKey="20">20%</Dropdown.Item>
                                                <Dropdown.Item eventKey="50">50%</Dropdown.Item>
                                                <Dropdown.Item eventKey="70">70%</Dropdown.Item>
                                                <Dropdown.Item eventKey="100">100%</Dropdown.Item>
                                            </div>
                                        </DropdownButton>
                                    </li>
                                </ul>
                            </ButtonGroup>

                            <div id="ui-text">Material</div>
                            <DropdownButton id="but-material" title="Select" onSelect={this.handleChangeMaterial}>
                                <div id="scroll" style={{ width: "500px", overflowY: "scroll", maxHeight: "315px" }}>
                                    {this.state.materialsList.map((x, y) => <Dropdown.Item style={{ textTransform: "capitalize" }} eventKey={[y, x]}>{x}</Dropdown.Item>)}
                                </div>
                            </DropdownButton>

                            <div id="ui-text">Finish</div>
                            <DropdownButton disabled={this.state.finishState} id="but-finish" title={this.checkFinish()} onSelect={this.handleChangeFinish}>
                                <div id="scroll" style={{ width: "500px", overflowY: "scroll", maxHeight: "315px" }}>
                                    {this.state.finishList.map((x, y) => <Dropdown.Item style={{ textTransform: "capitalize" }} eventKey={[y, x]}>{x}</Dropdown.Item>)}
                                </div>
                            </DropdownButton>
                            
                            <ButtonGroup>
                                <ul>
                                    <Button id="ui-submit" type="submit" onClick={this.handleSubmit}> Request Quote </Button>
                                </ul>

                                <ul>
                                    <Button disabled={this.buttonDisabledState} id="ui-price">
                                        <ul style={{ display: 'flex', justifyContent: "center", alignItems: 'center' }}>
                                            <li id="priceText">
                                                Add to Cart for: ${this.state.price}
                                            </li>
                                            <li>
                                                <div id="wave" style={{ display: "none" }}>
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                    <span className="dot"></span>
                                                </div>
                                            </li>
                                        </ul>

                                    </Button>
                                </ul>
                            </ButtonGroup>
                        </div>
                    </div>
                </div>
                <div id="ui-error-statement">
                    {this.state.error}
                </div>
            </div>
        );
    }
}

export default ThreeScene;
