import { Box, Flex, Text, Tooltip, Badge } from "@radix-ui/themes";
import { DoubleArrowUpIcon, DoubleArrowDownIcon } from "@radix-ui/react-icons";
import { formatNumber, getClassName } from "../utils/uiHelpers";

export default function NumericTableCell({
    value,
    percentage,
    message,
    type,
    upIsBad
}: {
    value: number | "Infinity" | '0';
    percentage?: number;
    message: string;
    type: "price" | "int";
    upIsBad?: boolean;
}) {
    if (value === 0) {
        return (
            <Flex height="100%" align="center" justify="end">
                <Badge variant="outline" color="orange" size="3">
                    No Data
                </Badge>
            </Flex>
        );
    }

    const formatted = (
        <Text size="3" align="right" style={{whiteSpace: "nowrap", color: 'var(--gray-12)'}}>
            {formatNumber(value, type)}
        </Text>
    );

    return (
        <Box
            height="100%"
            style={value === "Infinity" || value === '0' ? {} : {
                display: "grid",
                gridTemplateColumns: "1fr 3rem",
                alignItems: "center",
                columnGap: "var(--space-2)",
                fontVariantNumeric: "tabular-nums",
            }}
        >
            {value === "Infinity" || value === '0' ? (
                <Flex justify='end' align='center' style={{width: '100%', height: '100%'}}>
                    <Badge variant="outline" color="orange" size="3" style={{
                        padding: 'var(--space-2)', 
                        width: '100%', 
                        justifyContent: 'center',
                        maxWidth: '8rem'
                    }}>
                        No Data
                    </Badge>
                </Flex>
            ) : type === "price" && Number(value) > 1000000 ? (
                <Tooltip content={`${Number(value).toLocaleString()} ISK`}>
                    {formatted}
                </Tooltip>
            ) : (
                formatted
            )}
            {value === "Infinity" || value === '0' || percentage === undefined ? null : (
                <Tooltip content={message}>
                    <Flex
                        direction="column"
                        align="end"
                        className={getClassName(percentage, upIsBad)}
                    >
                        {percentage > 0 && (
                            <DoubleArrowUpIcon height="12px" width="12px" />
                        )}
                        {percentage < 0 && (
                            <DoubleArrowDownIcon height="12px" width="12px" />
                        )}
                        <Text style={{ fontSize: "12px" }}>
                            {Number(percentage).toFixed(1)}%
                        </Text>
                    </Flex>
                </Tooltip>
            )}
        </Box>
    );
}
