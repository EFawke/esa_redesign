"use client";

import { Flex } from "@radix-ui/themes";
import { SettingsAccordion } from "@/app/ui/build/SettingsAccordion";
import { type BuildSettings } from "@/app/utils/user_settings";
import { gary } from "@/app/utils/gary";
import { useState, useEffect, useMemo } from "react";
import { ShoppingList } from "./ShoppingList";
import { BuildHeader } from "./BuildHeader";
export interface ComponentRow {
    id: number;
    quantity: number;
    name: string;
}
import { Toast } from "radix-ui";
import { ComponentsTable } from "./ComponentsTable";
import { ReactionSchedule } from "./ReactionSchedule";
interface MaterialsRow {
    percentageChange?: number;
    lineTotal?: number;
    unitPrice?: number;
    quantity: number;
    name: string;
    id: number;
};

export const BuildPage = ({ saved }: { saved: BuildSettings }) => {
    const [settings, setSettings] = useState<BuildSettings>(saved);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);
    const [data, setData] = useState<any | null>(null);
    const [showTable, setShowTable] = useState(true);
    const [debouncedQuery, setDebouncedQuery] = useState<BuildSettings | null>(
        null,
    );

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedQuery(settings);
        }, 400);

        return () => {
            clearTimeout(timeout);
        };
    }, [settings]);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        gary<BuildSettings>("/api/build", {
            json: settings,
            signal: controller.signal,
        })
            .then((res) => {
                console.log("FETCHED")
                setData(res);
            })
            .catch((err) => {
                if (controller.signal.aborted) return;
                console.error(err);
            })
            .finally(() => {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            });

        return () => controller.abort();
    }, [debouncedQuery]);

    return (
        <Flex className="build_container" width="100%" gap="6">
            <Flex
                direction="column"
                className="settings_accordion"
                style={{ height: "fit-content" }}
            >
                <SettingsAccordion
                    settings={settings} 
                    setSettings={setSettings}
                />
            </Flex>
            <Flex
                className="required_materials"
                style={{ height: "fit-content" }}
            >
                <Flex direction="column" style={{ width: "100%" }}>
                    <BuildHeader
                        loading={loading}
                        totalJobCost={data?.totalJobCost}
                        totalTax={data?.totalTax}
                        matCostTotal={data?.maxBuys}
                        core={settings?.coreVolume}
                        def={settings?.defensiveVolume}
                        prop={settings?.propulsionVolume}
                        off={settings?.offensiveVolume}
                        numRuns={data?.blueprints.numRuns}
                    />
                    <Toast.Provider swipeDirection="right">
                        <ComponentsTable
                            loading={loading}
                            components={data?.requiredMaterialsForAll
                                .filter(
                                    (item: MaterialsRow) =>
                                        item?.unitPrice === undefined,
                                )
                                .sort(
                                    (a: MaterialsRow, b: MaterialsRow) =>
                                        a.quantity - b.quantity,
                                )}
                        />
                        <Toast.Viewport className="ToastViewport" />
                    </Toast.Provider>
                    <Toast.Provider swipeDirection="right">
                        <ShoppingList
                            loading={loading}
                            shoppingList={data?.requiredMaterialsForAll.filter(
                                (item: MaterialsRow) =>
                                    item?.unitPrice !== undefined,
                            )}
                        />
                        <Toast.Viewport className="ToastViewport" />
                    </Toast.Provider>
                    <Toast.Provider swipeDirection="right">
                        <ReactionSchedule
                            schedule={data?.schedule}
                            loading={loading}
                        />
                        <Toast.Viewport className="ToastViewport" />
                    </Toast.Provider>
                </Flex>
            </Flex>
        </Flex>
    );
};
