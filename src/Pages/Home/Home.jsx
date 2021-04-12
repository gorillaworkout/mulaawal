import React, { Component ,useEffect,useState} from 'react';
import './Home.css'
// import '../../style/Global.css'
import Logo from './../../Assets/newbggw.png'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
// import dataDB from './../../Json/listData.json'
import { TiDelete } from "react-icons/ti";
import debounce from 'lodash.debounce';
import { Link } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { API_URL } from '../../Helpers/apiUrl';
import { connect } from "react-redux";
import {useDispatch} from 'react-redux'
import {LogoutFunc} from './../../redux/Actions'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import numeral from 'numeral';
import {AiOutlinePlusSquare} from 'react-icons/ai'
import {GrEdit} from 'react-icons/gr'
import Axios from 'axios';
import Error from './../../Assets/error.png'
function Home(props){
    const dispatch = useDispatch()

    const [allItem,setAllItem]=useState([])
    const fetch=()=>{
        Axios.get('https://staging.awalmula.co.id/rest/default/V1/products?searchCriteria[pageSize]=10')
        .then((res)=>{
            console.log(res.data.items)
            setAllItem(res.data.items)
        }).catch((err)=>{
            console.log(err)
        })
    }
    useEffect(()=>{
        fetch()
    },[])

    

    const onUpdate=()=>{
        console.log('update')
    }
    const onDelete=()=>{
        console.log('delete')
    }
    const onLogout=()=>{
        localStorage.removeItem('id')
        dispatch(LogoutFunc())
    }
    const onLogin=()=>{
        console.log('login')
    }
    const onTambah=()=>{
        console.log('tambah')
    }

    const onSearch=debounce(function(e){
        if(e.target.value){
            console.log(e.target.value)
            filterSearch(e.target.value)
        }else if(e.target.value == ''){
            fetch()
        }
    },1000)
    
    const filterSearch=(input)=>{
        
        var filterdata = allItem.filter((val)=>{
            console.log(input)
            console.log(val.name)
            // return val.nama_product.toLowerCase() === input.toLowerCase()
            return val.name.toLowerCase().includes(input.toLowerCase())
        })
        console.log(filterdata)
        setAllItem(filterdata)
    }


    const renderDataItem=()=>{
        // var item = dataDB
        var listDataItem= allItem
        return listDataItem.map((val,index)=>{
            // if(val.isdeleted == 0){
                console.log(val.media_gallery_entries[0].file)
                return (
                <div className="box-item" key={index+1}>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:'100%',paddingLeft:5,paddingRight:5}}>
                        {
                            props.isLogin?
                            <>
                                <GrEdit className="delete" size={20} onClick={()=>onUpdate(val.id)}/>
                                <TiDelete className="delete" size={30} onClick={()=>onDelete(val.id)}/>
                            </>
                            :
                            null
                        }

                    </div>
                    <img src={val.media_gallery_entries[0].file} className="data-item" 
                    onError={(e) => (e.target.onerror = null, e.target.src = Error)}/>
                    <div className="box-description">
                            <p className="sku-code">SKU:{val.sku}</p>
                            <p className="product-name">{val.name}</p>
                        <div className="price-description">
                            <p className="price-name">Rp.{numeral(val.price).format('0,0')}</p>
                            <p className="stock-item">Stock:100</p>
                        </div>
                    </div>
    
                </div>
    
                )
            // }
           
        })
    }
 
    return (
        <>
               <div className="outer-home">
                <div className="big-outer-home">
                    <div className="header-home">
                        <div className="header-logo-home">
                            <img src={Logo} className="logo"></img>
                            <p className="logo-name">GorillaPackage</p>
                        </div>
                        <input className="search" type='text' placeholder='Search' onChange={(e)=>onSearch(e)}></input> 
                            {
                                props.isLogin?            
                                    <div  onClick={onLogout} className="btn-login">Logout</div> 
                                    :
                                    <Link to='/pilihan' style={{textDecoration:'none'}}>
                                        <div onClick={onLogin} className="btn-login">Login / Register</div>
                                    </Link>
                            }
                        </div>
                    {
                        props.isLogin?
                        <div className="option-box">
                            <AiOutlinePlusSquare size={30} className="icon-option" onClick={onTambah}/>
                        </div>
                        :
                        null
                    }

                    <div className="header-search">        
                        {renderDataItem()}
                        
                    </div>

                    </div>
                </div>
            
        </>
    )
}
const Mapstatetoprops=({Auth})=>{
    return {
        ...Auth
    }
}

export default (connect(Mapstatetoprops,{})(Home))