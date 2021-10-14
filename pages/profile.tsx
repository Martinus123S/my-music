import { NextPage } from "next";
import { Box, Text, Image } from "@chakra-ui/react";
import { Stack, VStack, Flex } from "@chakra-ui/layout";
import { useEffect, useState } from "react";
import { getNameAPI, getPlaylistFromMe } from "../services";

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

interface IResponse {
  items: IPlaylist[];
}

const Profile: NextPage = () => {
  const [country, setCountry] = useState("");
  const [name, setName] = useState("");
  const [images, setImages] = useState<IResponse>();
  const property = {
    imageUrl: "https://bit.ly/2Z4KKcF",
    imageAlt: "Rear view of modern home with pool",
    beds: 3,
    baths: 2,
    title: "Modern home in city center in the heart of historic Los Angeles",
    formattedPrice: "$1,900.00",
    reviewCount: 34,
    rating: 4,
  };
  useEffect(() => {
    const ProfileAPI = async () => {
      const res = await getNameAPI();
      setCountry(res.country);
      setName(res.display_name);
    };
    ProfileAPI();
  }, []);

  useEffect(() => {
    const GetPlaylistAPI = async () => {
      const res = await getPlaylistFromMe(10);
      setImages(res);
    };
    GetPlaylistAPI();
  }, []);
  return (
    <Box margin="1rem">
      <Box
        maxW="sm"
        borderWidth="1px"
        padding="1rem"
        borderRadius="lg"
        overflow="hidden"
      >
        <VStack alignContent="flex-start" alignItems="flex-start">
          <Text fontSize="1.5rem" color="white">
            Name : {name}
          </Text>
          <Text fontSize="1.5rem" color="white">
            Country : {country}
          </Text>
        </VStack>
      </Box>
      <Text
        marginTop="1rem"
        fontSize="2rem"
        color="white"
        textDecoration="underline"
      >
        Your Playlist
      </Text>
      <Stack direction={{ base: "column", lg: "row" }} spacing="1rem">
        {/* {playlists.map((value) => {
          <Box maxW="sm" borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Image src={property.imageUrl} alt={property.imageAlt} />

            <Box p="6">
              <Box display="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {property.beds} beds &bull; {property.baths} baths
                </Box>
              </Box>

              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {property.title}
              </Box>

              <Box>
                {property.formattedPrice}
                <Box as="span" color="gray.600" fontSize="sm">
                  / wk
                </Box>
              </Box>

              <Box display="flex" mt="2" alignItems="center">
                <Box as="span" ml="2" color="gray.600" fontSize="sm">
                  {property.reviewCount} reviews
                </Box>
              </Box>
            </Box>
          </Box>;
        })} */}
      </Stack>
    </Box>
  );
};

export default Profile;
