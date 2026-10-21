"use client";

import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
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
  const [appearance, setAppearance] = useState<Appearance | undefined>(initialAppearance);

  useEffect(() => {
    if (appearance) return;
    setAppearance(
      document.documentElement.classList.contains("dark") ? "dark" : "light",
    );
  }, [appearance]);

  const toggleAppearance = (current: Appearance) => {
    const next: Appearance = current === "light" ? "dark" : "light";
    const d = document.documentElement;
    d.classList.remove("light", "dark");
    d.classList.add(next);
    d.style.colorScheme = next;
    setAppearance(next);
    Cookies.set("appearance", next, { expires: 365, sameSite: "lax", path: "/" });
  };

  const props = { appearance: appearance ?? "dark", toggleAppearance };

  return (
    <Theme
      accentColor="amber"
      panelBackground="solid"
      radius="large"
      grayColor="mauve"
      appearance={appearance ?? "inherit"}
    >
      <Header props={props} />
      {children}
    </Theme>
  );
}