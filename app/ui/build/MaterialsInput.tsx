import { Flex, TextArea, Card, Heading, IconButton } from "@radix-ui/themes";
import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { HangarContent } from "./BuildPage";
import { componentNames } from "@/app/utils/namesAndIds";
import { ChangeEvent } from "react";

export const MaterialsInput = ({
    setHangar,
}: {
    setHangar: (hangar: HangarContent[]) => void;
}) => {
    const [showTable, setShowTable] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState<string>("");

    const parseRaw = (val: string):HangarContent[] => {
        const rows = val
            ?.split("\n")
            .map((row) => {
                return {
                    name: row?.split("\t")[0],
                    quantity: Number(row?.split("\t")[1]),
                };
            })
            .filter((data) => !componentNames.includes(data.name))
            .filter((data) => Number(data.quantity))
            .sort((a, b) => 0 - (a.name < b.name ? 1 : -1));

        if (!rows) {
            [];
        }

        const res: HangarContent[] = [...
            rows.reduce((map, current) => {
              const { name } = current;
              const grouped = map.get(name);
              if(!grouped) {
                map.set(name, { ...current });
              } else {
                map.set(name, { ...grouped, quantity: grouped.quantity + current.quantity })
              }
              return map;
            }, new Map)
            .values()
          ];

        if(!res){
            [];
        }

        return res;
    }

    useEffect(() => {
        const timeout = setTimeout(() => {
            setHangar(parseRaw(data))
        }, 500)

        return () => {
            clearTimeout(timeout)
        }
    }, [data]);

    return (
        <>
            <Flex justify="start" gap="2" align="center" mt="5" mb="4">
                <Heading size="5">Hangar</Heading>
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
                <TextArea
                    disabled={loading}
                    resize="vertical"
                    onChange={(e) => setData(e.target.value)}
                    placeholder="CTRL + V here to remove items from your shopping list. (overview price will not be updated)."
                />
                </Card>
            )}
        </>
    );
};
