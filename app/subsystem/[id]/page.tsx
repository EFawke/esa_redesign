import { Flex, Container, Heading, Text, HoverCard, Box } from "@radix-ui/themes";
import { namesAndIds, systemNamesAndIds } from "@/app/utils/namesAndIds";
import { AnalysisPageContent } from "@/app/ui/analysis/AnalysisPageContent";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import {
    type BuildSettings,
    DEFAULT_SETTINGS,
} from "@/app/utils/user_settings";
import { checkCookie } from "@/app/utils/user_settings";
import NextLink from "next/link";

export default async function Page({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const slug = await params;
    const id = slug.id;
    const name = namesAndIds.find((item) => item.id === Number(id))?.name;

    const cookieStore = await cookies();
    const stored = cookieStore.get("buildSettings");
    const settings: BuildSettings = checkCookie(stored);
    if (!stored && !checkCookie(stored))
        cookieStore.set("buildSettings", JSON.stringify(DEFAULT_SETTINGS));

    if (!name) {
        // return a 404 page
        notFound();
    }

    return (
        <Flex mt="1" direction="column">
            <Container px={{ initial: "4", sm: "6" }} mb="9" mt="9">
                <Flex direction="column" gap="7" align="start">
                    <Flex gap="2" direction="column" className="appear_on_load">
                        <HoverCard.Root>
                            <HoverCard.Trigger>
                                <Flex direction='column' gap='2'>
                                    <Heading
                                        size="6"
                                        weight="light"
                                    >
                                        {name}
                                    </Heading>
                                    <Text>
  <i style={{color: 'var(--gray-12)'}}>
    Buying materials in{" "}
    <b style={{color: 'var(--accent-a11)'}}>{systemNamesAndIds.find((hub) => hub.id === settings.materialsLocation)?.name} from</b>{" "}
    <b style={{color: 'var(--accent-a11)'}}>{settings.materialsOrderType} orders</b> and selling subsystems in{" "}
    <b style={{color: 'var(--accent-a11)'}}>{systemNamesAndIds.find((hub) => hub.id === settings.subsystemsLocation)?.name}</b>{" "}
    <b style={{color: 'var(--accent-a11)'}}>to {settings.subsystemsOrderType} orders</b>.
  </i>
</Text>                                </Flex>
                            </HoverCard.Trigger>
                            <HoverCard.Content maxWidth="300px">
                                <Flex gap="1" direction="column">
                                    <Heading size="3" mb="2" color="gray">
                                        Market Settings
                                    </Heading>
                                    <Text size="2">
                                        Update your trade hub settings on the{" "}
                                        <NextLink
                                            href="/build"
                                            style={{
                                                textDecoration: "underline",
                                                color: "var(--accent-a11)"
                                            }}
                                        >
                                            build page
                                        </NextLink>{" "}
                                        to show a different set of charts here.
                                    </Text>
                                </Flex>
                            </HoverCard.Content>
                        </HoverCard.Root>
                    </Flex>
                    <AnalysisPageContent id={Number(id)} settings={settings} />
                </Flex>
            </Container>
        </Flex>
    );
}
