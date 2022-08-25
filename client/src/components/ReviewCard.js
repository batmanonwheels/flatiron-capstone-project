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
  Divider,
  Textarea,
} from '@chakra-ui/react';
import { useToast, useDisclosure } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import ReviewDetail from './ReviewDetail';

const ReviewCard = ({ me, review }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { title, description, id, rating, track, user, comments, likes } =
    review;
  return (
    <>
      <GridItem h={'25%'} position='relative'>
        <LinkBox
          h={'28.2vh'}
          as='article'
          p='5'
          onClick={onOpen}
          borderWidth='1px'
          borderColor={'teal'}
          rounded='md'
          _hover={{ transform: 'scale(1.01)' }}
          // position='relative'
        >
          <Grid
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(12, 1fr)'
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
                fontSize='2xl'
                className='review-title'
              >
                {title}
              </Heading>
              <GridItem colStart={1} rowStart={2} rowSpan={1} colSpan={1}>
                <Text>
                  {track.name} by {track.artist}
                </Text>
              </GridItem>
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
            <GridItem colStart={0} rowStart={2} rowSpan={0} colSpan={7}>
              <Text
                fontSize='15px'
                fontWeight={'normal'}
                noOfLines={4}
                className='review-rating'
              >
                {description}
              </Text>
            </GridItem>
            <GridItem
              colStart={1}
              rowStart={3}
              rowSpan={1}
              colSpan={4}
              margin={0}
            >
              <HStack>
                {likes.length <= 0 ? null : (
                  <GridItem>
                    <Text fontSize='xl' color={'teal'}>
                      {likes.length} {likes.length > 1 ? 'likes' : 'like'}
                    </Text>
                  </GridItem>
                )}
                {comments.length <= 0 ? null : (
                  <GridItem>
                    <Text fontSize='xl' color={'teal'}>
                      {comments.length}{' '}
                      {comments.length > 1 ? 'comments' : 'comment'}
                    </Text>
                  </GridItem>
                )}
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
                w='28vh'
                // boxSize='40%'
                right={0}
                alt={track.title}
                // position='absolute'
              />
            </GridItem>
          </Grid>
        </LinkBox>
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
          <ReviewDetail
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
