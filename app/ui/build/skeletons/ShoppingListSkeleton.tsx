import {
    Card,
    Flex,
    Heading,
    IconButton,
    Skeleton,
    Table,
    Text,
} from "@radix-ui/themes";
import { ChevronUpIcon } from "@radix-ui/react-icons";

type ShoppingListSkeletonProps = {
    rows?: number;
};

// Varied name widths so the placeholder rows don't look like a barcode.
const NAME_WIDTHS = ["160px", "220px", "130px", "190px", "250px", "145px"];

export function ShoppingListSkeleton({ rows = 6 }: ShoppingListSkeletonProps) {
    return (
        <>
            <Flex justify="between" align="start" mt="5" mb="4">
                <Flex align="center" gap="2">
                    <Heading size="5">Shopping List</Heading>
                    <IconButton size="1" variant="ghost" disabled>
                        <ChevronUpIcon height={15} width={15} />
                    </IconButton>
                </Flex>
                <Flex justify="end">
                    {/* Matches SegmentedControl size="2" footprint */}
                    <Skeleton width="128px" height="32px" />
                </Flex>
            </Flex>

            <Card size="3" style={{ width: "100%" }} aria-busy="true">
                <Table.Root size="3" variant="ghost">
                    <Table.Header>
                        <Table.Row align="center">
                            <Table.ColumnHeaderCell>
                                <Flex justify="center">
                                    <Skeleton width="28px" height="28px" />
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Text size="3">Name</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify="end" width="110px">
                                <Text size="3">Quantity</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify="end" width="220px">
                                <Skeleton>
                                    <Text size="3">Unit price</Text>
                                </Skeleton>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Array.from({ length: rows }, (_, i) => (
                            <Table.Row key={i} align="center">
                                <Table.Cell>
                                    <Flex justify="center">
                                        <Skeleton width="28px" height="28px" />
                                    </Flex>
                                </Table.Cell>
                                <Table.RowHeaderCell>
                                    <Skeleton
                                        width={NAME_WIDTHS[i % NAME_WIDTHS.length]}
                                        height="20px"
                                    />
                                </Table.RowHeaderCell>
                                <Table.Cell justify="end">
                                    <Flex justify="end">
                                        <Skeleton width="48px" height="20px" />
                                    </Flex>
                                </Table.Cell>
                                <Table.Cell justify="end">
                                    <Flex justify="end" align="center" gap="2">
                                        <Skeleton width="96px" height="20px" />
                                        <Skeleton width="52px" height="20px" />
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </>
    );
}