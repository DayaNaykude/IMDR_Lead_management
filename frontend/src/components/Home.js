import React from 'react';
import { Redirect } from 'react-router-dom';

const Home=({authorized})=>{
    if(!authorized){
        return <Redirect to="/login" />;
    }
    return(
    <div>Home Page</div>
    )
}
export default Home;