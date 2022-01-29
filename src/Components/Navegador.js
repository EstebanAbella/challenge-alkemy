import React,{useState} from "react";
import '../StylesComponents/stylesNavegador.css';
import {Link} from "react-router-dom"
import Logo from './Logo';
import readImg from '../img/readB.png'
import houseImg from '../img/houseB.png'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

//Redux
import {useSelector, useDispatch} from 'react-redux'
import {CloseUserLoginAction} from '../Redux/LoginUser'
import {SearchFormAction} from '../Redux/Search'
//FIN Redux


function Navegador(){

  const [btnResponsive, setBtnResponsive] = useState('')
  const dispatch = useDispatch()
  const userLoginToken = useSelector(store => store.NewUserLoginReducer.token)

  const [form, setForm] = useState ({search:''})


  const handleClickBtn =()=>{
    if(btnResponsive === ''){
    setBtnResponsive('show')
    }else{
      setBtnResponsive('')
    }
  }

  const handleClick =(closeS)=>{
    dispatch(CloseUserLoginAction(closeS))
  }


  const handleSubmit = (event)=>{
    event.preventDefault()
  }

  const serchFormInfo = () =>{
    dispatch(SearchFormAction(form))
  }

  const handleChange = (event)=>{
    const name = event.target.name
    const value = event.target.value
    setForm ({...form,[name]:value})
  }


    return(
    <header>
        <Logo />



        <Form onSubmit={handleSubmit} className="formNav">
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Control type="text" placeholder="search recipes" className="containerInput" name='search' value={form.search} onChange={handleChange}/>
          </Form.Group>
          <Link to="/search"><Button variant="primary" type="submit" className="btnFormNav" onClick={serchFormInfo}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </Button></Link>
        </Form>





        <nav id="navegador" className={btnResponsive}>
            <ul className="nav-menu">
              <li><Link to="/"><img src={houseImg} alt='imgHouse'></img><p>Home</p></Link></li>
              <li><Link to="/menu"><img src={readImg} alt='imgRead'></img><p>Menus</p></Link></li>

              <li onClick={()=>{handleClick(userLoginToken)}} className="btnClose">
                  <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-x-square" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                  <p>Exit</p>
              </li>
            </ul>
        </nav>

        <div className="menu-btn">
          <i onClick ={handleClickBtn}>
            <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </i>
        </div>
    </header>
    )
}

export default Navegador;