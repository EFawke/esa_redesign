import { Flex, Card } from "@radix-ui/themes";
import {
    ComposedChart,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    Legend,
    Line,
    Bar,
    CartesianGrid,
} from "recharts";
import { ChartData } from "./AnalysisPageContent";

type Series = {
    label: string;
    key: keyof ChartData & string;
    kind: "line" | "bar";
    color: string;
    isk?: boolean;
};

const SERIES: Series[] = [
    {
        label: "Min Sell",
        key: "minSell",
        kind: "line",
        color: "var(--indigo-9)",
        isk: true,
    },
    {
        label: "Max Buy",
        key: "maxBuy",
        kind: "line",
        color: "var(--teal-9)",
        isk: true,
    },
    {
        label: "Material Cost",
        key: "totalCost",
        kind: "line",
        color: "var(--amber-9)",
        isk: true,
    },
    {
        label: "Profit",
        key: "profit",
        kind: "line",
        color: "var(--grass-9)",
        isk: true,
    },
    { label: "Buy Volume", key: "buyVol", kind: "bar", color: "var(--cyan-9)" },
    {
        label: "Sell Volume",
        key: "sellVol",
        kind: "bar",
        color: "var(--violet-9)",
    },
    {
        label: "Trade Volume",
        key: "tradeVol",
        kind: "bar",
        color: "var(--blue-9)",
    },
    { label: "Losses", key: "losses", kind: "bar", color: "var(--red-9)" },
];

const compact = new Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
});
const full = new Intl.NumberFormat("en", { maximumFractionDigits: 2 });

const axisProps = {
    tick: { fill: "var(--gray-12)", fontSize: 12 },
    tickLine: false,
    axisLine: { stroke: "var(--gray-a6)" },
    tickFormatter: (v: number) => compact.format(v),
};

export const Chart = ({
    data,
    selectedFields,
}: {
    data: ChartData[] | [];
    selectedFields: string[];
}) => {
    const active = SERIES.filter((s) => selectedFields.includes(s.label));
    const hasLines = active.some((s) => s.kind === "line");
    const hasBars = active.some((s) => s.kind === "bar");

    return (
        <Flex style={{ flex: 2 }}>
            <Card
                style={{ width: "100%", height: "100%" }}
                className="box_shadowed"
            >
                {!active.length ? (
                    <Flex
                        style={{
                            width: "100%",
                            height: "100%",
                            color: "var(--gray-11)",
                        }}
                        align="center"
                        justify="center"
                    >
                        Turn on a field to chart it.
                    </Flex>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart
                            data={data}
                            margin={{ top: 26, right: 0, bottom: 20, left: 0 }}
                            barGap={2}
                            barCategoryGap="20%"
                            onClick={(e) => {return;}}
                        >
                            <CartesianGrid
                                yAxisId={hasLines ? "left" : "right"}
                                vertical={false}
                                stroke="var(--gray-a6)"
                                strokeDasharray="3 3"
                            />
                            <XAxis
                                dataKey="day"
                                {...axisProps}
                                tickFormatter={undefined}
                                minTickGap={24}
                                tickMargin={8}
                            />
                            <YAxis
                                yAxisId="left"
                                hide={!hasLines}
                                width={48}
                                {...axisProps}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                hide={!hasBars}
                                width={40}
                                // domain={[0, (max: number) => Math.ceil(max * 2)]}
                                domain={[
                                    0,
                                    (max) => {
                                        const v = Number(max) * 2;
                                        const step =
                                            10 ** Math.floor(Math.log10(v));
                                        return Math.ceil(v / step) * step;
                                    },
                                ]}
                                {...axisProps}
                            />
                            <Tooltip
                                cursor={{
                                    fill: "var(--gray-a3)",
                                    stroke: "var(--gray-a6)",
                                }}
                                contentStyle={{
                                    backgroundColor: "var(--color-panel-solid)",
                                    border: "1px solid var(--gray-a6)",
                                    borderRadius: "var(--radius-3)",
                                    boxShadow: "var(--shadow-4)",
                                    padding: "var(--space-2) var(--space-3)",
                                    fontSize: 13,
                                }}
                                labelStyle={{
                                    color: "var(--gray-12)",
                                    fontWeight: 600,
                                    marginBottom: 4,
                                }}
                                itemStyle={{ padding: 0 }}
                                formatter={(value, name) => {
                                    if (typeof value !== "number")
                                        return [value, name];
                                    const s = SERIES.find(
                                        (x) => x.label === name,
                                    );
                                    const text = full.format(value);
                                    return [
                                        s?.isk ? `${text} ISK` : text,
                                        name,
                                    ];
                                }}
                            />
                            <Legend
                                iconType="circle"
                                iconSize={8}
                                wrapperStyle={{ fontSize: 13, paddingTop: 8 }}
                                formatter={(value: string) => (
                                    <span style={{ color: "var(--gray-11)" }}>
                                        {value}
                                    </span>
                                )}
                            />

                            {active
                                .filter((s) => s.kind === "bar")
                                .map((s) => (
                                    <Bar
                                        key={s.key}
                                        yAxisId="right"
                                        dataKey={s.key}
                                        name={s.label}
                                        fill={s.color}
                                        fillOpacity={0.45}
                                        radius={[3, 3, 0, 0]}
                                        maxBarSize={24}
                                        isAnimationActive={false}
                                    />
                                ))}
                            {active
                                .filter((s) => s.kind === "line")
                                .map((s) => (
                                    <Line
                                        key={s.key}
                                        yAxisId="left"
                                        type="monotone"
                                        dataKey={s.key}
                                        name={s.label}
                                        stroke={s.color}
                                        strokeWidth={2}
                                        dot={false}
                                        activeDot={{
                                            r: 4,
                                            strokeWidth: 2,
                                            stroke: "var(--color-panel-solid)",
                                        }}
                                        connectNulls
                                        animationDuration={600}
                                    />
                                ))}
                        </ComposedChart>
                    </ResponsiveContainer>
                )}
            </Card>
        </Flex>
    );
};
