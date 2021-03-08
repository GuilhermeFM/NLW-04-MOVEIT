import axios from 'axios';
import Head from 'next/head';
import { GetServerSideProps } from 'next';

import {
  Flex,
  Center,
  Box,
  Image,
  Text,
  VStack,
  HStack,
  chakra,
} from '@chakra-ui/react';

import * as Icons from '../components/Icons';

export default function SignIn() {
  async function handleOnClick(value: string) {
    const response = await axios.post('/api/github/login', { username: value });
    const { githubLoginUrl } = response.data;
    window.location.href = githubLoginUrl;
  }

  return (
    <>
      <Head>
        <title>Login | move.it</title>
      </Head>

      <Flex
        width="100vw"
        height="100vh"
        overflow="auto"
        direction="row"
        alignItems="center"
        justifyContent="center"
        backgroundColor="brand.blue200"
        padding={['5', '10']}
      >
        <Flex
          width="50%"
          height="100%"
          direction="row"
          alignItems="center"
          justifyContent="center"
          display={{ base: 'none', xl: 'initial' }}
        >
          <Image
            width="100%"
            height="100%"
            alt="background"
            src="/logos/logo-background.svg"
            paddingY="50"
          />
        </Flex>

        <Center width={{ base: '100%', xl: '50%' }}>
          <VStack
            width={{ base: '100%', xl: 'xl' }}
            spacing="9"
            align="flex-start"
          >
            <VStack spacing="5" align="flex-start">
              <Image src="/logos/logo-text.svg" alt="move it" />
              <Text
                textColor="brand.white"
                fontFamily="Inter"
                fontWeight="600"
                fontSize={{ base: '', xl: '2xl' }}
                marginTop="10"
              >
                Bem Vindo
              </Text>
            </VStack>

            <HStack spacing="5" align="center">
              <Image src="/logos/logo-github.svg" alt="github-logo" />
              <Text
                textColor="brand.blue100"
                fontFamily="Inter"
                fontWeight="500"
                fontSize={['sm', 'xl']}
              >
                Faça login com seu github para começar
              </Text>
            </HStack>

            <HStack width="100%" spacing="0">
              <chakra.input
                flex="1"
                height={{ base: '12', md: '16', xl: '20' }}
                outline="none"
                paddingX="4"
                color="brand.blue100"
                fontFamily="Inter"
                fontSize={['sm', 'md', 'xl']}
                fontWeight="medium"
                borderStartRadius={{ base: 'md', md: 'lg', xl: 'xl' }}
                backgroundColor="transparent"
                bgGradient="linear(to-r, brand.blue300, brand.blue200);"
                placeholder="Username or email"
              />
              <chakra.button
                width={{ base: '12', md: '16', xl: '20' }}
                height={{ base: '12', md: '16', xl: '20' }}
                border="none"
                borderEndRadius={{ base: 'md', md: 'lg', xl: 'xl' }}
                backgroundColor="brand.blue300"
                outline="none"
                transition="all"
                transitionDuration="0.3s"
                _hover={{ backgroundColor: 'brand.green' }}
              >
                <Center>
                  <Box
                    width={{ base: '8', md: '12', xl: '16' }}
                    height={{ base: '8', md: '12', xl: '16' }}
                  >
                    <Icons.Play width="100%" height="100%" />
                  </Box>
                </Center>
              </chakra.button>
            </HStack>
          </VStack>
        </Center>
      </Flex>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async context => {
  const { id } = context.req.cookies;

  if (id) {
    return {
      redirect: {
        destination: '/home',
        permanent: true,
      },
    };
  }

  return { props: {} };
};
