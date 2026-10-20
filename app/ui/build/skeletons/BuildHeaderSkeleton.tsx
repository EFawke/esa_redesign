import { Card, DataList, Flex, Heading, Skeleton, Text } from "@radix-ui/themes";

type OverviewSkeletonProps = {
    /** How many subsystem icons to reserve space for (T3 cruisers have 4). */
    subsystemCount?: number;
};

const ROWS = [
    { label: "Materials", highContrast: false },
    { label: "Industry taxes", highContrast: false },
    { label: "Total", highContrast: true },
];

export function BuildHeaderSkeleton({ subsystemCount = 4 }: OverviewSkeletonProps) {
    return (
        <Flex style={{ width: "100%" }} direction="column" aria-busy="true">
            {/* The heading is static, so it can render for real */}
            <Heading mt="5" mb="4" size="5">
                Overview
            </Heading>
            <Card style={{ width: "100%" }} className="box_shadowed">
                <Flex justify="between" align="center" gap="6" wrap="wrap" p="2">
                    <DataList.Root>
                        {ROWS.map((row) => (
                            <DataList.Item key={row.label}>
                                <DataList.Label minWidth="140px" highContrast={row.highContrast}>
                                    <Text size="3">{row.label}</Text>
                                </DataList.Label>
                                <DataList.Value>
                                    <Skeleton width="110px" height="20px" />
                                </DataList.Value>
                            </DataList.Item>
                        ))}
                    </DataList.Root>

                    <Flex gap="5" align="center" className="subs_build_container">
                        {Array.from({ length: subsystemCount }).map((_, i) => (
                            <Flex key={i} direction="column" gap="1" align="center">
                                <Skeleton width="28px" height="28px" />
                                <Skeleton width="20px" height="18px" />
                            </Flex>
                        ))}
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
}