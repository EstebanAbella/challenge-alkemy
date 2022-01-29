import React,{useState,useEffect} from "react";
import axios from "axios";
import '../StylesComponents/stylesRecipes.css'
import plantB from '../img/plantB.png'
import BtnRecipes from "./BtnRecipes";
import Spinner from 'react-bootstrap/Spinner'



function Recipes(props){

    const idMenu = props.data.id
    const headersS = 'Content-Type: application/json'
    const [details, setDetails] = useState([])
    const [loanding, setLoanding] = useState(true)
    const [errorApi, setErrorApi] = useState(false)



    useEffect(
        ()=>{
            axios.get(`https://api.spoonacular.com/recipes/${idMenu}/information?apiKey=9ebe3278eec8417ba79b991ac91fb048&includeNutrition=true`,headersS)
            .then(res =>{
                if(res.data){
                    console.log('details', res.data)
                    setDetails(res.data)
                    setLoanding(false)
                }
            })
            .catch(error=>{
                console.log(error.message);
                setErrorApi(true)
            })

        },
        []
    )



    if(loanding){
        return(
            <div className="recipes">
                <Spinner animation="border" variant="primary" className="spinnerRecipes"/>
                {errorApi &&
                    <div><h1 className="caughtError">Caught an error.</h1></div>
                }
            </div>
        )
    }else{
        return(
            <div className="recipes">
                <div className="titleImgRecipes">
                    <h3>{details.title}</h3>
                    <img src={details.image} alt='imgMenu'></img>
                </div>
                <div className="detailsRecipes">
                    <div className="detRecipes">
                        <div className="circleIconRecipes orange">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-currency-dollar" viewBox="0 0 16 16">
                            <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"/>
                            </svg>
                        </div>
                        <p>${details.pricePerServing} per serving</p>
                    </div>    
                    <div className="detRecipes">
                        <div className="circleIconRecipes red">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-suit-heart" viewBox="0 0 16 16">
                            <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595L8 6.236zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.55 7.55 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
                            </svg>
                        </div>
                        <p>{details.aggregateLikes}<br></br>likes</p>
                    </div>
                    <div className="detRecipes">
                        <div className="circleIconRecipes violet">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                            <path d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                            <path d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                            </svg>
                        </div>
                        <p>ready in {details.readyInMinutes} minutes</p>
                    </div>

                    <div className="detRecipes">
                        <div className="circleIconRecipes green">
                            <img src={plantB} alt='iconVegan'></img>
                        </div>
                        <p>Vegan:<br></br>{details.vegan ===true ? 'Yes' : 'No'}</p> 
                    </div>
                    <div className="detRecipes">
                        <div className="circleIconRecipes yellow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-speedometer2" viewBox="0 0 16 16">
                            <path d="M8 4a.5.5 0 0 1 .5.5V6a.5.5 0 0 1-1 0V4.5A.5.5 0 0 1 8 4zM3.732 5.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707zM2 10a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 10zm9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5zm.754-4.246a.389.389 0 0 0-.527-.02L7.547 9.31a.91.91 0 1 0 1.302 1.258l3.434-4.297a.389.389 0 0 0-.029-.518z"/>
                            <path fillRule="evenodd" d="M0 10a8 8 0 1 1 15.547 2.661c-.442 1.253-1.845 1.602-2.932 1.25C11.309 13.488 9.475 13 8 13c-1.474 0-3.31.488-4.615.911-1.087.352-2.49.003-2.932-1.25A7.988 7.988 0 0 1 0 10zm8-7a7 7 0 0 0-6.603 9.329c.203.575.923.876 1.68.63C4.397 12.533 6.358 12 8 12s3.604.532 4.923.96c.757.245 1.477-.056 1.68-.631A7 7 0 0 0 8 3z"/>
                            </svg>
                        </div>
                        <p>Spoonacular Score: {details.spoonacularScore}%</p>
                    </div>
                </div>

                <BtnRecipes data={details} btnSelecMenu={props.btnSelecMenu} btnDetails={props.btnDetails}/>
            </div>
        )
    }
}

export default Recipes