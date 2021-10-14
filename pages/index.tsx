import type { NextPage } from "next";
import { Flex, Button, Heading, Stack } from "@chakra-ui/react";
import { getValueFromParams, login } from "../services";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useRouter } from "next/dist/client/router";

const Home: NextPage = () => {
  const router = useRouter();
  const handleLogin = () => {
    window.open(login(), "_self");
  };
  useEffect(() => {
    const { access_token, expires_in, token_type } = getValueFromParams();
    if (access_token) {
      const data = { access_token, expires_in };
      const stringify = JSON.stringify(data);
      window.localStorage.setItem("info", stringify);
      router.push("/profile");
    }
  }, []);
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
        onClick={handleLogin}
      >
        Login to Spotify
      </Button>
    </Stack>
  );
};

export default Home;
