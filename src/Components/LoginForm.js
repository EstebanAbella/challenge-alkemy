import React,{useEffect,useState} from "react";
//REACTBOOTSTRAP
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
//FIN REACTBOOTSTRAP
import '../StylesComponents/stylesLoginForm.css'
import axios from "axios";
import swal from '@sweetalert/with-react';
import {useNavigate} from "react-router-dom"

//Redux
import {useDispatch} from 'react-redux'
import {NewUserLoginAction} from '../Redux/LoginUser'
//FIN Redux



function LoginForm(){


    const [loandingForm, setLoandingForm] = useState(false)
    const [form, setForm] = useState ({email:'', password:''})
    const bodyLoginForm = {email:form.email, password:form.password}
    const navigate = useNavigate()
    const [msjFormIncomplete, setMsjFormIncomplete] = useState(false)
    const [msjFormIncompletePass, setMsjFormIncompletePass] = useState(false)
    const dispatch = useDispatch()



    const handleSubmit = (event)=>{
        event.preventDefault()
    }

    const handleChange = (event)=>{
        const name = event.target.name
        const value = event.target.value
        setForm ({...form,[name]:value})


        if(form.email !== ''){
            setMsjFormIncomplete(false)
        }

        if(form.password !== ''){
            setMsjFormIncompletePass(false)
        }
    }



    const handleClick = async ()=>{

        if(form.email === ''){
            setMsjFormIncomplete(true)
        }
        else if (form.password === ''){
            setMsjFormIncompletePass(true)
        }
        else{
            setLoandingForm(true)
            await axios.post('http://challenge-react.alkemy.org/', bodyLoginForm)
            .then(res=>{
                console.log(res.data)
                if(res.data){
                    setLoandingForm(false)
                    dispatch(NewUserLoginAction(res.data))
                    localStorage.setItem('token', JSON.stringify(res.data));
                    navigate("/")
                }
            })
            .catch(error=>{
                console.log(error.message);
                messageErrorLogin()
                setLoandingForm(false)
            })
        }
    }

    const messageErrorLogin = ()=>{
        swal({
            title:'Error',
            content:<div><p>Email: challenge@alkemy.org</p><p>Password: react</p></div>,
            icon:'error',
            button:'Ok',
            timer:'7000'
        })
    }


    return(
        <div className="loginForm">

            <h1>Hotel Mounsants<br></br><span>Restaurant gourmet</span></h1>

            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" required name="email" value={form.email} onChange={handleChange}/>
                    <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                    {msjFormIncomplete && 
                        <p className="msjIncompleteForm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                        <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                        </svg>
                        You must complete it</p>
                    }
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required name="password" value={form.password} onChange={handleChange}/>
                    {msjFormIncompletePass && 
                        <Form.Text className="text-muted">
                            <p className="msjIncompleteForm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                            You must complete it</p>
                        </Form.Text>
                    }
                </Form.Group>

                {loandingForm ?
                     <div className="ContainerSpinnerForm">
                        <Spinner animation="border" variant="primary" className="spinnerLoginForm"/>
                        <p>Loanding ...</p>
                     </div>
                :
                    <Button variant="primary" type="submit" onClick={handleClick}>Submit</Button>                    
                }
            </Form>
        </div>
    )
}

export default LoginForm