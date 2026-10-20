// SortableHeader.tsx
import { Flex, IconButton, Table, Text, Tooltip } from "@radix-ui/themes";
import { ChevronUpIcon, ChevronDownIcon } from "@radix-ui/react-icons";

export const NUMERIC_GRID: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "1fr 2.5rem",
    alignItems: "center",
    columnGap: "var(--space-2)",
};

type Direction = "asc" | "desc";
type Column = 'item_name' | 'max_buy' | 'min_sell' | 'buy_volume' | 'sell_volume' | 'losses'
export function SortableHeader({
    label,
    column,
    sortData,
    getClass,
    numeric = false,
    tooltip,
}: {
    label: string;
    column: Column;
    sortData: (column: Column, direction: Direction) => void;
    getClass: (column: string, direction: Direction) => string;
    numeric?: boolean;
    tooltip?: string;
}) {
    const text = <Text size="3">{label}</Text>;

    const carets = (
        <Flex direction="column" align="end">
            <IconButton
                highContrast
                size="2"
                variant="ghost"
                aria-label={`Sort ${label} ascending`}
                onClick={() => sortData(column, "asc")}
            >
                <ChevronUpIcon className={getClass(column, "asc")} />
            </IconButton>
            <IconButton
                highContrast
                size="2"
                variant="ghost"
                aria-label={`Sort ${label} descending`}
                onClick={() => sortData(column, "desc")}
            >
                <ChevronDownIcon className={getClass(column, "desc")} />
            </IconButton>
        </Flex>
    );

    return (
        <Table.ColumnHeaderCell style={{ whiteSpace: "nowrap" }}>
            {numeric ? (
                <div style={NUMERIC_GRID}>
                    <Flex justify="end">
                        {tooltip ? <Tooltip content={tooltip}>{text}</Tooltip> : text}
                    </Flex>
                    {carets}
                </div>
            ) : (
                <Flex gap="2" align="center" justify="between">
                    {tooltip ? <Tooltip content={tooltip}>{text}</Tooltip> : text}
                    {carets}
                </Flex>
            )}
        </Table.ColumnHeaderCell>
    );
}