import BuildToast from "./ComponentsToast";
import { useState } from "react";
import { Heading, Card, Table, Flex, IconButton, Text } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { ComponentsTableSkeleton } from './skeletons/ComponentsTableSkeleton'

export interface ComponentRow {
    id: number;
    quantity: number;
    name: string;
}

const NUM = { fontVariantNumeric: "tabular-nums" } as const;

export const ComponentsTable = ({
    loading,
    components
}: {
    loading: boolean;
    components: ComponentRow[];
}) => {
    const [showTable, setShowTable] = useState(true);

    if(loading && showTable){
        return (<ComponentsTableSkeleton/>)
    }

    return (
        <>
            <Flex justify="start" gap="2" align='center' mt="5" mb="4">
                <Heading size="5">
                    Components
                </Heading>
                <IconButton size='1'
                    variant='ghost'
                    onClick={() => setShowTable((v) => !v)}
                    aria-expanded={showTable}
                >
                    {showTable ? <ChevronUpIcon height={15} width={15}/> : <ChevronDownIcon height={15} width={15}/>}
                </IconButton>
            </Flex>
            {showTable && (
                <Card style={{ width: "100%" }} className="box_shadowed">
                    <Table.Root variant="ghost">
                        <Table.Header>
                            <Table.Row align="center">
                                <Table.ColumnHeaderCell width="56px">
                                    <Flex justify="center">
                                        <BuildToast data={components} />
                                    </Flex>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                <Text size='3'>Component</Text>

                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell
                                    justify="end"
                                    width="120px"
                                >
                                    <Text size='3'>Quantity</Text>
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {components.map((c) => (
                                <Table.Row key={c.id} align="center">
                                    <Table.Cell>
                                        <Flex justify="center">
                                            <img
                                                width={28}
                                                height={28}
                                                alt={c.name}
                                                src={`https://image.eveonline.com/Type/${c.id}_64.png`}
                                            />
                                        </Flex>
                                    </Table.Cell>
                                    <Table.RowHeaderCell>
                                        <Text size='3'>{c.name}</Text>
                                    </Table.RowHeaderCell>
                                    <Table.Cell justify="end" style={NUM}>
                                        <Text size='3'>{c.quantity.toLocaleString()}</Text>
                                    </Table.Cell>
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Card>
            )}
        </>
    );
};
