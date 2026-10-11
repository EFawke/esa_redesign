import Image from "next/image";
import { Section, Flex, Text, Container, Heading, Link, Card, Em, Button, Grid } from "@radix-ui/themes";

export default function Home() {
  return (
    <Flex mt="1" direction="column">
      <Container size="4" mb="9" mt="9">
        <Flex direction="column" gap="9" align='center'>
          <Heading size="9">Tech 3 Industry Made <Em><span style={{ color: 'var(--accent-a11)' }}>Easy</span></Em></Heading>
          <Grid columns="2" gap="4" width="auto">
          </Grid>

        </Flex>
      </Container>
    </Flex>
  );
}
