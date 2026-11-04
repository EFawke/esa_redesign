import {
    Flex,
    Container,
    Heading,
    Text,
    HoverCard,
    Box,
    Em,
} from "@radix-ui/themes";
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
                    <Flex
                        direction="column"
                        justify="center"
                        align="center"
                        style={{ width: "100%" }}
                        className="appear_on_load"
                    >
                        <Flex gap="2">
                            <Heading size="8">
                                {name.split(" - ")[0]} -{" "}
                                <Em style={{ color: "var(--accent-a11)" }}>
                                    {name.split(" - ")[1]}
                                </Em>
                            </Heading>
                        </Flex>
                        <HoverCard.Root>
                            <HoverCard.Trigger>
                                <Text mt="1">
                                    Materials:{" "}
                                    <i className="user_setting_indicator">
                                        {
                                            systemNamesAndIds.find(
                                                (hub) =>
                                                    hub.id ===
                                                    settings.materialsLocation,
                                            )?.name
                                        }
                                    </i>{" "}
                                    <i className="user_setting_indicator">
                                        {settings.materialsOrderType}
                                    </i>{" "}
                                    | Selling:{" "}
                                    <i className="user_setting_indicator">
                                        {
                                            systemNamesAndIds.find(
                                                (hub) =>
                                                    hub.id ===
                                                    settings.subsystemsLocation,
                                            )?.name
                                        }
                                    </i>{" "}
                                    <i className="user_setting_indicator">
                                        {settings.subsystemsOrderType}
                                    </i>
                                </Text>
                            </HoverCard.Trigger>
                            <HoverCard.Content maxWidth="300px">
                                <Flex gap="1" direction="column">
                                    <Heading size="3" mb="2">
                                        Market Settings
                                    </Heading>
                                    <Text size="2">
                                        Manage trade hubs on the{" "}
                                        <NextLink
                                            href="/build"
                                            style={{
                                                textDecoration: "underline",
                                                color: "var(--accent-a11)",
                                            }}
                                        >
                                            build
                                        </NextLink>{" "}
                                        page.
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
