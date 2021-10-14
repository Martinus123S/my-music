import { NextPage } from "next";
import { Flex, Button, Heading, Stack } from "@chakra-ui/react";

const Profile: NextPage = () => {
  return (
    <Stack
      direction="column"
      spacing={30}
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
    >
      <Heading fontSize={{ base: "4rem", lg: "3rem" }} textColor="white">
        Welcome to Spotify
      </Heading>
      <Button
        padding="2.4rem 4rem"
        _hover={{
          marginTop: "20px",
        }}
        colorScheme="blue"
      >
        Login to Spotify
      </Button>
    </Stack>
  );
};

export default Profile;
