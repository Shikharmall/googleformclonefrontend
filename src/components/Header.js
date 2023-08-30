import React from 'react';

import { Avatar} from '@chakra-ui/react';

import { Wrap , WrapItem } from '@chakra-ui/react';

import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

import Question from './Question';

import Response from './Response';

export default function Header() {

  



  return (
    <>
       
        <Wrap  justify='flex-end'>

          <WrapItem>
            <Avatar name='Dan Abrahmov' src='https://bit.ly/dan-abramov' />
          </WrapItem>

        </Wrap>
      

        <Tabs variant='enclosed'>

          <TabList>
            <Tab>Questions</Tab>
            <Tab>Responses</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              
              <Question />
                
            </TabPanel>
            <TabPanel>
              <Response />
            </TabPanel>
          </TabPanels>

        </Tabs>

    </>
  )
}
