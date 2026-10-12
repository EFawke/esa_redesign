import Image from "next/image";
import { Section, Flex, Text, Container, Heading, Link, Card, Em, Button, Grid } from "@radix-ui/themes";
import { BuildTutorial } from '@/app/ui/BuildTutorial'
export default function Home() {
  return (
    <Flex mt="1" direction="column">
      <Container size="4" mb="9" mt="9">
        <Flex direction="column" gap="9" align='center'>
          <Heading size="9" className='appear_on_load'>Eve Subsystem <Em><span style={{ color: 'var(--accent-a11)' }}>Analysis</span></Em></Heading>
        </Flex>
      </Container>
    </Flex>
  );
}
