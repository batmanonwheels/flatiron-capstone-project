import React from 'react';
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Stack,
  Image,
  Link,
  LinkBox,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Divider,
} from '@chakra-ui/react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState, useContext } from 'react';
import ReviewForm from './ReviewForm';
import UserContext from '../context/user';

const CommentCard = ({ me, review, comment }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const { user, setUser } = useContext(UserContext);
  const { title, description, id, rating, track, comments, likes } = review;
  console.log(comments);
  return (
    <>
      <GridItem h={'30vh'} position='relative'>
        <Divider orientation='vertical' />
        <div className='comment'>
          <Grid
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(10, 1fr)'
            gap={4}
          >
            <HStack
              templateRows='repeat(1, 1fr)'
              templateColumns='repeat(5, 1fr)'
            >
              <GridItem colStart={1} rowStart={0} rowSpan={0} colSpan={1}>
                <Link to='/me'>
                  <Avatar
                    size='sm'
                    href={me.uri}
                    name={me.full_name}
                    src={me.profile_pic}
                    marginTop={3}
                  />
                </Link>
              </GridItem>
              <GridItem colStart={2} rowStart={1} rowSpan={0} colSpan={2}>
                {me.full_name}
              </GridItem>
            </HStack>
            <GridItem colStart={0} rowStart={2} rowSpan={0} colSpan={8}>
              <Text fontSize='1xl' noOfLines={4} className='review-rating'>
                {description}
              </Text>
            </GridItem>
          </Grid>
        </div>
      </GridItem>
    </>
  );
};
export default CommentCard;
