import React,{useState,useEffect} from 'react';

import Userdashboard from './Userdashboard';

import { useToast } from '@chakra-ui/react';


import {URL} from '../api/api';


import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    Flex,
    Heading,
    Input,
    Button,
    InputGroup,
    Stack,
    InputLeftElement,
    chakra,
    Box,
    Avatar,
    FormControl,
    InputRightElement
} from '@chakra-ui/react';

import { FaUserAlt, FaLock } from "react-icons/fa";

const CFaUserAlt = chakra(FaUserAlt);
const CFaLock = chakra(FaLock);



export default function User() {

    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");

    const handleShowClick = () => setShowPassword(!showPassword);

    const [signin,setSignin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('email');
    if(token !== null){
      setSignin(true);
    }
    
  }, [signin]);

  const [formData, setFormData] = useState([
    { email:'', password:''} 
  ]);

  const handleInputChange = (e) => {

    setFormData({...formData,[e.target.name]:e.target.value});

  };

  const toast = useToast();

  const handleSubmit = async (e) => {

    e.preventDefault();
    try {
      const response = await fetch(`${URL}/api/checklogin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      console.log(data.data);

      if(!data.error){

        if(data.data === false){
          toast({
            title: "Invalid Credential",
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }

        if(data.data === true){
          setSignin(true);
          setEmail(data.email);
          //localStorage.setItem('token', data.token);
          localStorage.setItem('email', data.email);
        }

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
  

  return (
    <>

        {
          signin
          ? 
            <Userdashboard/>
          :
          <>

          <Modal isOpen={true} >
            <ModalOverlay/> {/* check this */}
            <ModalContent  ml="3" mr="3">
              {/*<ModalCloseButton />*/}
              <ModalBody >
                  <Flex
                     flexDirection="column"
                     width="100wh"
                     height="100%"
                     backgroundColor="gray.200"
                     justifyContent="center"
                     alignItems="center"
                   >
                     <Stack
                       flexDir="column"
                       mb="2"
                       justifyContent="center"
                       alignItems="center"
                       margin='10px'
                     >
                       <Avatar bg="teal.500" />
                       <Heading color="teal.400">Google Form</Heading>
                       <Box minW={{ base: "90%", md: "380px" }}>
                         <form>
                           <Stack
                             spacing={4}
                             p="1rem"
                             backgroundColor="whiteAlpha.900"
                             boxShadow="md"
                           >
                             <FormControl>
                               <InputGroup>
                                 <InputLeftElement
                                   pointerEvents="none"
                                   children={<CFaUserAlt color="gray.300" />}
                                 />
                                 <Input type="email" placeholder="email address" name="email" onChange={handleInputChange}/>
                               </InputGroup>
                             </FormControl>
                             <FormControl>
                               <InputGroup>
                                 <InputLeftElement
                                   pointerEvents="none"
                                   color="gray.300"
                                   children={<CFaLock color="gray.300" />}
                                 />
                                 <Input
                                   type={showPassword ? "text" : "password"}
                                   placeholder="Password"
                                   name="password" onChange={handleInputChange}
                                 />
                                 <InputRightElement width="4.5rem">
                                   <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                                     {showPassword ? "Hide" : "Show"}
                                   </Button>
                                 </InputRightElement>
                               </InputGroup>
                               {/*<FormHelperText textAlign="right">
                                 <Link>forgot password?</Link>
                                </FormHelperText>*/}
                             </FormControl>
                             <Button
                               borderRadius={0}
                               type="submit"
                               variant="solid"
                               colorScheme="teal"
                               width="full"
                               onClick={handleSubmit}
                             >
                               Login
                             </Button>
                           </Stack>
                         </form>
                       </Box>
                     </Stack>
                    </Flex>
                </ModalBody>
  
            </ModalContent>
          </Modal>
          </>
        }
      
    </>
  )
}
