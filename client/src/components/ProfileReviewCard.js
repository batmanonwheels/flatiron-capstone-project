import React from 'react';
import { useContext } from 'react';
import {
  Grid,
  GridItem,
  Heading,
  LinkBox,
  Text,
  Modal,
  ModalOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

import { useToast, useDisclosure } from '@chakra-ui/react';
import UserContext from '../context/user';
import EditReview from './EditReview';

const ProfileReviewCard = ({ review }) => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const handleDeleteReviewClick = (e) => {
    e.preventDefault();
    fetch(`/api/reviews/${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast({
      title: `Removing track from favorites`,
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };
  const {
    isOpen: isOpenReview,
    onOpen: onOpenReview,
    onClose: onCloseReview,
  } = useDisclosure();

  return (
    <>
      <GridItem key={review.id} h={'23%'} position='relative'>
        <LinkBox
          h={'16vh'}
          as='article'
          p='5'
          borderWidth='1px'
          borderColor={'teal'}
          borderRadius={'15px 50px 6px 50px'}
          _hover={{ transform: 'scale(1.01)' }}
        >
          <Grid
            templateRows='repeat(3, 1fr)'
            templateColumns='repeat(12, 1fr)'
            gap={1}
          >
            <GridItem colStart={1} rowStart={0} rowSpan={0} colSpan={12}>
              <Heading fontSize='2xl' className='review-title'>
                {review.title}
              </Heading>
              <GridItem
                colStart={1}
                rowStart={1}
                rowSpan={1}
                colSpan={12}
              ></GridItem>
            </GridItem>
            <GridItem colStart={0} rowStart={2} rowSpan={2} colSpan={9}>
              <Text
                fontSize='15px'
                fontWeight={'normal'}
                noOfLines={4}
                className='review-rating'
              >
                {review.description}
              </Text>
            </GridItem>
            <GridItem
              colStart={4}
              rowStart={0}
              rowSpan={3}
              colSpan={3}
              p={0}
              position='absolute'
              right={0}
              bottom={0}
            >
              <ButtonGroup colorScheme={'teal'} spacing={4}>
                <Button variant='ghost' onClick={onOpenReview}>
                  Edit
                </Button>
                <Button onClick={handleDeleteReviewClick}>Delete</Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </LinkBox>
      </GridItem>
      <Modal isOpen={isOpenReview} onClose={onCloseReview}>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='8px' />
        <EditReview review={review} user={user} />
      </Modal>
    </>
  );
};

export default ProfileReviewCard;
