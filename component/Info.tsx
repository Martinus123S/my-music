import { Box, Text } from "@chakra-ui/react";
import { VStack } from "@chakra-ui/layout";

interface Props {
  name: string;
  country: string;
}

const Info: React.FC<Props> = ({ name, country }) => {
  return (
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
  );
};

export default Info;
