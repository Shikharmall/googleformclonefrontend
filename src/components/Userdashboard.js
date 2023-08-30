import React,{useState,useEffect} from 'react';
import Alreadysubmitted from './Alreadysubmitted';
import Formclosecheck from './Formclosecheck';


import {URL} from '../api/api';

import axios from 'axios';

import { useLocation } from 'react-router-dom';

export default function Userdashboard() {

 const [submit,setSubmit] = useState(false);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formno = queryParams.get('formno');

  const [email , setEmail]= useState("");

  useEffect(() => {
    const email = localStorage.getItem('email');
    if(email !== null){
      setEmail(email);
    }
    
  }, []);

  
  useEffect(()=>{

    axios.get(`${URL}/api/checkalreadysubmitted?email=${email}&formno=${formno}`)
    .then((response)=>{
      if(response.data.data === true){
        setSubmit(response.data.data);
      }
    })

  }, [formno,email]);

  
  
  console.log(email);
  
  console.log(formno);
  
  console.log(submit);

  return (
    <>

        {
          submit? 
          <Alreadysubmitted/>
          :
          <Formclosecheck />
        }
      
    </>
  )
}
