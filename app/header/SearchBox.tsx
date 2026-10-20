"use client";

import { useState, useRef, useEffect } from "react";
import { namesAndIds } from "../utils/namesAndIds";
import * as Ariakit from "@ariakit/react";
import "../css/searchbox.css";
import { Flex, Text } from "@radix-ui/themes";

export default function SearchBox() {
  const comboboxStore = Ariakit.useComboboxStore();
  const [selectedValue, setSelectedValue] = useState(null);

  // We can observe the store's "value" state directly. This returns what the user typed.
  const searchValue = comboboxStore.useState("value");

  // Filter your array based on the searchValue
  const filteredNames = namesAndIds.filter((item) =>
    item.name.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const comboboxRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      const isTypingElsewhere =
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement;
      event.target?.isContentEditable;

      if (!isTypingElsewhere && event?.key === "/") {
        event.preventDefault();
        comboboxRef.current?.focus();
        comboboxStore.setOpen(true);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [comboboxStore]);

  const handleSelect = (value: any) => {
    setSelectedValue(value);
    const selectedItem = namesAndIds.find((item) => item.name === value);
    if (selectedItem) {
      window.location.href = `/subsystem/${selectedItem.id}`;
    }
  };

  return (
    <Ariakit.ComboboxProvider store={comboboxStore} id="searchbox">
      <div className="combobox-input-container">
        <Ariakit.Combobox
          ref={comboboxRef}
          store={comboboxStore}
          placeholder="Search subsystems..."
          className="combobox searchbox"
          style={{
            borderRadius: "var(--radius-4)",
            outlineColor: "var(--accent-a11)",
            height: "2.5rem",
          }}
        />
        <div className="shortcut-icon" aria-hidden="true">
          /
        </div>
      </div>
      <Ariakit.ComboboxPopover
        store={comboboxStore}
        gutter={4}
        sameWidth
        className="popover searchbox"
      >
        {filteredNames.length === 0 ? (
          <Ariakit.ComboboxItem>No results</Ariakit.ComboboxItem>
        ) : (
          filteredNames.map((item) => (
            <Ariakit.ComboboxItem
              key={item.id}
              value={item.name}
              onClick={() => handleSelect(item.name)}
              className={
                "combobox-item" +
                (selectedValue === item.name ? " selected" : "")
              }
            >
              <Flex direction="column">
                <Text size="3">{item.name.split(" - ")[0]}</Text>
                <Text size="3">{item.name.split(" - ")[1]}</Text>
              </Flex>
            </Ariakit.ComboboxItem>
          ))
        )}
      </Ariakit.ComboboxPopover>
    </Ariakit.ComboboxProvider>
  );
}
