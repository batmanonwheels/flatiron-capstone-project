import { Box, Grid, GridItem, Heading } from '@chakra-ui/react';
import React, { useEffect, useState, useContext } from 'react';
import ReviewList from './ReviewList';
import UserContext from '../context/user';

function Reviews({ name }) {
  const { user, setUser } = useContext(UserContext);
  return (
    <>
      <Box className='reviews'>
        <Grid
          templateAreas={`"heading "
                  "body"`}
          gridTemplateRows={'35px 1fr'}
          // gridTemplateColumns={'100px 1fr'}
          // h='200px'
          // gap='1'
          color='blackAlpha.700'
          // fontWeight='bold'
        >
          <GridItem
            pl='2'
            area={'heading'}
            // pos='sticky'
            // top={0}
            bg='white'
            zIndex={998}
          >
            <Heading size='xl'>Recent Reviews</Heading>
          </GridItem>
          <GridItem pl='2' area={'body'} overflow-y='auto'>
            <ReviewList user={user} />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
}

export default Reviews;
