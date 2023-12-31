import { HStack, Image, Text, Button, Divider, Avatar, Stack } from "@chakra-ui/react"
import { Heart, HeartFill } from "react-bootstrap-icons"
import { Reply } from "../../../interfaces/featureInterfaces"
import { formatDistanceToNow } from "date-fns"
import React from "react";
import Loading from "../../../components/Loading"
import ErrorMessage from "../../../components/Error"
import useGetReplies from "../hooks/useGetReplies";

export default function Replies() {
  const { data, isLoading, isError } = useGetReplies()
  if (isLoading) {
    return (
      <Loading />
    )
  }
  if (isError) {
    return (
      <ErrorMessage />
    )
  }
  return (
    <Stack py={4} spacing={4}>
      {data && (
        data.map((reply: Reply, index: number) => (
          <React.Fragment key={index}>
            <HStack align={"start"} spacing={4} mx={4}>
              <Avatar name={reply.user.full_name} src={reply.user.avatar} />
              <Stack spacing={1}>
                <HStack>
                  <Text>{reply.user.full_name}</Text>
                  <Text textColor={"GrayText"}>@{reply.user.username}</Text>
                  <Text textColor={"GrayText"}>·</Text>
                  <Text textColor={"GrayText"}>{formatDistanceToNow(new Date(reply.created_at), { addSuffix: true })}</Text>
                </HStack>
                <Stack spacing={4}>
                  <Text>{reply.content}</Text>
                  {reply?.image && (
                    <Image src={reply?.image} alt="User Attachment" borderRadius='.5rem' w='30em' h='24em' objectFit='cover' />
                  )}
                </Stack>
                <HStack spacing={4} mt={2}>
                  {reply.is_liked ?
                    <Button colorScheme='red' variant={"ghost"} leftIcon={<HeartFill />}>{reply.number_of_likes}</Button>
                    :
                    <Button variant={"ghost"} leftIcon={<Heart />} textColor={"GrayText"}>{reply.number_of_likes}</Button>
                  }
                </HStack>
              </Stack>
            </HStack>
            <Divider />
          </React.Fragment>
        ))
      )}
    </Stack>
  )
}