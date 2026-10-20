"use client";

import {
    Table,
    Flex,
    Card,
    Heading,
    Link,
    Text,
    Button,
    DropdownMenu,
    IconButton,
    Skeleton,
    Box,
} from "@radix-ui/themes";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import NumericTableCell from "@/app/ui/NumericTableCell";
import { useState, useEffect } from "react";
import { SortableHeader } from "@/app/ui/home/SortableHeader";
import HomeToast from "@/app/ui/home/HomePageToast";
import {gary} from '@/app/utils/gary'
import { systemNamesAndIds } from "../../utils/namesAndIds";
import NextLink from "next/link";

export interface SubsystemRow {
    type_id: number;
    item_name: string;
    max_buy: number;
    max_buy_percent: number;
    min_sell: number;
    min_sell_percent: number;
    buy_volume: number;
    buy_volume_percent: number;
    sell_volume: number;
    sell_volume_percent: number;
    losses: number;
    losses_percent: number;
}

export type TradeHub = 10000002 | 10000043 | 10000030 | 10000042 | 10000032;

const SKELETON_ROWS = 10;

const NumericCellSkeleton = ({ type }: { type: "price" | "int" }) => (
    <Box
        height="100%"
        style={{
            display: "grid",
            gridTemplateColumns: "1fr 2.5rem",
            alignItems: "center",
            columnGap: "var(--space-2)",
        }}
    >
        <Skeleton
            width={type === "price" ? "88px" : "40px"}
            height="16px"
            style={{ justifySelf: "end" }}
        />
        <Flex direction="column" align="end" gap="1">
            <Skeleton width="12px" height="12px" />
            <Skeleton width="34px" height="12px" />
        </Flex>
    </Box>
);

const NUMERIC_COLUMNS: ("price" | "int")[] = [
    "price",
    "price",
    "int",
    "int",
    "int",
];

const SubsystemSkeletonRows = () => (
    <>
        {Array.from({ length: SKELETON_ROWS }).map((_, i) => (
            <Table.Row key={i}>
                <Table.Cell>
                    <Flex height="100%" align="center">
                        <Skeleton width="25px" height="25px" />
                    </Flex>
                </Table.Cell>
                <Table.Cell style={{ whiteSpace: "nowrap" }}>
                    <Flex
                        height="100%"
                        direction="column"
                        justify="center"
                        gap="1"
                    >
                        <Skeleton width="70px" height="14px" />
                        <Skeleton
                            width={`${110 + (i % 3) * 25}px`}
                            height="14px"
                        />
                    </Flex>
                </Table.Cell>
                {NUMERIC_COLUMNS.map((type, j) => (
                    <Table.Cell key={j} style={{ whiteSpace: "nowrap" }}>
                        <NumericCellSkeleton type={type} />
                    </Table.Cell>
                ))}
            </Table.Row>
        ))}
    </>
);

