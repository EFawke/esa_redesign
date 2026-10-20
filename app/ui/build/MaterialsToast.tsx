import { useState, useEffect, useRef } from "react";
import { Toast } from "radix-ui";
import "@/app/css/toast.css";
import { CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";

export interface ShoppingRow {
    id: number;
    name: string;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    percentageChange?: number;
}

const MaterialsToast = ({data}: {data: ShoppingRow[]}) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const copyTable = async () => {
        let str = "";
        str += "name" + "\t";
        str += "amount" + "\t";
        str += "unit_price" + "\t";
        str += "row_total" + "\t";
        str += "\n";
        data.forEach((obj) => {
            str += obj.name + "\t";
            str += obj.quantity + "\t";
            str += obj.unitPrice + "\t";
            str += obj.lineTotal + "\t";
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

export default MaterialsToast;
