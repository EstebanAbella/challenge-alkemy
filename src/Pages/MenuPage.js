import React,{useEffect,useState} from "react";
import Navegador from "../Components/Navegador";
import {useNavigate} from "react-router-dom"
import Recipes from "../Components/Recipes";
import '../StylesPages/stylesMenuPage.css';
import DetailCart from "../Components/DetailCart";

//Redux
import {useSelector} from 'react-redux'
//FIN Redux

function MenuPage (){

    const navigate = useNavigate()
    const userLoginToken = useSelector(store => store.NewUserLoginReducer.token)
    const menuCart = useSelector(store=> store.NewMenuReducer.menuCart)
    const [msjMenuCart, setMsjMenuCart] = useState(false)


    useEffect( 
        ()=>{

            if(Object.keys(userLoginToken).length === 0 ){
                navigate("/login")
            }

            if(Object.keys(menuCart).length === 0 ){
                setMsjMenuCart(true)
            }

        },
        [userLoginToken,menuCart]
    )

     

    return(
        <div className="menuPage">
            <Navegador/>

            <div className="titleMenuPage">
                <h2>Selected Menus</h2>
            </div>
            
            <div className="cartMenuContainers">
                {!msjMenuCart ?
                menuCart.map(menC => <Recipes data={menC} key={menC.id} btnSelecMenu={false} btnDetails={false}/>)
                :
                <div className="msjMenuContainer">
                    <h1>You have not selected menu</h1>
                </div>
                }
            </div>

            <div>
                <DetailCart msjDetailBtn={false}/>
            </div>

        </div>
    )
}

export default MenuPage