import React from "react";
import './images/IMDRPicture.jpg';
//import { Redirect } from "react-router-dom";
import { useImage } from 'react-image';
const Home=()=>{
const homeStyle={
            margin:"200px" 
}


return(
    
    <div style={homeStyle}>
        <img src="/images/IMDRPicture.jpg" alt="logo"/>
    Home
    </div>
    
)
}
export default Home;