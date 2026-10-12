import {
  Flex,
  Text,
  Container,
  Heading,
  Em
} from '@radix-ui/themes';
import {BestSubsystems} from '@/app/ui/BestSubsystems';
export default function Home() {
  return (
    <Flex mt="1" direction="column">
      <Container size="4" mb="9" mt="9">
        <Flex direction="column" gap="9" align="center">
          <Flex direction="column" gap="2" align="center">
            <Heading size="9" className="appear_on_load">
              Eve Subsystem{" "}
              <Em>
                <span style={{ color: "var(--accent-a11)" }}>Analysis</span>
              </Em>
            </Heading>
            <Text size="5" color="gray" className="appear_on_load">
              Tech 3 Subsystem Production Planner
            </Text>
          </Flex>
          <BestSubsystems/>
        </Flex>
      </Container>
    </Flex>
  );
}
