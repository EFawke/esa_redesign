"use client";

import { useState } from "react";
import {
    Heading,
    Card,
    Table,
    Flex,
    Text,
    SegmentedControl,
    IconButton,
} from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import NumericTableCell from "../NumericTableCell";
import { ShoppingListSkeleton } from "./skeletons/ShoppingListSkeleton";
import { ShoppingRow } from "./BuildPage";
import MaterialsToast from "./MaterialsToast";

type PriceMode = "unit" | "total";

const NUM = { fontVariantNumeric: "tabular-nums" } as const;

const EmptyShoppingListState = () => {
    return (
        <Flex align='center' justify='center' mt="9" mb="9">No materials required, you got them all!</Flex>
    )
}

export const ShoppingList = ({
    loading,
    shoppingList,
}: {
    loading: boolean;
    shoppingList: ShoppingRow[];
}) => {
    const [mode, setMode] = useState<PriceMode>("total");
    const [show, setShow] = useState(true);

    if (show && loading) {
        return <ShoppingListSkeleton />;
    }

    // if (!shoppingList) {
    //     return <EmptyShoppingListState />;
    // }

    console.log(shoppingList);

    return (
        <>
            <Flex justify="between" align="start" mt="5" mb="4">
                <Flex align="center" gap="2">
                    <Heading size="5">Shopping List</Heading>
                    <IconButton
                        size="1"
                        variant="ghost"
                        onClick={() => setShow((v) => !v)}
                        aria-expanded={show}
                    >
                        {show ? (
                            <ChevronUpIcon height={15} width={15} />
                        ) : (
                            <ChevronDownIcon height={15} width={15} />
                        )}
                    </IconButton>
                </Flex>
                {show && (
                    <Flex justify="end">
                        <SegmentedControl.Root
                            size="2"
                            value={mode}
                            onValueChange={(v) => setMode(v as PriceMode)}
                        >
                            <SegmentedControl.Item value="unit">
                                Unit
                            </SegmentedControl.Item>
                            <SegmentedControl.Item value="total">
                                Total
                            </SegmentedControl.Item>
                        </SegmentedControl.Root>
                    </Flex>
                )}
            </Flex>

            {show && (
                <Card
                    size="3"
                    style={{ width: "100%" }}
                    className="box_shadowed"
                >   {
                    !shoppingList.length ? <EmptyShoppingListState /> : (                    <Table.Root size="3" variant="ghost">
                    <Table.Header>
                        <Table.Row align="center">
                            <Table.ColumnHeaderCell>
                                <Flex justify="center">
                                    <MaterialsToast data={shoppingList} />
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Text size="3">Name</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                justify="end"
                                width="110px"
                            >
                                <Text size="3">Quantity</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell
                                justify="end"
                                width="220px"
                            >
                                <Text size="3">
                                    {mode === "unit"
                                        ? "Unit price"
                                        : "Line total"}
                                </Text>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {shoppingList.map((item) => (
                            <Table.Row key={item.id} align="center">
                                <Table.Cell>
                                    <Flex justify="center">
                                        <img
                                            width={28}
                                            height={28}
                                            alt={item.name}
                                            src={`https://image.eveonline.com/Type/${item.id}_64.png`}
                                        />
                                    </Flex>
                                </Table.Cell>
                                <Table.RowHeaderCell>
                                    <Text size="3">{item.name}</Text>
                                </Table.RowHeaderCell>
                                <Table.Cell justify="end" style={NUM}>
                                    <Text size="3">
                                        {item.quantity.toLocaleString()}
                                    </Text>
                                </Table.Cell>
                                <Table.Cell justify="end">
                                    <NumericTableCell
                                        value={
                                            mode === "unit"
                                                ? item.unitPrice
                                                : item.lineTotal
                                        }
                                        percentage={Number(
                                            item.percentageChange,
                                        )}
                                        message={"30 day median delta"}
                                        type={"price"}
                                        upIsBad={true}
                                    />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>)
                }
                </Card>
            )}
        </>
    );
};
