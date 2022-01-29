import React,{useState, useEffect} from "react";
import Navegador from "../Components/Navegador";
import {useNavigate} from "react-router-dom";
import Recipes from "../Components/Recipes";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner'
import DetailCart from "../Components/DetailCart";
import '../StylesPages/stylesSearchResultPage.css'

//Redux
import {useSelector} from 'react-redux'
//FIN Redux

function SearchResultPage(){

    const navigate = useNavigate()
    const searchForm = useSelector(store => store.SearchFormReducer.searchFormArray)
    const userLoginToken = useSelector(store => store.NewUserLoginReducer.token)
    const [resultSearch, setResultSearch] = useState([])
    const [errorApi, setErrorApi] = useState(false)
    const [loanding,setLoanding] = useState(true)
    const headersS = 'Content-Type: application/json'
    const msjDetailCart = useSelector(store => store.MsjDetailCartReducer.msjDetail)
    const [msjSerchResult,setMsjSerchResult] = useState(false)

    useEffect( 
        ()=>{

            if(Object.keys(userLoginToken).length === 0){
                navigate("/login")
            }
            else{
                if(Object.keys(searchForm).length === 0){
                    navigate("/")
                }else{
                    peticionGet()
                }
            }
        },
        [userLoginToken,searchForm]
    )

    useEffect(
        ()=>{
            if(Object.keys(resultSearch).length === 0 ){
                setMsjSerchResult(true)
            }else{
                setMsjSerchResult(false)
            }
        },
        [resultSearch]
    )

    const peticionGet = async ()=>{
        await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=9ebe3278eec8417ba79b991ac91fb048&query='+searchForm.search,headersS)
        .then(res=>{
            console.log(res.data)
            if(res.data){
                setLoanding(false)
                setResultSearch(res.data.results)
            }
        })
        .catch(error=>{
            console.log(error.message);
            setErrorApi(true)
        })
    }


    if(loanding){
        return(
            <div className="searchResults">
                <Navegador/>

                <section className="searchSpinnerContainer">
                    <Spinner animation="border" variant="primary" className="spinner"/>
                    {errorApi &&
                    <div><h1 className="caughtError">Caught an error.</h1></div>
                    }
                </section>
            </div>
        )
    }else{
        return(
            <div className="searchResults">

                <div className={msjDetailCart}>
                    <DetailCart msjDetailBtn={true}/>
                </div>

                <Navegador/>

                <div className="titleSearchPage">
                    <h2>Search Results</h2>
                </div>

                <div className="searchResultContainer">
                {!msjSerchResult ?
                    resultSearch?.map(se => <Recipes data={se} key={se.id} btnSelecMenu={true} btnDetails={true}/>)
                    :
                    <div className="msjNoResult">
                        <h1>No results found</h1>
                    </div>
                }
                </div>
            </div>
        )
    }
}

export default SearchResultPage