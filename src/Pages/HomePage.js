import React,{useEffect,useState} from "react";
import {useNavigate} from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner'
import Recipes from "../Components/Recipes";
import axios from "axios";
import Navegador from "../Components/Navegador";
import '../StylesPages/stylesHomePage.css'
import DetailCart from "../Components/DetailCart";

//Redux
import {useSelector, useDispatch} from 'react-redux'
import {ResultSerchRecipesAction} from '../Redux/SerchRecipes'
//FIN Redux


function HomePage(){

    const [loanding,setLoanding] = useState(true)
    const headersS = 'Content-Type: application/json'
    
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userLoginToken = useSelector(store => store.NewUserLoginReducer.token)
    const serchRecipes = useSelector(store => store.ResultSerchRecipesReducer.resultSerchRecipes)
    const [errorApi, setErrorApi] = useState(false)

    const msjDetailCart = useSelector(store => store.MsjDetailCartReducer.msjDetail)



    useEffect( 
        ()=>{

            if(Object.keys(userLoginToken).length === 0 ){
                navigate("/login")
            }
            else{
                peticionGet()
            }
        },
        [userLoginToken]
    )

    const peticionGet = async ()=>{
        await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=9ebe3278eec8417ba79b991ac91fb048',headersS)
        .then(res=>{
            console.log(res.data)
            if(res.data){
                setLoanding(false)
                dispatch(ResultSerchRecipesAction(res.data.results))
            }
        })
        .catch(error=>{
            console.log(error.message);
            setErrorApi(true)
        })
    }







    if(loanding){
        return(
            <div className="homePage">
                <Navegador/>

                <section className="homeSpinnerContainer">
                    <Spinner animation="border" variant="primary" className="spinner"/>
                    {errorApi &&
                    <div><h1 className="caughtError">Caught an error.</h1></div>
                    }
                </section>
            </div>
        )
    }else{
        return(
            <div className="homePage">
                <div className={msjDetailCart}>
                    <DetailCart msjDetailBtn={true}/>
                </div>

                <Navegador/>

                <div className="titleHomePage">
                    <h2>Recipes</h2>
                </div>

                <section className="homeItemsContainer">
                    {serchRecipes.map(menIt => <Recipes data={menIt} key={menIt.id} btnSelecMenu={true} btnDetails={true}/>)}
                </section>


            </div>
        )
    }

}

export default HomePage

