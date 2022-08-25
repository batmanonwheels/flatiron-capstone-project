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
  useToast,
  Image,
  HStack,
  VStack,
  GridItem,
  Text,
  Box,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  Stack,
  Divider,
  Avatar,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const ReviewDetail = ({
  title,
  description,
  id,
  rating,
  track,
  user,
  comments,
  likes,
  me,
}) => {
  const embedId = track.spotify_uri.split('spotify:track:')[1];
  const [likeState, setLikeState] = useState(likes);

  const defaultCommentData = {
    description: '',
    user_id: user.id,
    review_id: id,
  };
  const [commentData, setCommentData] = useState(defaultCommentData);
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
    // console.log(commentData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!!commentData.description) {
      fetch('api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentData),
      })
        .then((r) => r.json())
        .then((comment) => setCommentData(defaultCommentData));
    } else {
      // console.log(formData)
      // setSubmitted("Submitted!");
      // console.log(commentData);
    }
  };

  const handleLikeClick = (e) => {
    const likeData = {
      user_id: me.id,
      review_id: id,
    };
    if (!!likeData.user_id && !!likeData.review_id) {
      fetch('api/likes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likeData),
      })
        .then((r) => r.json())
        .then((data) => setLikeState(data));
      toast({
        title: `Liked!`,
        description: `${title}`,
        position: 'bottom-right',
        variant: 'subtle',
        status: 'success',
        duration: 4500,
        isClosable: true,
      });
    } else {
      // console.log(formData)
      // setSubmitted("Submitted!");
      // console.log(likeData);
    }
    // console.log(likeData);
  };

  // console.log(comments);

  return (
    <>
      <Image
        src={track.image}
        alt={track.title}
        width={'auto'}
        height={'600px'}
      />
      <iframe
        title={track.title}
        // style='border-radius:12px'
        src={`https://open.spotify.com/embed/track/${embedId}?utm_source=generator&theme=0`}
        width='100%'
        height='80'
        frameBorder='0'
        allowfullscreen=''
        allow='autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture'
        loading='lazy'
      ></iframe>
      <ModalHeader>
        <Heading>{title}</Heading>
        <Text>
          {track.name} by {track.artist}
        </Text>
        <HStack>
          <GridItem>
            <Avatar
              size='sm'
              href={user.uri}
              name={user.full_name}
              src={user.profile_pic}
              marginTop={3}
            />
          </GridItem>
          <GridItem>
            <Text>{user.full_name}</Text>
          </GridItem>
        </HStack>
      </ModalHeader>
      <ModalBody>
        <Text size={'md'} style={{ whiteSpace: 'pre-wrap' }}>
          {description}
        </Text>
      </ModalBody>
      <ModalFooter>
        <HStack>
          <GridItem>
            <Button
              fontSize='xl'
              className='review-rating'
              variant='ghost'
              onClick={(e) => handleLikeClick(e)}
              colorScheme={'teal'}
            >
              {likes.length} {likes.length > 1 ? 'likes' : 'like'}
            </Button>
          </GridItem>
          <GridItem>
            <Popover placement='top' closeOnBlur={false}>
              <PopoverTrigger>
                <Button
                  fontSize='xl'
                  className='review-rating'
                  variant='ghost'
                  colorScheme={'teal'}
                >
                  Leave a comment
                </Button>
              </PopoverTrigger>
              <PopoverContent p={5}>
                <PopoverArrow />
                <PopoverCloseButton />
                <Stack spacing={4}>
                  <Textarea
                    label='description'
                    name='description'
                    value={commentData.description}
                    onChange={(e) => handleChange(e)}
                    placeholder='How do you feel about this review?'
                  />
                  <Button
                    fontSize='xl'
                    className='review-rating'
                    colorScheme={'teal'}
                    onClick={(e) => handleSubmit(e)}
                  >
                    Submit
                  </Button>
                </Stack>
              </PopoverContent>
            </Popover>
          </GridItem>
        </HStack>
      </ModalFooter>
      {comments.length > 0 ? (
        <ModalBody>
          <VStack height='100%'>
            {comments.map((comment) => (
              <Box>
                <HStack spacing={8} mb={5}>
                  <Box height={'100%'}>
                    <Divider
                      orientation='vertical'
                      // height='100%'
                      // borderWidth={'0px 0px 0px 10px'}
                      color={'teal'}
                      width={'10px'}
                    />
                  </Box>
                  <Box w>
                    <Text size={'md'} style={{ whiteSpace: 'pre-wrap' }}>
                      {comment.description}
                    </Text>
                  </Box>
                  <Box>
                    <HStack>
                      <GridItem>
                        <Avatar
                          size='sm'
                          href={user.uri}
                          name={user.full_name}
                          src={user.profile_pic}
                          marginTop={3}
                        />
                      </GridItem>
                      <GridItem>{user.full_name.split(' ')[0]}</GridItem>
                    </HStack>
                  </Box>
                </HStack>
              </Box>
            ))}
          </VStack>
        </ModalBody>
      ) : null}
    </>
  );
};
export default ReviewDetail;
