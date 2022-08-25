import React from 'react';
import { useContext } from 'react';
import {
  Grid,
  GridItem,
  LinkBox,
  Text,
  Modal,
  ModalOverlay,
  Button,
  ButtonGroup,
} from '@chakra-ui/react';

import { useToast, useDisclosure } from '@chakra-ui/react';
import UserContext from '../context/user';
import EditComment from './EditComment';

const ProfileCommentCard = ({ comment }) => {
  const { user, setUser } = useContext(UserContext);
  const toast = useToast();

  const handleDeleteCommentClick = (e) => {
    e.preventDefault();
    fetch(`/api/comments/${comment.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    toast({
      title: `Deleting comment!`,
      description: 'No one will ever know...',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };
  const {
    isOpen: isOpenComment,
    onOpen: onOpenComment,
    onClose: onCloseComment,
  } = useDisclosure();

  return (
    <>
      <GridItem key={comment.id} h={'23%'} position='relative'>
        <LinkBox
          h={'10vh'}
          as='article'
          p='5'
          borderWidth='1px'
          borderColor={'teal'}
          borderRadius={'15px 50px 6px 50px'}
          _hover={{ transform: 'scale(1.01)' }}
        >
          <Grid
            templateRows='repeat(2, 1fr)'
            templateColumns='repeat(6, 1fr)'
            gap={4}
          >
            <GridItem colStart={0} rowStart={1} rowSpan={2} colSpan={9}>
              <Text
                fontSize='15px'
                fontWeight={'normal'}
                noOfLines={3}
                className='review-rating'
              >
                {comment.description}
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
              <ButtonGroup variant='ghost' colorScheme={'teal'} spacing={4}>
                <Button onClick={onOpenComment}>Edit</Button>
                <Button onClick={handleDeleteCommentClick}>Delete</Button>
              </ButtonGroup>
            </GridItem>
          </Grid>
        </LinkBox>
      </GridItem>
      <Modal isOpen={isOpenComment} onClose={onCloseComment}>
        <ModalOverlay bg='none' backdropFilter='auto' backdropBlur='8px' />
        <EditComment comment={comment} user={user} />
      </Modal>
    </>
  );
};

export default ProfileCommentCard;
