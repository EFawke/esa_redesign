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

const NUM = { fontVariantNumeric: "tabular-nums" } as const;

// Varied widths so the rows don't look like a barcode
const NAME_WIDTHS = ["180px", "140px", "210px", "160px", "190px", "130px"];

export function ReactionsSkeleton({ rows = 6 }: { rows?: number }) {
    return (
        <>
            <Flex justify="start" gap="2" align="center" mt="5" mb="4">
                <Heading size="5">Reactions</Heading>
                <IconButton size="1" variant="ghost" disabled aria-hidden>
                    <ChevronUpIcon height={15} width={15} />
                </IconButton>
            </Flex>
            <Card style={{ width: "100%" }} aria-busy="true" className="box_shadowed">
                <Table.Root variant="ghost">
                    <Table.Header>
                        <Table.Row align="center">
                            <Table.ColumnHeaderCell width="56px">
                                <Flex justify="center">
                                    <Skeleton width="24px" height="24px" />
                                </Flex>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Text size="3">Reaction</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell>
                                <Text size="3">Runs</Text>
                            </Table.ColumnHeaderCell>
                            <Table.ColumnHeaderCell justify="end" width="120px">
                                <Text size="3">Started</Text>
                            </Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        {Array.from({ length: rows }).map((_, i) => (
                            <Table.Row key={i} align="center">
                                <Table.Cell>
                                    <Flex justify="center">
                                        <Skeleton width="28px" height="28px" />
                                    </Flex>
                                </Table.Cell>
                                <Table.RowHeaderCell>
                                    <Text size="3">
                                        <Skeleton
                                            width={NAME_WIDTHS[i % NAME_WIDTHS.length]}
                                        >
                                            Loading reaction
                                        </Skeleton>
                                    </Text>
                                </Table.RowHeaderCell>
                                <Table.Cell style={NUM}>
                                    <Text size="3">
                                        <Skeleton width="48px">0,000</Skeleton>
                                    </Text>
                                </Table.Cell>
                                <Table.Cell justify="end" style={NUM}>
                                    <Skeleton width="16px" height="16px" />
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </>
    );
}