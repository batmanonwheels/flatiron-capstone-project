import React from 'react';
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  HStack,
  Image,
  Link,
  LinkBox,
  SimpleGrid,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Button,
} from '@chakra-ui/react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Review from './Review';

const ReviewCard = ({ me, review }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, description, id, rating, track, user, comments, likes } =
    review;
  return (
    <>
      <GridItem h={'30vh'} position='relative'>
        <div className='review'>
          <LinkBox
            h={'31vh'}
            as='article'
            p='5'
            onClick={onOpen}
            borderWidth='1.5px'
            rounded='md'
            _hover={{ transform: 'scale(1.01)' }}
            // position='relative'
          >
            <Grid
              templateRows='repeat(3, 1fr)'
              templateColumns='repeat(10, 1fr)'
              gap={4}
            >
              <GridItem
                colStart={1}
                rowStart={1}
                rowSpan={0}
                colSpan={8}
                // position='absolute'
              >
                <Heading
                  // fontSize='3xl'
                  fontSize='40px'
                  className='review-title'
                >
                  {title}
                </Heading>
                <GridItem>
                  <HStack
                    templateRows='repeat(1, 1fr)'
                    templateColumns='repeat(5, 1fr)'
                  >
                    <GridItem colStart={1} rowStart={0} rowSpan={0} colSpan={1}>
                      <Link to='/me'>
                        <Avatar
                          size='sm'
                          href={user.uri}
                          name={user.full_name}
                          src={user.profile_pic}
                          marginTop={3}
                        />
                      </Link>
                    </GridItem>
                    <GridItem colStart={2} rowStart={1} rowSpan={0} colSpan={2}>
                      {user.full_name}
                    </GridItem>
                  </HStack>
                </GridItem>
              </GridItem>
              <GridItem colStart={0} rowStart={2} rowSpan={0} colSpan={8}>
                <Text fontSize='1xl' noOfLines={4} className='review-rating'>
                  {description}
                </Text>
              </GridItem>
              <GridItem colStart={1} rowSpan={1} colSpan={4}>
                <HStack>
                  <GridItem>
                    <Text fontSize='xl'>{likes.length} likes</Text>
                  </GridItem>
                  <GridItem>
                    <Text fontSize='xl'>{comments.length} comments</Text>
                  </GridItem>
                  {/* <GridItem>
                      <Text fontSize='xl'>Read Full Article</Text>
                    </GridItem> */}
                </HStack>
              </GridItem>
              <GridItem
                colStart={4}
                rowStart={0}
                rowSpan={3}
                colSpan={3}
                p={0}
                position='absolute'
                right={0}
                top={0}
              >
                <Image
                  rounded='md'
                  src={track.image}
                  w='30.6vh'
                  // boxSize='40%'
                  right={0}
                  alt={track.title}
                  // position='absolute'
                />
              </GridItem>
            </Grid>
          </LinkBox>
        </div>
      </GridItem>
      <Modal isOpen={isOpen} onClose={onClose} track={track} size={'4xl'}>
        <ModalOverlay
          bg='none'
          backdropFilter='auto'
          // backdropInvert='75%'
          backdropBlur='8px'
        />
        <ModalContent>
          <ModalCloseButton />
          <Review
            title={title}
            description={description}
            id={id}
            rating={rating}
            track={track}
            user={user}
            comments={comments}
            likes={likes}
            me={me}
          />
        </ModalContent>
      </Modal>
    </>
  );
};
export default ReviewCard;
