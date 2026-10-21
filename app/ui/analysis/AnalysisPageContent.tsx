"use client";

import { useEffect, useState } from "react";
import { AnalysisComponent } from "./AnalysisComponent";
import { Chart } from "./Chart";
import { gary } from "../../utils/gary";
import { Switch, Skeleton, Table, Text, Flex, Card } from "@radix-ui/themes";

const AnalysisSkeleton = ({ rows = 8 }: { rows?: number }) => (
    <Card className="box_shadowed">
        <Table.Root>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>
                        <Text size="3">Data</Text>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        <Text size="3">Value</Text>
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell>
                        <Text size="3">Add to Chart</Text>
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {Array.from({ length: rows }).map((_, i) => (
                    <Table.Row key={i}>
                        <Table.Cell>
                            <Flex height="100%" align="center">
                                <Skeleton>
                                    <Text size="3">Trade Volume</Text>
                                </Skeleton>
                            </Flex>
                        </Table.Cell>
                        <Table.Cell>
                            <Flex gap="2" align="center" justify="between">
                                <Skeleton>
                                    <Text size="3">1,234,567</Text>
                                </Skeleton>
                                <Flex direction="column" align="center" gap="1">
                                    <Skeleton width="15px" height="15px" />
                                    <Skeleton>
                                        <Text size="1">00.0%</Text>
                                    </Skeleton>
                                </Flex>
                            </Flex>
                        </Table.Cell>
                        <Table.Cell>
                            <Flex height="100%" align="center" justify="center">
                                <Skeleton width="24px" height="24px" />
                            </Flex>
                        </Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    </Card>
);

export interface CurrentDataField {
    currentValue: number;
    change: number;
    title: string;
}

export interface CurrentData {
    buyVol: CurrentDataField;
    sellVol: CurrentDataField;
    lossed: CurrentDataField;
    maxBuy: CurrentDataField;
    minSell: CurrentDataField;
    profit: CurrentDataField;
    totalCost: CurrentDataField;
    tradeVol: CurrentDataField;
}

export interface ChartData {
    day: string | Date;
    buyVol: number;
    sellVol: number;
    losses: number;
    maxBuy: number;
    minSell: number;
    profit: number;
    totalCost: number;
    tradeVol: number;
}

export interface AnalysisResponse {
    currentValues: CurrentData;
    chartData: ChartData[];
}

const ChartSkeleton = () => {
    return (
        <Flex style={{ flex: 2, height: '100%' }}>
            <Card
                style={{ width: "100%", height: '100%', minHeight: "400px" }}
                className="box_shadowed"
            >
                <Flex
                    style={{
                        width: "100%",
                        height: "100%",
                        color: "var(--gray-11)",
                    }}
                    align="center"
                    justify="center"
                >
                    
                </Flex>
            </Card>
        </Flex>
    );
};

export function AnalysisPageContent({ id }: { id: number }) {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<ChartData[] | []>([]);
    const [error, setError] = useState(null);
    const [selectedFields, setSelectedFields] = useState(["Profit"]);
    const [current, setCurrent] = useState<CurrentData | null>(null);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);
        setError(null);

        gary<AnalysisResponse>("/api/subsystem", {
            json: { id },
            signal: controller.signal,
        })
            .then((res: AnalysisResponse) => {
                setData(
                    res.chartData.map((data: ChartData) => {
                        const date = new Date(data.day);
                        const formattedDay = date.toLocaleDateString();
                        return {
                            ...data,
                            day: formattedDay,
                        };
                    }),
                );
                setCurrent(res.currentValues);
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                console.error(err);
                setError(err.message);
            })
            .finally(() => {
                if (!controller.signal.aborted) setLoading(false);
            });

        return () => controller.abort();
    }, [id]);

    const handleSelectChange = (val: boolean, title: string) => {
        if (val) {
            setSelectedFields([...selectedFields, title]);
        } else {
            const fields = [...selectedFields].filter((item) => item !== title);

            setSelectedFields(fields);
        }
    };

    const renderIconButton = (title: string) => {
        return (
            <Switch
                defaultChecked={selectedFields.includes(title)}
                onCheckedChange={(event) => handleSelectChange(event, title)}
            />
        );
    };

    return loading ? (
        <Flex gap="6" style={{ width: "100%" }} className="analysis_page_layout">
            <AnalysisSkeleton />
            <ChartSkeleton />
        </Flex>
    ) : (
        <Flex gap="6" style={{ width: "100%" }} className="analysis_page_layout">
            <AnalysisComponent
                loading={loading}
                data={current}
                renderIconButton={renderIconButton}
            />
            <Chart data={data} selectedFields={selectedFields} />
        </Flex>
    );
}
