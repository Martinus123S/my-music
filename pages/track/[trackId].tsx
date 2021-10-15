import { Box, Text, Stack, Image, SimpleGrid } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import { useRouter } from "next/dist/client/router";
import { useParams } from "react-router";
import { getPlaylistTrack } from "../../services";
import { useEffect, useState } from "react";

export interface ITrack {
  name: string;
  id: string;
  album: {
    images: {
      height: number;
      width: number;
      url: string;
    }[];
  };
}

export interface IPLaylistTrack {
  track: ITrack;
}

const Track: React.FC = () => {
  const router = useRouter();
  const { trackId } = router.query;

  const [playlistTrack, setPlaylistTrack] = useState<IPLaylistTrack[]>([]);
  console.log(playlistTrack);
  useEffect(() => {
    const PlaylistTrackAPI = async () => {
      const res = await getPlaylistTrack(trackId, 10, 0);
      setPlaylistTrack(res?.items);
    };
    PlaylistTrackAPI();
  }, [trackId]);

  return (
    <Box margin="1rem">
      <Button
        colorScheme="blue"
        borderRadius="1rem"
        onClick={() => {
          router.push("/profile");
        }}
      >
        Back
      </Button>
      <Text>Your Playlist Track</Text>
      <SimpleGrid columns={[2, null, 5]} gap={5}>
        {playlistTrack.map((val, index) => {
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
            >
              <Image
                width={"100%"}
                height={"10rem"}
                key={index}
                src={val.track.album.images[0].url}
              />
              <Box p="3">
                <Box display="flex" alignItems="flex-start">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="21px"
                    ml="2"
                  >
                    {val.track.name}
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default Track;
