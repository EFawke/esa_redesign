import Link from "next/link";
import { Flex, Heading, Container, Button } from "@radix-ui/themes";

export default function NotFound() {
  return (
    <Container px={{ initial: "4", sm: "6" }} my="9">
      <Flex direction="column" gap="4" align="center">
        <img
          src="/404.png"
          alt=""
          width={280}
          style={{ imageRendering: "pixelated" }}
        />
        <Heading className="appear_on_load">
          <span style={{ color: "var(--gray-11)" }}>404</span>{" "}
          <i style={{ color: "var(--accent-a11)", fontWeight: "lighter" }}>Not Found</i>
        </Heading>
        <Button asChild variant="outline">
          <Link href="/">Back to market</Link>
        </Button>
      </Flex>
    </Container>
  );
}