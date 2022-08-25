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

import { useToast, useDisclosure } from '@chakra-ui/react';
import UserContext from '../context/user';

const EditReview = ({ review, handleEditReviewClick }) => {
  const toast = useToast();
  const { user, setUser } = useContext(UserContext);

  const handleReviewFavClick = (e) => {
    // e.preventDefault();
    // handleFavorite(track);
    // setButtonText('Added to Favorites');
    // setButtonColor('');
    toast({
      title: `Here we go!`,
      description: 'Writing Review!',
      position: 'bottom-right',
      variant: 'subtle',
      status: 'success',
      duration: 4500,
      isClosable: true,
    });
  };
  const defaultReviewData = {
    title: review.title,
    description: review.description,
    rating: review.rating,
  };

  const [formData, setFormData] = useState(defaultReviewData);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && !!formData.description && !!formData.rating) {
      fetch(`/api/reviews/${review.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((review) => console.log(review));
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
    } else {
      // console.log(formData)
      // setSubmitted("Submitted!");
      console.log(formData);
    }
  };

  return (
    <ModalContent>
      <ModalCloseButton />
      <>
        <ModalHeader>Edit your review!</ModalHeader>
        <ModalBody>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type='text'
              name='title'
              maxLength={255}
              value={formData.title}
              onChange={(e) => handleChange(e)}
              placeholder='These are my thoughts..'
              isInvalid={!formData.title}
            />
            <FormHelperText>Changigng your review name?</FormHelperText>
            <FormLabel>Body</FormLabel>
            <Textarea
              name='description'
              value={formData.description}
              onChange={(e) => handleChange(e)}
              type='text'
              placeholder='This song is sooooo good!'
              minH={'300px'}
              isInvalid={!formData.description}
            />
            <FormHelperText>Forget to mention something?</FormHelperText>
            <FormLabel>Score</FormLabel>
            <Select
              name='rating'
              // value={formData.rating}
              onChange={(e) => handleChange(e)}
            >
              <option value='1'>1</option>
              <option value='2'>2</option>
              <option value='3'>3</option>
              <option value='4'>4</option>
              <option value='5'>5</option>
              <option value='6'>6</option>
              <option value='7'>7</option>
              <option value='8'>8</option>
              <option value='9'>9</option>
              <option value='10'>10</option>
            </Select>
            <FormHelperText>Having second thoughts?</FormHelperText>
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
      </>
    </ModalContent>
  );
};

export default EditReview;
