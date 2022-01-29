import React from "react";
import '../StylesComponents/stylesLogo.css'
import {Link} from "react-router-dom"
import starsImg from '../img/starsB.png'

function Logo(){
    return(
        <div className="logo">
            <Link to="/">
                    <h2><span>Hotel</span><img src={starsImg} alt='starsImg'></img><br></br>Mounsants</h2>
            </Link>
        </div>
    )
}

export default Logo;