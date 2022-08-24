import {
  Heading,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Button,
  ModalHeader,
  ModalFooter,
  ModalBody,
  FormHelperText,
  Textarea,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  useToast,
  Select,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ReviewForm = ({ track, user, onClose }) => {
  const defaultFormData = {
    title: '',
    description: '',
    rating: 1,
    user_id: user.id,
    track_id: track.id,
  };
  const [formData, setFormData] = useState(defaultFormData);
  const [submitted, setSubmitted] = useState(false);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    console.log(formData);
  };

  const handleReset = () => {
    setFormData(defaultFormData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title && !!formData.description && !!formData.rating) {
      fetch('api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((r) => r.json())
        .then((review) => console.log(review));
      // .then(setFormData(defaultFormData));
    } else {
      // console.log(formData)
      // setSubmitted("Submitted!");
      console.log(formData);
    }
  };
  // console.log(formData);
  return (
    <>
      {!submitted ? (
        <>
          <ModalHeader>
            Create a review for {track.name} by {track.artist}
          </ModalHeader>
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
              <FormHelperText>Let's name your review!</FormHelperText>
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
              <FormHelperText>Do you love it or hate it?</FormHelperText>
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
              <FormHelperText>What would you rate it?</FormHelperText>
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
            <Button variant='ghost' onClick={handleReset}>
              Reset
            </Button>
          </ModalFooter>
        </>
      ) : (
        <ModalBody>
          {/* <Heading>
            Review for {track.name} by {track.artist} submitted!
          </Heading> */}
        </ModalBody>
      )}
    </>
  );
};

export default ReviewForm;
