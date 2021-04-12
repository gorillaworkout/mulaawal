import Axios from 'axios'
import {API_URL} from './../../Helpers/apiUrl'
import Swal from 'sweetalert2'
import  { Redirect } from 'react-router-dom'
export const LoginFunc =(dataUsers)=>{
    console.log('login func jalan')
    return {
        type:'LOGIN',
        dataUsers:dataUsers
        
    }
}

export const LogoutFunc=()=>{
    return {
        type:'LOGOUT'
    }
}



export const LoginThunk=(data1,data2)=>{
    const Swal = require('sweetalert2')
    

    return (dispatch)=>{
        console.log('login thunk jalan')
        console.log(data1,' ini bisa email / hp')
        console.log(data2,' ini password')

        Axios.post(` https://staging.awalmula.co.id/rest/V1/integration/admin/token?username=${data1}&password=${data2}`)
        .then((res)=>{
            
            console.log(res.data)
            Swal.fire({
                icon: 'success',
                title: `Selamat Datang`,
                
                                  
            })  

            // var dataLocalStorage =[res.data[0].id, res.data[0].nama]
            // localStorage.setItem('id',JSON.stringify(dataLocalStorage))
            
            localStorage.setItem('id',res.data)
            dispatch({type:'LOGIN',dataUsers:res.data})
            return <Redirect to='/' />
            

            // console.log(filterUser)
        }).catch((err)=>{
            console.log(err)
            Swal.fire({
                icon: 'error',
                title: 'Wrong Password/Email',
                text: 'Check Kembali Data Anda'                    
            })  
        })


    }
}