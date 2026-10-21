"use client";

import { Flex, Card, Heading, Text } from "@radix-ui/themes";
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
import { ArrowLeftIcon } from "@radix-ui/react-icons";
interface MaterialsRow {
    percentageChange?: number;
    lineTotal?: number;
    unitPrice?: number;
    quantity: number;
    name: string;
    id: number;
}

const EmptyState = () => {
    return (
        <Flex
            direction="column"
            className="required_materials"
        >
            <Heading mt="5" mb="4" size="5">
                Overview
            </Heading>
            <Card style={{ width: "100%" }} className="box_shadowed">
                <Flex mt="9" mb="9" align="center" justify="center" direction='row' gap='2'>
                <ArrowLeftIcon style={{color: 'var(--accent-a11)'}}/><Text>Update your <span style={{color: 'var(--accent-a11)', textDecoration: 'underline'}}>Build Volume</span> to get something here.</Text>
                </Flex>
            </Card>
        </Flex>
    );
};

export const BuildPage = ({ saved }: { saved: BuildSettings }) => {
    const [settings, setSettings] = useState<BuildSettings>(saved);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any | null>(null);
    const [debouncedSettings, setDebouncedSettings] =
        useState<BuildSettings>(saved);

    useEffect(() => {
        if (settings === debouncedSettings) {
            return;
        }
        setLoading(true);
        const timeout = setTimeout(() => {
            setDebouncedSettings(settings);
        }, 400);

        return () => {
            clearTimeout(timeout);
            setLoading(false);
        };
    }, [settings]);

    useEffect(() => {
        const controller = new AbortController();
        setLoading(true);

        gary<BuildSettings>("/api/build", {
            json: debouncedSettings,
            signal: controller.signal,
        })
            .then((res) => {
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
    }, [debouncedSettings]);

    return (
        <Flex className="build_container" width="100%" gap="6">
            <Flex
                direction="column"
                className="settings_accordion"
                style={{ height: "fit-content" }}
            >
                <SettingsAccordion
                    settings={debouncedSettings}
                    setSettings={setSettings}
                />
            </Flex>
            {debouncedSettings.coreVolume === 0 &&
            debouncedSettings.defensiveVolume === 0 &&
            debouncedSettings.offensiveVolume === 0 &&
            debouncedSettings.propulsionVolume === 0 ? (
                <EmptyState />
            ) : (
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
                            core={debouncedSettings.coreVolume}
                            def={debouncedSettings.defensiveVolume}
                            prop={debouncedSettings.propulsionVolume}
                            off={debouncedSettings.offensiveVolume}
                            numRuns={data?.blueprints.numRuns}
                        />
                        <Toast.Provider swipeDirection="right">
                            <ComponentsTable
                                loading={loading}
                                components={data?.requiredMaterialsForAll
                                    .filter(
                                        (item: MaterialsRow) =>
                                            item?.unitPrice === undefined &&
                                            item.name !== "None",
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
            )}
        </Flex>
    );
};
