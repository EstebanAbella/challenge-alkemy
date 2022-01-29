import React from "react";
import imgLogin from '../img/imgLogin1.jpeg';
import '../StylesComponents/stylesLoginImg.css'



function LoginImg(){
    return(
        <div className="loginImg">
            <img src={imgLogin} alt='ImgLogin' className='imgLogin'></img>
        </div>
    )
}

export default LoginImg