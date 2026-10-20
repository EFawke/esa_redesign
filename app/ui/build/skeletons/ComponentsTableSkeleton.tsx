import { Card, Flex, Heading, IconButton, Skeleton, Table, Text } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";

// Placeholder strings of varying length so the rows don't all look identical.
// Their content is hidden by <Skeleton>; only their width matters.
const NAME_PLACEHOLDERS = [
    "Fullerene Intercalated Sheets",
    "Sylramic Fibers",
    "Nanotransistors",
    "Ferrogel",
    "Phenolic Composites",
    "Hypersynaptic Fibers",
];
const QTY_PLACEHOLDERS = ["12,345", "1,234", "123,456", "987", "45,678", "2,500"];

type Props = {
    rows?: number;
    showTable?: boolean;
    onToggle?: () => void;
};

export function ComponentsTableSkeleton({ rows = 6, showTable = true, onToggle }: Props) {
    return (
        <>
            <Flex justify="start" gap="2" align="center" mt="5" mb="4">
                <Heading size="5">Components</Heading>
                <IconButton
                    size="1"
                    variant="ghost"
                    onClick={onToggle}
                    disabled={!onToggle}
                    aria-expanded={showTable}
                >
                    {showTable ? <ChevronUpIcon height={15} width={15} /> : <ChevronDownIcon height={15} width={15} />}
                </IconButton>
            </Flex>
            {showTable && (
                <Card style={{ width: "100%" }} aria-busy="true" aria-label="Loading components">
                    <Table.Root variant="ghost">
                        <Table.Header>
                            <Table.Row align="center">
                                <Table.ColumnHeaderCell width="56px">
                                    <Flex justify="center">
                                        {/* Stand-in for <BuildToast />; adjust size to match its trigger */}
                                        <Skeleton width="24px" height="24px" />
                                    </Flex>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <Text size="3">Component</Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell justify="end" width="120px">
                                    <Text size="3">Quantity</Text>
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
                                        <Text size="3">
                                            <Skeleton>{NAME_PLACEHOLDERS[i % NAME_PLACEHOLDERS.length]}</Skeleton>
                                        </Text>
                                    </Table.RowHeaderCell>
                                    <Table.Cell justify="end" style={{ fontVariantNumeric: "tabular-nums" }}>
                                        <Text size="3">
                                            <Skeleton>{QTY_PLACEHOLDERS[i % QTY_PLACEHOLDERS.length]}</Skeleton>
                                        </Text>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Card>
            )}
        </>
    );
}