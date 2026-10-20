import ScheduleToast from "./ScheduleToast";
import { useState } from "react";
import {
    Heading,
    Card,
    Table,
    Flex,
    Checkbox,
    IconButton,
    Text,
} from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import {ReactionsSkeleton} from './skeletons/ReactionsSkeleton'

export interface ScheduleRow {
    id: number;
    name: string;
    runs: number;
}

const NUM = { fontVariantNumeric: "tabular-nums" } as const;

export const ReactionSchedule = ({ loading, schedule }: { loading: boolean; schedule: ScheduleRow[] }) => {
    const [showTable, setShowTable] = useState(true);

    if(loading && showTable){
        return <ReactionsSkeleton/>
    }

    return (
        <>
            <Flex justify="start" gap="2" align="center" mt="5" mb="4">
                <Heading size="5">Reactions</Heading>
                <IconButton
                    size="1"
                    variant="ghost"
                    onClick={() => setShowTable((v) => !v)}
                    aria-expanded={showTable}
                >
                    {showTable ? (
                        <ChevronUpIcon height={15} width={15} />
                    ) : (
                        <ChevronDownIcon height={15} width={15} />
                    )}
                </IconButton>
            </Flex>
            {showTable && (
                <Card style={{ width: "100%" }} className="box_shadowed">
                    <Table.Root variant="ghost">
                        <Table.Header>
                            <Table.Row align="center">
                                <Table.ColumnHeaderCell width="56px">
                                    <Flex justify="center">
                                        <ScheduleToast data={schedule} />
                                    </Flex>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <Text size="3">Reaction</Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell>
                                    <Text size="3">Runs</Text>
                                </Table.ColumnHeaderCell>
                                <Table.ColumnHeaderCell
                                    justify="end"
                                    width="120px"
                                >
                                    <Text size="3">Started</Text>
                                </Table.ColumnHeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {schedule.map((c, index) => (
                                <Table.Row key={index} align="center">
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
                                        <Text size="3">{c.name}</Text>
                                    </Table.RowHeaderCell>
                                    <Table.Cell style={NUM}>
                                        <Text size="3">
                                            {c.runs.toLocaleString()}
                                        </Text>
                                    </Table.Cell>
                                    <Table.Cell justify="end" style={NUM}>
                                        <Checkbox />
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
