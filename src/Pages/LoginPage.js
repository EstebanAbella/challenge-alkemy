import React from "react";
import LoginForm from "../Components/LoginForm";
import LoginImg from "../Components/LoginImg";


const styles={
    loginPage:{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgb(255,255,255)',
    }
}

function LoginPage(){
    return(
        <div className="loginPage" style={styles.loginPage}>
            <LoginForm />
            <LoginImg />
        </div>
    )
}

export default LoginPage