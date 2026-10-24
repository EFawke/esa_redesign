import { Container, Text, Flex, Link } from "@radix-ui/themes";

export const Footer = () => {
    return (
        <Container
            px={{
                initial: "4",
                sm: "6",
            }}
            mt="5"
            className='footer_shadowed'
        >
            <Flex mt="5" mb="5" width="100%" justify="between" align="center">
                <Text size="3">
                    All EVE related materials are property of{" "}
                    <Link href="https://www.ccpgames.com/">CCP Games</Link>
                </Text>
            </Flex>
            <Flex
                direction="column"
                gap="2"
                mt="5"
                mb="5"
                width="100%"
                justify="between"
                align="start"
            >
                <Link href="/">
                    <Text size="3">Home</Text>
                </Link>
                <Link href="/build">
                    <Text size="3">Build Calculator</Text>
                </Link>
                {/* TODO: ADD AN ABOUT PAGE */}
                {/* <Link href="/about">
                    <Text size="3">About</Text>
                </Link> */}
                <Link href="https://github.com/EFawke/esa_redesign">
                    <Text size="3">GitHub</Text>
                </Link>
            </Flex>
        </Container>
    );
};
