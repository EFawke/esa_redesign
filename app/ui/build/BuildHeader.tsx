import { Heading, Card, Flex, Tooltip, Text, DataList } from "@radix-ui/themes";
import {BuildHeaderSkeleton} from './skeletons/BuildHeaderSkeleton'

const NUM = { fontVariantNumeric: "tabular-nums" } as const;
import NumericTableCell from "../NumericTableCell";
export const BuildHeader = ({
    loading,
    totalJobCost,
    totalTax,
    matCostTotal,
    core,
    def,
    prop,
    off,
    numRuns,
}: {
    loading: boolean;
    totalJobCost: number;
    totalTax: number;
    matCostTotal: number;
    core: number | "";
    def: number | "";
    prop: number | "";
    off: number | "";
    numRuns: number;
}) => {
    const subsystems = [
        { label: "Defensive",   typeId: 45589, count: def },
        { label: "Core",        typeId: 45626, count: core },
        { label: "Propulsion",  typeId: 45621, count: prop },
        { label: "Offensive",   typeId: 45601, count: off },
    ];

    if(loading) {
        return <BuildHeaderSkeleton/>
    }

    return (
        <Flex style={{width: '100%'}} direction='column'>
            <Heading mt="5" mb="4" size="5">
                Overview
            </Heading>
            <Card style={{ width: "100%" }} className="box_shadowed">
                <Flex
                    justify="between"
                    align="center"
                    gap="6"
                    wrap="wrap"
                    p="2"
                    style={{width: '100%'}}
                    className="build_header_container"
                >
                    <DataList.Root style={{width: '20%'}}>
                        <DataList.Item>
                            <DataList.Label minWidth="140px"><Text size='3'>Materials</Text></DataList.Label>
                            <DataList.Value>
                                <NumericTableCell value={matCostTotal} percentage={undefined} message={""} type="price"/>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="140px"><Text size='3'>Industry taxes</Text></DataList.Label>
                            <DataList.Value>
                                <NumericTableCell value={totalTax} percentage={undefined} message={""} type="price"/>
                            </DataList.Value>
                        </DataList.Item>
                        <DataList.Item>
                            <DataList.Label minWidth="140px" highContrast><Text size='3'>Total</Text></DataList.Label>
                            <DataList.Value><NumericTableCell value={totalJobCost} percentage={undefined} message={""} type="price"/></DataList.Value>
                        </DataList.Item>
                    </DataList.Root>

                    <Flex gap="8" align="center" justify='center' style={{width: '60%'}}>
                        {subsystems.map((s) => (
                            <Tooltip key={s.label} content={s.label}>
                                <Flex direction="column" gap="1" align="center">
                                    <img
                                        width={28}
                                        height={28}
                                        src={`https://image.eveonline.com/Type/${s.typeId}_64.png`}
                                        alt={s.label}
                                    />
                                    <Text size="3" weight="light" style={NUM}>
                                        {numRuns * Number(s.count)}
                                    </Text>
                                </Flex>
                            </Tooltip>
                        ))}
                    </Flex>
                </Flex>
            </Card>
        </Flex>
    );
};