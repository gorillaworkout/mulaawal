import React, { Component,useEffect,useState } from 'react';
import './Login.css'
import Logo from './../../Assets/newbggw.png'
import {BsBackspaceFill,BsPeopleCircle} from 'react-icons/bs'
import { Link } from 'react-router-dom'
import {BsPhone} from 'react-icons/bs'
import {HiOutlineMail} from 'react-icons/hi'
import {RiLockPasswordFill} from 'react-icons/ri'
import debounce from 'lodash.debounce';
import {LoginThunk} from '../../redux/Actions'
import Swal from 'sweetalert2'
import  { Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
import {useDispatch} from 'react-redux'
import { compose } from 'redux';
import { useHistory } from "react-router-dom";

function Login(props){
    const history = useHistory();

    const dispatch = useDispatch()
    const Swal = require('sweetalert2')
    
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phoneNumber,setPhoneNumber] = useState('')
    const [username,setUsername]=useState('')

    const [loginWithEmail,setLoginWithEmail] = useState(true)
    const [loginWithPhone,setLoginWithPhone] = useState(false)

    const [isEmail,setIsEmail] = useState(false)
    const [isPassword,setIsPassword] = useState(false)
    const [isPhoneNumber,setIsPhoneNumber] = useState(false)
    const [isUsername,setIsUsername]=useState(false)



    useEffect(()=>{
        autoLogin()
    },[])

    const onPassword=debounce(function(password){
        // console.log(password)

        // let upperCaseLetters = /[A-Z]/g
        let numbers = /[0-9]/g;    
        if(password.length > 3 && password.length<10){
            console.log('line 49')
            if(password.match(numbers)){
                setPassword(password)
                setIsPassword(true)
                console.log('line 51')
                console.log(isPassword)
            }else if (password === ''){
                setPassword('')
                setIsPassword(false)
            }else if ( password.length >=10){
                console.log('line 58')
                Swal.fire({
                    title: 'Error!',
                    text: 'Password Lebih Dari 8 Digit',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                    })
            }else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Password Harus ada Angka',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                    })
                    setPassword(password)
                    setIsPassword(false)
            }
        }
    },2000)

    const onNumber=(number)=>{
        console.log(number)

        if(number.length > 10 && number.length<= 13){
            setPhoneNumber(number)
            setIsPhoneNumber(true)
        }else if (number.length >=14){
            Swal.fire({
                title: 'Error!',
                text: 'Phone Number Maximum 13 digit',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
              setPhoneNumber('')
              setIsPhoneNumber(false)
        }
      
    }
    const onEmail=debounce(function(email){
        console.log(email)
        if (/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(email)){
            console.log('EMAIL TRUE')
            setEmail(email)
            setIsEmail(true)
            // setErrorEmail(false)
                  
        }else {
            // setErrorEmail(true)
            Swal.fire({
                title: 'Error!',
                text: 'Check Your Email',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
            setEmail('')
            setIsEmail(false)
            console.log('email salah')
        }
    },2000)

    // const onUsername=(username)=>{
        const onUsername=debounce(function(username){
            if(username.length > 3 && username.length < 10){
                setUsername(username)
                setIsUsername(true)
            }else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Check Your Username',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
               setUsername('')
               setIsUsername(false)
            }

        },2000)
    // }


    const onLogin=()=>{     
        console.log(username,password)
        if(loginWithEmail){
            console.log('141 login with email')
            console.log(isUsername, ' username')
            console.log(isPassword,'passowrd')
            if(isUsername && password){
                console.log(email)
                console.log(password)
                // LoginThunk(email,password)
                dispatch(LoginThunk(username,password))
                history.push('/')
            }else{
                Swal.fire({
                    title: 'Error!',
                    text: 'Wrong Password or Email',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        
        }else{
            if(isPhoneNumber && password){
                console.log(phoneNumber)
                console.log(password)
                dispatch(LoginThunk(phoneNumber,password))
                console.log('login jalan')
            }else {
                Swal.fire({
                    title: 'Error!',
                    text: 'Wrong Password or Phone Number',
                    icon: 'error',
                    confirmButtonText: 'Cool'
                  })
            }
        }
    }

    const autoLogin=()=>{
        console.log(props.Auth.isLogin)
        if(props.Auth.isLogin){
            return <Redirect to='/'/>
        }
    }

    const changeOption=()=>{
        if(loginWithEmail){
            setLoginWithPhone(true)
            setLoginWithEmail(false)

        }else {
            setLoginWithEmail(true)
            setLoginWithPhone(false)
        }
        
    }

    return (
        
        <>
        <div className="outer-login">
            <div className="big-outer-login">
                <div className="header-login">
                    <Link to ='/' style={{textDecoration:'none'}}>
                        <BsBackspaceFill size={40}/>
                    </Link>
                    <div className="header-logo-login">
                        <img src={Logo} className="logo-login"></img>
                        <p className="logo-name">GorillaPackage</p>
                    </div>
                    <Link to='/register' style={{textDecoration:'none'}}>
                        <div  className="btn-login">Register</div>
                    </Link>             
                </div>

                <div className="login-search">
                    <div className="login-box">
                        <p style={{fontSize:40,lineHeight:0}}>Login</p> 
                        <div className="login-with"> 
                            {
                                loginWithEmail?
                                <p onClick={changeOption}>Login With Phone Number</p> 
                                :
                                <p onClick={changeOption}>Login With Username</p>     
                            }
                        </div>
                            {
                                loginWithEmail ?
                                <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <HiOutlineMail size={30}/>
                                    <input className="input-data" type='text' placeholder=' Username' onChange={(e)=>onUsername(e.target.value)}></input>         
                                </i>
                                :
                                <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <BsPhone size={30}/>
                                    <input className="input-data" type='number' placeholder=' Phone Number' onChange={(e)=>onNumber(e.target.value)}></input> 
                                </i>
                            }
                                <i style={{display:'flex',flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                                    <RiLockPasswordFill size={30}/>
                                    <input className="input-data" type='password' placeholder=' Password' onChange={(e)=>onPassword(e.target.value)}></input> 
                                </i>
                        <div className="login-btn" onClick={onLogin}>
                            <p>LOGIN</p>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>

        </>
    )
}

const Mapstatetoprops=(state)=>{
    return {
        Auth:state.Auth
    }
}

export default (connect(Mapstatetoprops,{LoginThunk})(Login))