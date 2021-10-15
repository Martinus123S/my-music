import { NextPage } from "next";
import { Box, Text, Image } from "@chakra-ui/react";
import { Stack, VStack, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getNameAPI, getPlaylistFromMe } from "../services";
import { useRouter } from "next/dist/client/router";
import Info from "../component/Info";

interface IPicturePlaylist {
  height: number;
  url: string;
  width: number;
}

interface IPlaylist {
  name: string;
  id: string;
  images: IPicturePlaylist[];
}

const Profile: React.FC = () => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState<IPlaylist[]>([]);

  const router = useRouter();
  useEffect(() => {
    const GETAPI = async () => {
      const res = await getPlaylistFromMe(10);
      setImages(res?.items);
    };
    GETAPI();
    // console.log(images);
  }, []);
  // const property = {
  //   imageUrl: "https://bit.ly/2Z4KKcF",
  //   imageAlt: "Rear view of modern home with pool",
  //   beds: 3,
  //   baths: 2,
  //   title: "Modern home in city center in the heart of historic Los Angeles",
  //   formattedPrice: "$1,900.00",
  //   reviewCount: 34,
  //   rating: 4,
  // };
  useEffect(() => {
    const ProfileAPI = async () => {
      const res = await getNameAPI();
      setCountry(res.country);
      setName(res.display_name);
    };
    ProfileAPI();
  }, []);
  return (
    <Box margin="1rem">
      <Info name={name} country={country} />
      <Text
        marginTop="1rem"
        fontSize="2rem"
        color="white"
        textDecoration="underline"
      >
        Your Playlist
      </Text>
      <Stack direction={{ base: "column", lg: "row" }} spacing="1rem">
        {images.map((val, index) => {
          return (
            <Box
              key={index}
              maxW="lg"
              display="flex"
              flexDirection="column"
              borderWidth="1px"
              borderRadius="lg"
              borderColor="white"
              overflow="hidden"
              cursor="pointer"
              _hover={{
                borderColor: "blue",
              }}
              onClick={() => {
                router.push(`/track/${val.id}`);
              }}
            >
              {val.images.map((image, index) => {
                return (
                  <Image
                    width={"100%"}
                    height={"10rem"}
                    key={index}
                    src={image.url}
                  />
                );
              })}
              <Box p="3">
                <Box display="flex" alignItems="flex-start">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="21px"
                    ml="2"
                  >
                    {val.name}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};

export default Profile;
