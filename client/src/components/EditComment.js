import React from 'react';
import { useState, useContext } from 'react';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  HStack,
  Progress,
  LinkBox,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  Image,
  Link,
  Input,
  Textarea,
  Select,
  Avatar,
  Button,
  ButtonGroup,
  FormControl,
  FormLabel,
  FormErrorMessage,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormHelperText,
} from '@chakra-ui/react';

import { useToast } from '@chakra-ui/react';
import UserContext from '../context/user';

const EditComment = ({ comment }) => {
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);
  const [commentDescription, setCommentDescription] = useState(
    comment.description
  );
  const defaultCommentData = {
    description: commentDescription,
  };

  const [formData, setFormData] = useState(defaultCommentData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`/api/comments/${comment.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((review) => setCommentDescription(review.description));
    // .then(setFormData(defaultFormData));
    toast({
      title: `Done!`,
      description: 'Edit completed',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };

  return (
    <ModalContent>
      <ModalCloseButton />
      <ModalHeader>Edit your comment!</ModalHeader>
      <ModalBody>
        <FormControl isRequired>
          <FormLabel>Comment</FormLabel>
          <Textarea
            name='description'
            value={formData.description}
            onChange={(e) => handleChange(e)}
            type='text'
            placeholder='This song is sooooo good!'
            minH={'300px'}
            isInvalid={!formData.description}
          />
          <FormHelperText>Tell them how you really feel!</FormHelperText>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <FormErrorMessage>Fields must not be empty</FormErrorMessage>
        <Button
          colorScheme='teal'
          type='submit'
          mr={3}
          onClick={(e) => handleSubmit(e)}
        >
          Submit
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default EditComment;
