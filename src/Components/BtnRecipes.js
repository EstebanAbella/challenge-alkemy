import React,{useState,useEffect} from "react";
import Button from 'react-bootstrap/Button'
import swal from '@sweetalert/with-react';
import '../StylesComponents/stylesBtnRecipes.css'

//Redux
import {useSelector, useDispatch} from 'react-redux'
import {NewMenuAction, DeleteMenuAction,EmptyArrayAction} from '../Redux/Menu'
import {MsjDetailCartAction} from '../Redux/MsjDetailCart'
//FIN Redux

function BtnRecipes(props){

    const dispatch = useDispatch()
    const [btnAddClose, setBtnAddClose] = useState(props.btnSelecMenu)
    const respRecipesInMenu = useSelector(store => store.NewMenuReducer.msjRecipesInMenu)
    const menuCart = useSelector(store => store.NewMenuReducer.menuCart)



    useEffect(
        ()=>{
            switch(respRecipesInMenu){
                case 'You must enter two vegan menus and two that are not':
                    dispatch(EmptyArrayAction(''))
                    swal({
                        title:'You must enter two vegan menus and two that are not',
                        icon:'error',
                        button:'Ok',
                        timer:'7000'
                    });
                break
                case 'No more than four menus are allowed, and they must not be repeated':
                    dispatch(EmptyArrayAction(''))
                    swal({
                        title:'No more than four menus are allowed, and they must not be repeated',
                        icon:'error',
                        button:'Ok',
                        timer:'7000'
                    });
                break
                case 'Add menu':
                    dispatch(EmptyArrayAction(''))
                    swal({
                        title:'Add menu',
                        content:<div><p>{props.data.title}</p></div>,
                        icon:'success',
                        button:'Ok',
                        timer:'7000'
                    });
                break
                case '':
                   console.log('ok')
                break
                default:
                    console.log('ok')
            }


            const btnRed = menuCart.filter(nam => nam.id === props.data.id)
            if(Object.keys(btnRed).length > 0){
                setBtnAddClose(false)
            }

        },
        [respRecipesInMenu, menuCart]
    )


    const addRecipesMenu =(addR) =>{
        dispatch(NewMenuAction(addR))
    }

    const deleteRecipesMenu =(deleteR) =>{
        messageDeleteRecipes(deleteR)
    }

    const messageDeleteRecipes = (deleteR)=>{
        swal({
            title:'Remove menu',
            content:<div><p>{props.data.title}</p></div>,
            icon:'warning',
            buttons:['No', true],
        }).then(resp =>{
            if(resp === true){
                setBtnAddClose(true)
                dispatch(DeleteMenuAction(deleteR))
                swal({title:'Remove menu',
                      icon: 'success',
                      button: 'Ok',
                      timer:'7000'  
                })
            }
        })
    }


    const messageDetailCartOk = ()=>{
        dispatch(MsjDetailCartAction('okStyleDetailCart'))
    }




    return(
        <div className="btnRecipes">
            {btnAddClose ?
                <Button variant="primary" onClick={ ()=>{addRecipesMenu(props.data)}}>Add Menu</Button>
            :
                <Button variant="danger" onClick={()=>{deleteRecipesMenu(props.data.id)}}>Remove Menu</Button>
            }
            {props.btnDetails &&
                <Button variant="outline-info" onClick={messageDetailCartOk}>Details</Button>
            }
        </div>
    )
}

export default BtnRecipes