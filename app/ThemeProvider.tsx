"use client";

import React, { useState, useEffect } from "react";
import Cookies from 'js-cookie'
import { Theme } from "@radix-ui/themes";
import { Header } from "./header/Header";

type Appearance = "light" | "dark";

export function ThemeProvider({
    children,
    initialAppearance,
}: {
    children: React.ReactNode;
    initialAppearance?: Appearance;
}) {
    const [appearance, setAppearance] = useState<Appearance>(
        initialAppearance ?? "dark",
    );

    useEffect(() => {
        if (initialAppearance) return;
        const domAppearance = document.documentElement.classList.contains(
            "dark",
        )
            ? "dark"
            : "light";
        setAppearance(domAppearance);
    }, [initialAppearance]);

    const toggleAppearance = (current: Appearance) => {
        console.log("toggled")
        const next: Appearance = current === 'light' ? 'dark' : 'light'
        const d = document.documentElement
        d.classList.remove('light', 'dark')
        d.classList.add(next)
        d.style.colorScheme = next
        console.log(next)
        setAppearance(next)
        Cookies.set('appearance', next, { expires: 365, sameSite: 'lax', path: '/' })
    }

    const props = { appearance, toggleAppearance };

    return (
        <Theme
            accentColor='amber'
            panelBackground='solid'
            radius='large'
            appearance={appearance}
            grayColor='mauve'
            style={appearance === 'light' ? {background: 'var(--gray-2)'} : {}}
        >
            <Header props={props} />
            {children}
        </Theme>
    );
}
