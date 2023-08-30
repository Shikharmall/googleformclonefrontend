import React,{useState} from 'react';

import img from "../img/image.png";
import img1 from "../img/text.png";

import { Image } from '@chakra-ui/react';

import  '../css/common.css';

import {URL} from '../api/api';

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Editable, 
  EditableInput, 
  EditablePreview, 
  Input, 
  Card, 
  CardBody, 
  Wrap, 
  Button, 
  Tooltip,
  useToast,
  useDisclosure,
  Text
} from '@chakra-ui/react';

import copy from 'clipboard-copy';

export default function Question() {

  const currentLink = window.location.href;

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cards, setCards] = useState([[''],[''],[''],[''],[''],[''],[''],['']]);

  const handleAddInput = (arrayIndex) => {
    const newInputArrays = [...cards];
    newInputArrays[arrayIndex].push('');
    setCards(newInputArrays);
  };

  const [formData, setFormData] = useState([
    { heading:'', question: '', type: '', option0: '', option1: '', option2: '', option3: '', option4: '', option5: '', option6: '', option7: '', option8: '', option9: ''} 
  ]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newData = [...formData];
    newData[index][name] = value;
    if(index !== 0 ){
      newData[index]['heading'] =  newData[0]['heading'];
    }
    setFormData(newData);
    //console.log(formData);
  };

  const [solntyp, setSolntyp] = useState(0);

  const solutiontype = (index,value) => {

    setSolntyp(value);

    const newData = [...formData];
    newData[index]["type"] = value;
    setFormData(newData);
    //console.log(formData);
    
  };

  const handleAddField = () => {
    setFormData([...formData, { heading:'', question: '', type: '', option0: '', option1: '', option2: '', option3: '', option4: '', option5: '', option6: '', option7: '', option8: '', option9: ''}]);
  };


    const [formno , setFormno] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${URL}/api/addquestion`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        const data = await response.json();

        console.log(data);

        if(!data.error){
          onOpen(true);
          setFormno(data.formno);
        }
        else{
          toast({
            title: data.error.message,
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }

      } catch (error) {
        toast({
          title: error.message,
          status: 'error',
          duration: 6000,
          isClosable: true,
        });
  
      }
    };

    const toast = useToast();

    const handleCopyClick = async () => {
      try {
        const text=`${currentLink}responder?formno=${formno}`;
        await copy(text);
        toast({
          title: 'Copied!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } catch (error) {
        console.error('Copy failed', error);
      }
    };

    


    const alldone = async () => {
      try {

        //window.location.reload();

        setCards([[''],[''],[''],[''],[''],[''],[''],['']]);
        setFormData([{ heading:'', question: '', type: '', option0: '', option1: '', option2: '', option3: '', option4: '', option5: '', option6: '', option7: '', option8: '', option9: ''}]);
        
        onClose();


      } catch (error) {
        console.error(error);
      }
    };

    console.log(formData);



  return (
    <>
        <Card 
            borderWidth="1px"
            borderColor="gray.300"
            borderRadius="md"
            margin="5px"
            borderTopWidth="7px" // This adds a thicker border on the top
            borderTopColor="blue.500" // Set the color of the top border
        >
          {/*<CardBody>
            <Editable placeholder='Unititled Form'>
              <EditablePreview />
              <EditableInput type='text' name='heading' onChange={(e) => handleInputChange(e,0)} value={formData[0].heading}/>

            </Editable>
             </CardBody>*/}

          <div className='headinginput'>
              <input type="text" placeholder='Unititled Form' name='heading' onChange={(e) => handleInputChange(e,0)} value={formData[0].heading} />
          </div> 
        </Card>

        {formData.map((fields,index1) => (
            <Card key={index1}
                borderWidth="1px"
                borderColor="gray.300"
                borderRadius="md"
                margin="5px"
            >
              <CardBody>
   
                {/*<Editable placeholder='Untitled Question'>
                  <EditablePreview />
                  <EditableInput  name="question" onChange={(e) => handleInputChange(e, index1)}  value={formData[index1].question}/>
                  </Editable>*/}

                    <div className='headingquestioninput'>
                        <input type="text" placeholder='Untitled Question' name='question' onChange={(e) => handleInputChange(e, index1)}  value={formData[index1].question} />
                    </div> 

                <hr /> 

                  <>
   
                    <br />
                    <Wrap backgroundColor="gray.100" borderRadius="8px" width="165px" display='flex'>
                        <Tooltip label='Text'>
                            <Button color='white' onClick={()=>solutiontype(index1,1)} >
                                  <Image
                                    src={img1}
                                    alt="My Image"
                                    width ="20px"
                                    height="20px"
                                    objectFit="cover"
                                  />
                            </Button>
                        </Tooltip>
                        <Tooltip label='Option'>
                            <Button color='blue' onClick={()=>solutiontype(index1,2)} width ="20px">
                              &#9678;
                            </Button>
                        </Tooltip>
                        {/*<Tooltip label='Multiple Option'>
                            <Button color='blue' onClick={()=>solutiontype(index1,3)} width ="20px">
                            &#9634;
                            </Button>
        </Tooltip>*/}
                        <Tooltip label='Image'>
                            <Button color='white' onClick={()=>solutiontype(index1,4)}>
                                  <Image
                                    src={img}
                                    alt="My Image"
                                    width ="20px"
                                    height="20px"
                                    objectFit="cover"
                                  />
                            </Button>
                        </Tooltip>
                    </Wrap>

                  </>

                <br />

                {/*
                 (solntyp ===2 || solntyp ===3)
                 ?

                  <>
                  
                    {cards.map((card,index) => (
                      <div key={index}>
                          <Editable placeholder='Untitled Option' key={index}>
                              <EditablePreview />
                              <EditableInput name={`option${index}`} onChange={(e) => handleInputChange(e, index1)} required/>
                          </Editable>
                      </div>
                    ))}

                    <br />
                    <Button colorScheme='blue' onClick={()=>addCard(1)}>+</Button>
                    <br /> 

                  </>
                :
                null*/

                }

                {
                  (fields.type === 2 )?
                  
                  <>
                  
                    {cards[index1].map((card,index) => (
                      <div key={index}>
                          <Editable placeholder='Untitled Option' key={index}>
                              <EditablePreview />
                              <EditableInput name={`option${index}`} onChange={(e) => handleInputChange(e, index1)} required/>
                          </Editable>
                      </div>
                    ))}

                    {

                    }

                    <br />
                    <Button colorScheme='blue' onClick={() => handleAddInput(index1)}>+</Button>
                    <br /> 

                  </>

                  :

                  null

                }

                {
                  (fields.type === 4)?
                  
                  <>
                      {/*
                           (solntyp ===4 ) ?
                           <Input type="file" accept="image/*" disabled p="1" /> 
                           :
                           null*/
                      }

                       <Input type="file" accept="image/*" disabled p="1" /> 
                  </>

                  :

                  null

                }


                {
                  (fields.type === 1)?
                  
                  <>
                      {/*
                        (solntyp ===1 ) ?
                        <Input type="text" placeholder='You Selected Text Input' disabled/> 
                        :
                        null*/
                      }

                       <Input type="text" placeholder='You Selected Text Input' disabled/> 
                  </>

                  :

                  null

                }
                
               
                <br />

              </CardBody>
            </Card>
        ))}

        <br />

        <Wrap justify='flex-end'>
            <Button colorScheme='blue' onClick={handleAddField}>+</Button>
        </Wrap>

        <Button colorScheme='blue' onClick={handleSubmit}>Create Form</Button>

            

            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Link Generated </ModalHeader>
                <ModalCloseButton />

                        <ModalBody>

                                   <Text onClick={handleCopyClick} cursor="pointer" color="blue">
                                   {currentLink}responder?formno={formno}
                                   </Text>
                   
                                   <br />
                   
                                   <Text color="grey">
                                     Click on above link to copy URL
                                   </Text>

                                    <ModalFooter>
                                      <Button colorScheme='blue' mr={3} onClick={alldone} >
                                        Done!
                                      </Button>
                                    </ModalFooter>
                   
                                     
                              </ModalBody>



                
      
                

              </ModalContent>
            </Modal>
  

    </>
  )
}
