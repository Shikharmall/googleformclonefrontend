import React from 'react';

import { Card, CardBody ,Text } from '@chakra-ui/react';

export default function Formclose() {
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
              <CardBody>

                <Text fontSize='3xl'>The SARUS</Text>

                <Text fontSize='1xl'>The form is no longer accepting responses.</Text>
                <Text fontSize='1xl'>Try contacting the owner of the form if you think this is a mistake.</Text>

              </CardBody>

        </Card>
      
    </>
  )
}
