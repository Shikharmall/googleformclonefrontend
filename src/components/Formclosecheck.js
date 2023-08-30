import React,{useState,useEffect} from 'react';
import Responder from './Responder';
import Formclose from './Formclose';

import {URL} from '../api/api';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

export default function Formclosecheck() {

  const [formopen,setFormopen] = useState(true);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formno = queryParams.get('formno');

  
  useEffect(()=>{

    axios.get(`${URL}/api/checkformopen?formno=${formno}`)
    .then((response)=>{
      setFormopen(response.data.data);
    })

  }, [formno]);

  return (
    <>
        {
          formopen? 
          <Responder />
          :
          <Formclose/>
        }
    </>
  )
  
}
