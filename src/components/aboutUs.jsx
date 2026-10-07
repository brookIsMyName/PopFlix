import React from "react";
import { Link } from "react-router-dom";
import NavbarMain from "./NavbarDefault";
const About = () => {
    return(
        <div>
            <NavbarMain/>
        <div className="bg-[#050301] w-screen h-screen flex flex-col justify-center items-center">
            <h1 style={{color:"#ffbf00"}} className="font-serif">Why For Free You Ask? </h1>
            <h3 className="text-white font-serif">- Beacuse why not?</h3>
            

        </div>
        </div>
    )
}

export default About;