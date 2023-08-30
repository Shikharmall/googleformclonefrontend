import React,{useState,useEffect} from 'react';
import axios from 'axios';


import {URL} from '../api/api';


//import { debounce } from 'lodash';


import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Box,
    Card, 
    CardBody,
    Text
} from '@chakra-ui/react'

export default function Response() {

  const [dataa, setDataa] = useState([]);

  //const [acceptResponses, setAcceptResponses] = useState(false);

  /*const handleSwitchChange = () => {
    setAcceptResponses(!acceptResponses);
  };*/

  //console.log(acceptResponses);

  
  useEffect(()=>{

    const fetchData = async () => {

    axios.get(`${URL}/api/getresponse`)
    .then((response)=>{
      setDataa(response.data);
    })

  };

  // Call the fetchData function when the component mounts
  fetchData();

  },[]);



 /* const debouncedAPICall = debounce((term) => {
    const fetchData = async () => {

      axios.get(`http://localhost:8000/api/getresponse`)
      .then((response)=>{
        setDataa(response.data);
      })
  
    };
  
    // Call the fetchData function when the component mounts
    fetchData();
  }, 300);

  debouncedAPICall();*/


  return (
    <>
        <Accordion allowMultiple>

          {
            dataa && dataa.length>0
            ?
              dataa.map((item,index)=>(
              
                <AccordionItem key={index}>

                  {/*<FormControl display='flex' >
                    <FormLabel htmlFor='email-alerts' mb='0' color="gray.700">
                      Accepting Response
                    </FormLabel>
                    <Switch id='email-alerts' 
                      checked={acceptResponses}
                      onChange={handleSwitchChange}/>
                    </FormControl>*/}

                  <h2>
                    <AccordionButton>
                      <Box as="span" flex='1' textAlign='left' display="flex">
                        <Box paddingLeft="1.5" paddingRight="1.5"> {item._id.heading} </Box>
                        <Box backgroundColor="blue.500" color="white" paddingLeft="1.5" paddingRight="1.5" width="20px"  borderRadius="12px">{item.emailGroups.length}</Box>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>

                  <AccordionPanel pb={4}>

                    {
                        
                        item.emailGroups && item.emailGroups.length>0 
                        ?

                          item.emailGroups.map((item1,index1)=>(
                            <Card 
                                borderWidth="1px"
                                borderColor="gray.300"
                                borderRadius="md"
                                margin="5px"
                                borderTopWidth="7px" // This adds a thicker border on the top
                                borderTopColor="blue.500" // Set the color of the top border
                            >
                              <CardBody>
                
                                <Text fontSize='1.5xl'>{item1.email}</Text> <br />

                                {
                                  item1.pooraDoc && item1.pooraDoc.length>0 
                                  ?
                                    item1.pooraDoc.map((item2,index2)=>(
                                    <>
                                      <Box display="flex">

                                        <Box>
                                          <Text fontSize='1xl'  color="gray.600"> {item2.question} :</Text>
                                        </Box>

                                        <Box>
                                          <Text fontSize='1xl'>{item2.answer}</Text>
                                        </Box>

                                      </Box>
                                    </>
                                ))

                                      

                                :
                                null
                                }

                                <br />


                                <Box display="flex">
                                  <Box>
                                    <Text fontSize='1xl'  color="gray.600"> Submitted At :</Text>
                                  </Box>
                                  <Box>
                                    <Text fontSize='1xl'>{item1.pooraDoc[0].createdAt}</Text>
                                  </Box>
                                </Box>
                
                              </CardBody>
                
                            </Card>
                          ))
                            
                        :

                        null

                    }

                    

                  </AccordionPanel>

                </AccordionItem>

              ))
            :
                            <Card 
                                borderWidth="1px"
                                borderColor="gray.300"
                                borderRadius="md"
                                margin="5px"
                                borderTopWidth="7px" // This adds a thicker border on the top
                                borderTopColor="blue.500" // Set the color of the top border
                            >
                              <CardBody>


                              <Box paddingLeft="1.5" paddingRight="1.5"> No Response </Box>
                
                              </CardBody>
                
                            </Card>
          }

          

        </Accordion>
    </>
  )
}
