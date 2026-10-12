"use client";

import {
    Flex,
    Heading,
    Text,
    Link,
    Container,
    Card,
    IconButton,
    Theme,
} from "@radix-ui/themes";
import { GearIcon, PersonIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import SearchBox from "@/app/header/SearchBox";
import { CSSProperties } from "react";
import { usePathname } from "next/navigation";

export const Header = ({
    props,
}: {
    props: {
        appearance: "dark" | "light";
        toggleAppearance: (appearance: "dark" | "light") => void;
    };
}) => {
    const containerStyles: CSSProperties = {
        borderRadius: "var(--radius-3)",
        position: "relative",
        zIndex: 1,
    };

    const pathname = usePathname();

    return (
        <Container
            px={{ initial: "4", sm: "6" }}
            style={containerStyles}
            className='box_shadowed'
        >
            <Flex width="100%" justify="between" align="center">
                <Flex gap="5" align="stretch">
                    <Flex
                        gap="1"
                        mt="5"
                        mb="5"
                        align="start"
                        direction="column"
                    >
                        <Flex className=''>
                            <a
                                href="/"
                                style={{
                                    position: "relative",
                                    height: "4rem",
                                    width: "4rem",
                                    overflow: "hidden",
                                    borderRadius: "var(--radius-4)",
                                    boxShadow: "0 0 0 1px var(--gray-8)",
                                }}
                            >
                                <img src='/logo.png'/>
                            </a>
                        </Flex>
                    </Flex>
                    <Flex align="stretch">
                        <Link
                            className={` ${props.appearance} header_nav ${pathname !== "/build" ? "active" : ""}`}
                        >
                            Market
                        </Link>
                        <Link
                            className={` ${props.appearance} header_nav ${pathname === "/build" ? "active" : ""}`}
                        >
                            Build Calculator
                        </Link>
                    </Flex>
                </Flex>
                <Flex gap='4' align="center" direction="row" justify={"end"}>
                    <SearchBox />
                    <IconButton
                        className=''
                        onClick={() => props.toggleAppearance(props.appearance)}
                        variant="outline"
                        style={{ height: "2.5rem", width: "2.5rem", borderRadius: "var(--radius-4)", boxShadow: "0 0 0 1px var(--gray-8)", }}
                    >
                        <SunIcon height="18px" width="18px" />
                    </IconButton>
                </Flex>
            </Flex>
        </Container>
    );
};
