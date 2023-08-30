import React,{useState,useEffect} from 'react';

import {URL} from '../api/api';

import { Card, CardBody ,Text ,Stack ,Input} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';

import { useLocation } from 'react-router-dom';

import { Wrap , Radio, RadioGroup } from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';

import axios from 'axios';

export default function Responder() {


  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const formno = queryParams.get('formno');

  
  const [email , setEmail]= useState("");
  
  const [headingg , setHeadingg]= useState("");


  const toast = useToast();

  const [dataa, setDataa] = useState([]);

  useEffect(() => {
    const email = localStorage.getItem('email');
    if(email !== null){
      setEmail(email);
    }
    
  }, []);
  
  useEffect(()=>{
    axios.get(`${URL}/api/getquestion?formno=${formno}`)
    .then((response)=>{
      setDataa(response.data);
      setHeadingg(response.data[0].heading)
    })

  }, [formno]);

  const [formData, setFormData] = useState([
    { heading: '', email:'', question:'', answer: ''} 
  ]);


  const handleInputChange = (e, index, question,heading) => {

    const newValue = e.target.value;
    const updatedData = [...formData];
    updatedData[index] = {heading: heading , email:email, formno:formno, question:question , answer: newValue };

    setFormData(updatedData);

  };

  const [selectedFile, setSelectedFile] = useState(null);

  //console.log(formData);

  const handleInputFileChange = (e, index, question,heading) => {

    /*const valobj = {
      imagename:e.target.files[0].name,
      image:e.target.files[0]
    }

    const newValue = JSON.stringify(valobj);*/

    setSelectedFile(e.target.files[0]);

    const newValue = e.target.files[0].name;
    //const newValue = e.target.files[0];
    const updatedData = [...formData];
    updatedData[index] = { heading: heading ,email:email, formno:formno, question:question ,  answer: newValue };
    setFormData(updatedData);

  };

  console.log(selectedFile);
  
  
  console.log(formData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //formData.append('image', selectedFile);
    
    try {
      const response = await fetch(`${URL}/api/addanswer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          //'Content-Type': 'multipart/form-data',
        },
        body: JSON.stringify(formData),
       // body: formData,
      });
      const data = await response.json();

      console.log(data);

      if(!data.error){
        /*toast({
          title: "Submitted",
          status: 'success',
          duration: 3000,
          isClosable: true,
        });*/
        //window.location.reload();
        window.location.href=`/responder?formno=${formno}`;
      }
      else{
        toast({
          title: data.error.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }


      // Handle response data
    } catch (error) {
      //console.log(error);
      toast({
        title: error.message,
        status: 'error',
        duration: 6000,
        isClosable: true,
      });

    }
  };

  return (
    <>
          <br />
            <Card 
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                margin="5px"
                borderTopWidth="7px" // This adds a thicker border on the top
                borderTopColor="blue.500" // Set the color of the top border
            >
              <CardBody>

                <Text >
                  { 
                    headingg
                  }
                </Text>

                
                <Text color='blue'>{email}</Text>

              </CardBody>

            </Card>

          {
            dataa && dataa.length>0
            ? dataa.map((item,index)=>(
                <Card 
                  borderWidth="1px"
                  borderColor="gray.300"
                  borderRadius="md"
                  margin="5px"
                  key={index}
                >
                 <CardBody>
       
                  <Text>{item.question}</Text>
      
                   <hr /> 
                   <br />

                    {
                      (item.type === "1")?
                      <>
                        <Input type="text" name="answer" placeholder='Enter Your Answer' onChange={(e) => handleInputChange(e, index,item.question,item.heading)} />
                        
                      </>
                      :
                      null
                    }

                    {/*onChange={(e) => {
                            setSelectedValue(e.target.value); // Call the setValue function here
                            handleInputChange(e, index, item.question);
                          }}
                        value={selectedValue} */}

                    {
                      (item.type === "2")?
                        <RadioGroup>
                          <Stack direction='column'>
                            {
                              item.option0 ?
                                <Radio
                                  value={item.option0} 
                                  name='answer' 
                                  onChange={(e) => {
                                    //setSelectedValue(e.target.value); // Call the setValue function here
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option0}</Radio>
                              :
                              null
                            }
                            {
                              item.option1 ?
                                <Radio
                                  value={item.option1} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option1}</Radio>
                              :
                              null
                            }
                            {
                              item.option2 ?
                                <Radio
                                  value={item.option2} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option2}</Radio>
                              :
                              null
                            }
                            {
                              item.option3 ?
                                <Radio
                                  value={item.option3} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option3}</Radio>
                              :
                              null
                            }
                            {
                              item.option4 ?
                                <Radio
                                  value={item.option4} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option4}</Radio>
                              :
                              null
                            }
                            {
                              item.option5 ?
                                <Radio
                                  value={item.option5} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option5}</Radio>
                              :
                              null
                            }
                            {
                              item.option6 ?
                                <Radio
                                  value={item.option6} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option6}</Radio>
                              :
                              null
                            }
                            {
                              item.option7 ?
                                <Radio
                                  value={item.option7} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option7}</Radio>
                              :
                              null
                            }
                            {
                              item.option8 ?
                                <Radio
                                  value={item.option8} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option8}</Radio>
                              :
                              null
                            }
                            {
                              item.option9 ?
                                <Radio
                                  value={item.option9} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option9}</Radio>
                              :
                              null
                            }
                          </Stack>
                        </RadioGroup>
                      :
                      null
                    }


                    {
                      (item.type === "3")?
                        <RadioGroup>
                          <Stack direction='column'>
                            {
                              item.option0 ?
                                <Radio
                                  value={item.option0} 
                                  name='answer' 
                                  onChange={(e) => {
                                    //setSelectedValue(e.target.value); // Call the setValue function here
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option0}</Radio>
                              :
                              null
                            }
                            {
                              item.option1 ?
                                <Radio
                                  value={item.option1} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option1}</Radio>
                              :
                              null
                            }
                            {
                              item.option2 ?
                                <Radio
                                  value={item.option2} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option2}</Radio>
                              :
                              null
                            }
                            {
                              item.option3 ?
                                <Radio
                                  value={item.option3} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option3}</Radio>
                              :
                              null
                            }
                            {
                              item.option4 ?
                                <Radio
                                  value={item.option4} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option4}</Radio>
                              :
                              null
                            }
                            {
                              item.option5 ?
                                <Radio
                                  value={item.option5} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option5}</Radio>
                              :
                              null
                            }
                            {
                              item.option6 ?
                                <Radio
                                  value={item.option6} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option6}</Radio>
                              :
                              null
                            }
                            {
                              item.option7 ?
                                <Radio
                                  value={item.option7} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option7}</Radio>
                              :
                              null
                            }
                            {
                              item.option8 ?
                                <Radio
                                  value={item.option8} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option8}</Radio>
                              :
                              null
                            }
                            {
                              item.option9 ?
                                <Radio
                                  value={item.option9} 
                                  name='answer' 
                                  onChange={(e) => {
                                    handleInputChange(e, index, item.question,item.heading);
                                  }} 
                                >{item.option9}</Radio>
                              :
                              null
                            }
                          </Stack>
                        </RadioGroup>
                      :
                      null
                    }

                    {
                      (item.type === "4")?
                        <Input type="file" accept="image/*" p="1" onChange={(e) => handleInputFileChange(e, index,item.question,item.heading)} /> 
                      :
                      null
                    }
      
                   <br /> <br />
      
                 </CardBody>
                </Card>
            ))
            :null
          }

        <br />

        <Wrap>
          <Button colorScheme='blue' m='5' onClick={handleSubmit}>Submit</Button>
        </Wrap>

      
    </>
  )
}

