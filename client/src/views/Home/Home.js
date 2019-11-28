import React from 'react';


function Home() {
    return (
        <div style={{ height: "75vh", width: "100%", display: "flex", justifyContent: 'center', alignItems: 'center', backgroundColor : "#FFFFFF"}}>
            <ul>
                <li>
                    <p align="center" style={{fontSize: "45px"}}>
                        Thank you for visiting the Slice Engineering 3D Printing Service Portal.
                    </p>
                </li>
                <li>
                    <p align="center" style={{fontSize: "25px"}}>
                        <br/>
                        We have a variety of printing methods, materials, and finishes available to choose from.
                        <br/>
                        Receive a real time quote by simply uploading your CAD file, selecting the desired 3D printing method,
                        <br/>
                        material, surface finish, and inputting a shipping address.
                        <br/>
                        All quotes include shipping.
                    </p>
                </li>
            </ul>
        </div>
    );
}

export default Home;
