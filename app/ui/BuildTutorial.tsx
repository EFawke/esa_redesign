"use client";

import {
    Flex,
    Text,
    Slider,
    Card,
    Switch,
    Separator,
    Select,
    IconButton
} from "@radix-ui/themes";
import { useState, useEffect } from "react";
import { GearIcon } from "@radix-ui/react-icons";

const SLIDER_MIN = 50;
const SLIDER_MAX = 100;
const DURATION = 1500; // ms

const easeInOutCubic = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

export function BuildTutorial() {
    const [sliderVal, setSliderVal] = useState([SLIDER_MIN]);
    const [reactionsChecked, setReactionsChecked] = useState(false);
    const [componentsChecked, setComponentsChecked] = useState(false);

    useEffect(() => {
        let frame: number;
        const timeouts: ReturnType<typeof setTimeout>[] = [];
        const after = (ms: number, fn: () => void) =>
            timeouts.push(setTimeout(fn, ms));
        const start = performance.now();

        const tick = (now: number) => {
            const t = Math.min((now - start) / DURATION, 1);
            setSliderVal([
                SLIDER_MIN + (SLIDER_MAX - SLIDER_MIN) * easeInOutCubic(t),
            ]);

            if (t < 1) {
                frame = requestAnimationFrame(tick);
            } else {
                after(300, () => setComponentsChecked(true));
                after(800, () => setReactionsChecked(true));
            }
        };

        frame = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frame);
            timeouts.forEach(clearTimeout);
        };
    }, []);

    return (
        <Card className="box_shadowed">
            <Flex justify="between" gap='5'>
                <Flex
                    direction="column"
                    gap="4"
                    width="250px"
                    style={{ margin: 'var(--space-2)' }}
                >
                    <Flex gap="3" direction="column" className="appear_on_load">
                        <Text size="3" weight="bold">
                            Material Efficiency
                        </Text>
                        <Slider value={sliderVal} step={0.1} size="2" />
                    </Flex>
                    <Separator
                        style={{ width: "250px" }}
                        className="appear_on_load"
                    />
                    <Flex gap="3" direction="column" className="appear_on_load">
                        <Text size="3" weight="bold">
                            Building Components
                        </Text>
                        <Switch checked={componentsChecked} />
                    </Flex>
                    <Separator
                        style={{ width: "250px" }}
                        className="appear_on_load"
                    />
                    <Flex gap="3" direction="column" className="appear_on_load">
                        <Text size="3" weight="bold">
                            Running Reactions
                        </Text>
                        <Switch checked={reactionsChecked} />
                    </Flex>
                </Flex>
                <Flex
                    direction="column"
                    gap="4"
                    width="250px"
                    style={{ margin: 'var(--space-2)' }}
                >
                    <IconButton size='4' variant='ghost'><GearIcon height='3rem' width='3rem'/></IconButton>
                </Flex>
            </Flex>
        </Card>
    );
}
