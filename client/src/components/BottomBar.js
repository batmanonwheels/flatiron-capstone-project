import React from 'react';
import { Heading } from '@chakra-ui/react';
import { FasterOne } from '@fontsource/faster-one';

function BottomBar() {
  return (
    <Heading
      fontSize='6vw'
      size={'3xl'}
      bgClip='text'
      bgGradient='linear(to-r,teal.400, pink.300)'
      zIndex='6'
      sx={{
        fontFamily: 'Faster One',
      }}
    >
      Synesthesia
    </Heading>
  );
}

export default BottomBar;
