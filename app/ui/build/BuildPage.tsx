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
import { MaterialsInput } from "./MaterialsInput";

export interface MaterialsRow {
    percentageChange?: number;
    lineTotal?: number;
    unitPrice?: number;
    quantity: number;
    name: string;
    id: number;
}

export interface ShoppingRow {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    percentageChange?: number;
}

export interface HangarContent {
    name: string;
    quantity: number;
}

const EmptyState = () => {
    return (
        <Flex direction="column" className="required_materials">
            <Heading mt="5" mb="4" size="5">
                Overview
            </Heading>
            <Card style={{ width: "100%" }} className="box_shadowed">
                <Flex
                    mt="9"
                    mb="9"
                    align="center"
                    justify="center"
                    direction="row"
                    gap="2"
                >
                    <ArrowLeftIcon style={{ color: "var(--accent-a11)" }} />
                    <Text>
                        Update your{" "}
                        <span
                            style={{
                                color: "var(--accent-a11)",
                                textDecoration: "underline",
                            }}
                        >
                            Build Volume
                        </span>{" "}
                        to get something here.
                    </Text>
                </Flex>
            </Card>
        </Flex>
    );
};

const isEmptyVolume = (v: unknown) => !Number(v);

export const BuildPage = ({ saved }: { saved: BuildSettings }) => {
    const [settings, setSettings] = useState<BuildSettings>(saved);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any | null>(null);
    const [hangar, setHangar] = useState<HangarContent[]>([]);
    const [debouncedSettings, setDebouncedSettings] = useState<BuildSettings>(saved);

    const allEmpty = [
        debouncedSettings.coreVolume,
        debouncedSettings.defensiveVolume,
        debouncedSettings.offensiveVolume,
        debouncedSettings.propulsionVolume,
    ].every(isEmptyVolume);

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

        if (allEmpty) {
            setLoading(false);
            return;
        }

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

    const shoppingList: ShoppingRow[] = data?.requiredMaterialsForAll.filter(
        (item: MaterialsRow) => item?.unitPrice !== undefined,
    ).map((data: ShoppingRow) => {
        return {
            ...data,
            quantity: data.quantity - (hangar.find((item) => item.name === data.name)?.quantity || 0),
            lineTotal: data.lineTotal - ((hangar.find((item) => item.name === data.name)?.quantity || 0) * data.unitPrice)
        }
    }).filter((item: ShoppingRow) => item.quantity > 0);

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
            {allEmpty ? (
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
                            core={Number(debouncedSettings.coreVolume) || 0}
                            def={Number(debouncedSettings.defensiveVolume) || 0}
                            prop={
                                Number(debouncedSettings.propulsionVolume) || 0
                            }
                            off={Number(debouncedSettings.offensiveVolume) || 0}
                            numRuns={data?.blueprints.numRuns}
                        />

                        <MaterialsInput setHangar={setHangar} />
                        <Toast.Provider swipeDirection="right">
                            <ShoppingList
                                loading={loading}
                                shoppingList={shoppingList}
                            />
                            <Toast.Viewport className="ToastViewport" />
                        </Toast.Provider>
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
