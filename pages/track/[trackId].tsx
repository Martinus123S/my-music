import {
  Box,
  Text,
  Stack,
  Image,
  SimpleGrid,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
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
  const [isOpen, setIsopen] = useState<boolean>(false);
  const [id, setId] = useState("");
  const [playlistTrack, setPlaylistTrack] = useState<IPLaylistTrack[]>([]);
  console.log(playlistTrack);
  useEffect(() => {
    const PlaylistTrackAPI = async () => {
      const res = await getPlaylistTrack(trackId, 10, 0);
      setPlaylistTrack(res?.items);
    };
    PlaylistTrackAPI();
  }, [trackId]);

  const deleteOneTrack = (id: string) => {
    const spreadTheData = [...playlistTrack];

    const newData = spreadTheData?.filter((data) => {
      return data.track.id !== id;
    });

    setPlaylistTrack(newData);
    setIsopen(false);
  };
  return (
    <>
      <Box margin="1rem" p="1rem">
        <Button
          colorScheme="blue"
          borderRadius="1rem"
          onClick={() => {
            router.push("/profile");
          }}
        >
          Back
        </Button>
        <Text marginTop="1rem" textColor="white" fontSize="1.5rem">
          Your Playlist Track
        </Text>
        <SimpleGrid columns={[2, null, 5]} gap={5}>
          {playlistTrack.map((val, index) => {
            return (
              <Box
                key={index}
                width="100%"
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
                <Box p="3" display="flex" flexDirection="column">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="21px"
                    ml="2"
                  >
                    {val.track.name}
                  </Box>
                  <Button
                    colorScheme="red"
                    onClick={() => {
                      setId(val.track.id);
                      setIsopen(true);
                    }}
                  >
                    Delete
                  </Button>
                </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Box>
      <Modal isOpen={isOpen} onClose={() => setIsopen(false)} size="4xl">
        <ModalOverlay />
        <ModalContent color="white" bgColor="white" fontSize="2rem">
          <ModalHeader fontSize="3rem">Delete this from playlist</ModalHeader>
          <ModalCloseButton />
          <ModalBody fontSize="2rem">Are you sure to delete this?</ModalBody>

          <ModalFooter fontSize="2rem">
            <Button onClick={() => setIsopen(false)} colorScheme="blue" mr={3}>
              Close
            </Button>
            <Button
              color="white"
              backgroundColor="red.500"
              _hover={{ backgroundColor: "red.400" }}
              onClick={() => deleteOneTrack(id)}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Track;
