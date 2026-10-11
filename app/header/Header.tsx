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
            style={
                props.appearance === "dark"
                    ? {
                          ...containerStyles,
                          background: "var(--gray-a2)",
                          boxShadow: "0px 1px 1px var(--gray-8)",
                      }
                    : {
                          ...containerStyles,
                          background: "var(--gray-2)",
                          boxShadow: "0px 1px 5px var(--gray-8)",
                      }
            }
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
                        <Flex>
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
                                <img style={{padding: '5px'}} src='/logo.png'/>
                            </a>
                            {/* <div style={{ 
                background: 'white', 
                border: '2px solid gray', 
                padding: 'var(--space-1)', 
                width: '16rem',
                height: '5rem',
                borderRadius: '5rem',
                display: 'flex',
                alignItems: 'center'
            }}>
            <Text style={{color: 'black'}}>{text}</Text>
            </div> */}
                        </Flex>
                        {/* <Link href="/" style={{ textDecoration: 'none' }}>
                            <Flex align='center'>
                                <Heading size='5' style={ props.appearance === 'dark' ? {color: 'var(--accent-a11)'} : {color: 'var(--accent-a11)'}}>
                                    Eve Subsystem Analysis <span style={ props.appearance === 'dark' ? {color: 'white'} : {color: 'black'}}>(3.0)</span>
                                </Heading>
                            </Flex>
                        </Link>
                        <Text size='2' style={props.appearance === 'dark' ? { color: 'var(--gray-9)' } : {color: 'var(--gray-11)'}}><i>Video game widget production optimiser</i></Text> */}
                    </Flex>
                    <Flex align="stretch">
                        <Link
                            className={`${props.appearance} header_nav ${pathname !== "/build" ? "active" : ""}`}
                        >
                            Market
                        </Link>
                        <Link
                            className={`${props.appearance} header_nav ${pathname === "/build" ? "active" : ""}`}
                        >
                            Build Calculator
                        </Link>
                    </Flex>
                </Flex>
                <Flex gap="5" align="center" direction="row" justify={"end"}>
                    <SearchBox />
                    <IconButton
                        onClick={() => props.toggleAppearance(props.appearance)}
                        variant="outline"
                        style={{ height: "2.5rem", width: "2.5rem" }}
                    >
                        <SunIcon height="18px" width="18px" />
                    </IconButton>
                </Flex>
            </Flex>
        </Container>
    );
};
