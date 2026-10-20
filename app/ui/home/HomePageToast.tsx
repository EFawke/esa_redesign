import { useState, useEffect, useRef } from "react";
import { Toast } from "radix-ui";
import "@/app/css/toast.css";
import { CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import {type SubsystemRow } from '@/app/ui/home/BestSubsystems'

const HomeToast = ({data, loading}: {data: SubsystemRow[], loading: boolean}) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const copyTable = async () => {
        let str = "";
        str += "type_id" + "\t";
        str += "name" + "\t";
        str += "max_buy" + "\t";
        str += "min_sell" + "\t";
        str += "buy_volume" + "\t";
        str += "sell_volume" + "\t";
        str += "weekly_losses" + "\t";
        str += "\n";
        data.forEach((obj) => {
            str += obj.type_id + "\t";
            str += obj.item_name + "\t";
            str += obj.max_buy + "\t";
            str += obj.min_sell + "\t";
            str += obj.buy_volume + "\t";
            str += obj.sell_volume + "\t";
            str += obj.losses + "\t";
            str += "\n";
        });

        try {
            await navigator.clipboard.writeText(str);
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <>
            <IconButton
                disabled={loading}
                onClick={() => {
                    setOpen(false);
                    copyTable();
                    window.clearTimeout(timerRef.current);
                    timerRef.current = window.setTimeout(() => setOpen(true), 100);
                }}
                size="4"
                variant="ghost"
                aria-label="Copy table"
            >
                <CopyIcon height="20px" width="20px" />
            </IconButton>
    
            <Toast.Root className="ToastRoot" open={open} onOpenChange={setOpen}>
                <Toast.Title className="ToastTitle">Table copied</Toast.Title>
                <Toast.Description className="ToastDescription">
                    {data.length} rows copied to clipboard
                </Toast.Description>
            </Toast.Root>
        </>
    );
};

export default HomeToast;
