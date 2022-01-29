import React,{useState,useEffect} from "react";
import '../StylesComponents/stylesDetailCart.css'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'

//Redux
import {useSelector, useDispatch} from 'react-redux'
import {MsjDetailCartAction} from '../Redux/MsjDetailCart'
//FIN Redux

function DetailCart(props){

    const menuCart = useSelector(store=> store.NewMenuReducer.menuCart)
    const [priceTotal,setPriceTotal] = useState()
    const [preparationTime, setPreparationTime] = useState()
    const [healthScoreTime,sethealthScoreTime] = useState()
    const dispatch = useDispatch()



    useEffect( 
        ()=>{
                priceTotalMenu()
                timeTotalMenu()
                healthScoreTotalMenu()
        },
        [menuCart]
    )


    const priceTotalMenu = () => {
        var sumarPrice = menuCart.map((saldo) => parseFloat(saldo.pricePerServing))
          .reduce((previous, current) => {
            return previous + current;
          }, 0);
        const sumarPriceD = sumarPrice.toFixed(2)  
        setPriceTotal(sumarPriceD);
    };

    const timeTotalMenu = () => {
        const sumar = menuCart.map((saldo) => parseFloat(saldo.readyInMinutes))
          .reduce((previous, current) => {
            return previous + current;
          }, 0);
          setPreparationTime(sumar);
    };

    const healthScoreTotalMenu = () => {
        const sumar = menuCart.map((saldo) => parseFloat(saldo.healthScore))
          .reduce((previous, current) => {
            return previous + current;
          }, 0);
          sethealthScoreTime(sumar);
    };



    const messageDetailCartNo = ()=>{
      dispatch(MsjDetailCartAction('noStyleDetailCart'))
  }


  return(
      <div className="detailsCart">
          <Card className="cardDetails">
          <Card.Header>
            <div  className="cardHeader">
            <h3>Total selected menus</h3>
            {props.msjDetailBtn === true &&
              <Button variant="danger" onClick={messageDetailCartNo}>X</Button>
            }
            </div>
          </Card.Header>
              <Card.Body>
                  <blockquote className="blockquote mb-0">
                      <p>Total price ${priceTotal}</p>
                      <p>Ready in {preparationTime} minutes</p>
                      <p>Health score among all menu {healthScoreTime}</p>
                      <footer className="blockquote-footer">
                      Total <cite title="Source Title">accumulated data</cite>
                      </footer>
                  </blockquote>
              </Card.Body>
          </Card>
      </div>
  )
}

export default DetailCart