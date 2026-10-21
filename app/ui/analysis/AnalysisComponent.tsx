"use client";

import {
    Card,
    Table,
    Flex,
    HoverCard,
    Text,
    Heading,
} from "@radix-ui/themes";
import {
    InfoCircledIcon,
} from "@radix-ui/react-icons";
import { type JSX } from "react";
import NextLink from "next/link";

import {type CurrentData, type CurrentDataField} from './AnalysisPageContent';
import NumericTableCell from "../NumericTableCell";
const PRICE_FIELDS = ["Min Sell", "Max Buy", "Profit", "Material Cost"];
export const AnalysisComponent = ({
    loading,
    data,
    renderIconButton,
}: {
    loading: boolean;
    data: CurrentData | null;
    renderIconButton: (title: string) => JSX.Element;
}) => {
    return (
        <Flex style={{flex: '1' }}>
            <Card style={{ width: '100%', height: "100%" }} className="box_shadowed">
                {!loading && data !== null ? (
                    <Table.Root>
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeaderCell style={{ whiteSpace: "nowrap" }}>
                                    <Text size="3">Data</Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell style={{ whiteSpace: "nowrap" }}>
                                    <Text size="3">Value</Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell style={{ whiteSpace: "nowrap" }}>
                                    <Text size="3">Add to Chart</Text>
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {Object.values(data).map((item: CurrentDataField) => {
                                const isPrice = PRICE_FIELDS.includes(item.title);
                                if (!item) return null;
                                return (
                                    <Table.Row key={item.title.replaceAll(" ", "")}>
                                        <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                            <Flex height="100%" align="center">
                                                {item.title === "Profit" || item.title === "Material Cost" ? (
                                                    <HoverCard.Root>
                                                        <HoverCard.Trigger>
                                                            <Flex
                                                                justify="start"
                                                                align="center"
                                                                gap="1"
                                                            >
                                                                <Text size="3">
                                                                    {
                                                                        item.title
                                                                    }{" "}
                                                                </Text>
                                                                <InfoCircledIcon
                                                                    className="info_icon"
                                                                    height="12px"
                                                                    width="12px"
                                                                />
                                                            </Flex>
                                                        </HoverCard.Trigger>
                                                        <HoverCard.Content maxWidth="300px">
                                                            <Flex
                                                                gap="1"
                                                                direction={
                                                                    "column"
                                                                }
                                                                justify={
                                                                    "start"
                                                                }
                                                            >
                                                                <Heading
                                                                    size="3"
                                                                    mb="2"
                                                                    color="gray"
                                                                >
                                                                    {item.title}
                                                                </Heading>
                                                                <Text size="2">
                                                                    Material
                                                                    costs based
                                                                    on your{" "}
                                                                    <NextLink
                                                                        style={{
                                                                            fontSize:
                                                                                "var(--size-2)",
                                                                            textDecoration: "underline"
                                                                        }}
                                                                        href="/build"
                                                                    >
                                                                        build
                                                                    </NextLink>{" "}
                                                                    settings.
                                                                </Text>
                                                            </Flex>
                                                        </HoverCard.Content>
                                                    </HoverCard.Root>
                                                ) : (
                                                    <Text size="3">
                                                        {item.title}
                                                    </Text>
                                                )}
                                            </Flex>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <NumericTableCell 
                                                value={item.currentValue} 
                                                percentage={item.change} 
                                                message="30 day median delta" 
                                                type={isPrice ? 'price' : 'int'}
                                                upIsBad={item.title === "Material Cost"}
                                            />
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Flex
                                                height="100%"
                                                align="center"
                                                justify="center"
                                            >
                                                {renderIconButton(item.title)}
                                            </Flex>
                                        </Table.Cell>
                                    </Table.Row>
                                );
                            })}
                        </Table.Body>
                    </Table.Root>
                ) : (
                    <Flex
                        style={{ height: "451px", width: "384px" }}
                        justify="center"
                        align="center"
                    >
                        <p>loading</p>
                    </Flex>
                )}
            </Card>
        </Flex>
    );
};