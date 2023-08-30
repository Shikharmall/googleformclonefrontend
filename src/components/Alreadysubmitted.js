import React from 'react';

import { Card, CardBody ,Text } from '@chakra-ui/react';

export default function Alreadysubmitted() {
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

                <Text fontSize='3xl'>Form Submitted!</Text>

                <Text fontSize='1xl'>Your response is submitted.</Text>

              </CardBody>

        </Card>
      
    </>
  )
}