export const BestSubsystems = () => {
    const [data, setData] = useState<SubsystemRow[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortConfig, setSortConfig] = useState({
        key: "min_sell",
        direction: "desc",
    });
    const [hub, setHub] = useState(10000002);
    const [page, setPage] = useState(0);
    const [error, setError] = useState(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        gary<SubsystemRow[]>("/api/home", {json: {page, hub}, signal: controller.signal})
            .then((res) => {
                setData(res);
                setSortConfig({ key: "min_sell", direction: "desc" });
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            })
        
        return () => controller.abort();
    }, [page, hub]);

    const changeHub = (newHub: TradeHub) => {
        setHub(newHub);
        setPage(0);
    }

    const sortData = (
        field:
            | "item_name"
            | "max_buy"
            | "min_sell"
            | "buy_volume"
            | "sell_volume"
            | "losses",
        dir: "asc" | "desc",
    ) => {
        setSortConfig({ key: field, direction: dir });
        const sign = dir === "asc" ? 1 : -1;

        const sortedData = [...data].sort((a, b) => {
            const av = a[field];
            const bv = b[field];
            let cmp;
            if(field === 'item_name'){
                cmp = String(av).localeCompare(String(bv))
            } else {
                cmp = Number(av) - Number(bv)
            }
            return cmp * sign;
        });
        setData(sortedData);
    };

    const getClass = (field: string, dir: string) => {
        if (sortConfig.key === field && sortConfig.direction === dir) {
            return "chevron_selected";
        }

        return "chevron_default";
    };

    return (
        <Card
            style={{ width: "100%", padding: "2rem" }}
            className="box_shadowed"
        >
            <Flex justify="between" align="center" pb="3">
                <Flex gap="1" direction="column" ml="3" mt="2" mb="2">
                    <Heading
                        highContrast
                        size="6"
                        style={{ fontWeight: "600" }}
                    >
                        Popular subsystems
                    </Heading>
                    <Heading
                        size="3"
                        style={{
                            color: "var(--gray-11)",
                            fontWeight: "600",
                        }}
                    >
                        The most used subsystems ordered by price
                    </Heading>
                </Flex>
                <Flex className="mobile_home_navi">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <IconButton size="3" variant="outline">
                                <DotsHorizontalIcon />
                            </IconButton>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content sideOffset={5} align="end">
                            <DropdownMenu.Item onClick={() => changeHub(10000002)}>
                                <Text size="3">Jita</Text>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => changeHub(10000043)}>
                                <Text size="3">Amarr</Text>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => changeHub(10000032)}>
                                <Text size="3">Dodixie</Text>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => changeHub(10000042)}>
                                <Text size="3">Hek</Text>
                            </DropdownMenu.Item>
                            <DropdownMenu.Item onClick={() => changeHub(10000030)}>
                                <Text size="3">Rens</Text>
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </Flex>
                <Flex
                    className="desktop_home_navi"
                    justify="between"
                    gap="2"
                    mb="4"
                    mt="4"
                    mr="4"
                    height="100%"
                    align="center"
                >
                    <Button
                        variant={hub === 10000002 ? "classic" : "outline"}
                        onClick={() => changeHub(10000002)}
                    >
                        <Text size="3">Jita</Text>
                    </Button>
                    <Button
                        variant={hub === 10000043 ? "classic" : "outline"}
                        onClick={() => changeHub(10000043)}
                    >
                        <Text size="3">Amarr</Text>
                    </Button>
                    <Button
                        variant={hub === 10000032 ? "classic" : "outline"}
                        onClick={() => changeHub(10000032)}
                    >
                        <Text size="3">Dodixie</Text>
                    </Button>
                    <Button
                        variant={hub === 10000042 ? "classic" : "outline"}
                        onClick={() => changeHub(10000042)}
                    >
                        <Text size="3">Hek</Text>
                    </Button>
                    <Button
                        variant={hub === 10000030 ? "classic" : "outline"}
                        onClick={() => changeHub(10000030)}
                    >
                        <Text size="3">Rens</Text>
                    </Button>
                </Flex>
            </Flex>
            {
                error ? (
                <Flex direction='column' gap='2' style={{height: '20rem'}} justify='center' align='center'>
                    <Heading color='red'>{error}</Heading>
                    <Text>Please try again later.</Text>
                </Flex>) : 
                (<Table.Root>
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell
                                style={{ whiteSpace: "nowrap" }}
                            >
                                <Flex
                                    justify="center"
                                    align="center"
                                    width="30px"
                                    height="100%"
                                >
                                    <HomeToast data={data} loading={loading}/>
                                </Flex>
                            </Table.ColumnHeaderCell>
    
                            <SortableHeader
                                label="Name"
                                column="item_name"
                                sortData={sortData}
                                getClass={getClass}
                            />
                            <SortableHeader
                                label="Buy Price"
                                column="max_buy"
                                sortData={sortData}
                                getClass={getClass}
                                numeric
                                tooltip={`Highest buy price in ${systemNamesAndIds.find((item) => item.id === hub)?.name}`}
                            />
                            <SortableHeader
                                label="Sell Price"
                                column="min_sell"
                                sortData={sortData}
                                getClass={getClass}
                                numeric
                                tooltip={`Lowest sell price in ${systemNamesAndIds.find((item) => item.id === hub)?.name}`}
                            />
                            <SortableHeader
                                label="Buy Vol"
                                column="buy_volume"
                                sortData={sortData}
                                getClass={getClass}
                                numeric
                                tooltip={`Open buy orders in ${systemNamesAndIds.find((item) => item.id === hub)?.name}`}
                            />
                            <SortableHeader
                                label="Sell Vol"
                                column="sell_volume"
                                sortData={sortData}
                                getClass={getClass}
                                numeric
                                tooltip={`Open sell orders in ${systemNamesAndIds.find((item) => item.id === hub)?.name}`}
                            />
                            <SortableHeader
                                label="Losses"
                                column="losses"
                                sortData={sortData}
                                getClass={getClass}
                                numeric
                                tooltip="Quantity destroyed this week on zkillboard"
                            />
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {loading ? (
                            <SubsystemSkeletonRows />
                        ) : (
                            data.map((row: SubsystemRow) => (
                                <Table.Row key={row.type_id}>
                                    <Table.Cell>
                                        <Flex height="100%" align="center">
                                            <img
                                                src={`https://images.evetech.net/types/${row.type_id}/icon`}
                                                alt={`${row.type_id}`}
                                                style={{
                                                    width: 28,
                                                    height: 28,
                                                }}
                                            />
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <Flex height="100%" align="center">
                                            <Link asChild>
                                                <NextLink href={`/subsystem/${row.type_id}`}>
                                                    <Flex direction="column">
                                                        <Text style={{color: "var(--gray-12)"}} size="3">
                                                            {
                                                                row.item_name.split(
                                                                    " - ",
                                                                )[0]
                                                            }
                                                        </Text>
                                                        <Text size="3">
                                                            {
                                                                row.item_name.split(
                                                                    " - ",
                                                                )[1]
                                                            }
                                                        </Text>
                                                    </Flex>
                                                </NextLink>
                                            </Link>
                                        </Flex>
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <NumericTableCell
                                            value={row.max_buy}
                                            percentage={row.max_buy_percent}
                                            message="30 day median delta"
                                            type="price"
                                        />
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <NumericTableCell
                                            value={row.min_sell}
                                            percentage={row.min_sell_percent}
                                            message="30 day median delta"
                                            type="price"
                                        />
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <NumericTableCell
                                            value={row.buy_volume}
                                            percentage={row.buy_volume_percent}
                                            message="30 day median delta"
                                            type="int"
                                        />
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <NumericTableCell
                                            value={row.sell_volume}
                                            percentage={row.sell_volume_percent}
                                            message="30 day median delta"
                                            type="int"
                                        />
                                    </Table.Cell>
                                    <Table.Cell style={{ whiteSpace: "nowrap" }}>
                                        <NumericTableCell
                                            value={row.losses}
                                            percentage={row.losses_percent}
                                            message="Percentage change from last week"
                                            type="int"
                                        />
                                    </Table.Cell>
                                </Table.Row>
                            ))
                        )}
                    </Table.Body>
                </Table.Root>
                )
            }
            <Flex gap="2" mt="4" mr="4" align="center" justify="end">
                {[1, 2, 3, 4, 5].map((pageNum) => (
                    <Button
                        onClick={(e) => setPage(pageNum - 1)}
                        key={pageNum}
                        variant={pageNum - 1 === page ? 'classic' : "outline"}
                    >
                        {pageNum}
                    </Button>
                ))}
            </Flex>
        </Card>
    );
};