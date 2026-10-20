import { useState, useEffect, useRef } from "react";
import { Toast } from "radix-ui";
import "@/app/css/toast.css";
import { CopyIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import {type ComponentRow } from '@/app/ui/build/ComponentsTable';

const BuildToast = ({data}: {data: ComponentRow[]}) => {
    const [open, setOpen] = useState(false);
    const timerRef = useRef(0);

    useEffect(() => {
        return () => clearTimeout(timerRef.current);
    }, []);

    const copyTable = async () => {
        let str = "";
        str += "type_id" + "\t";
        str += "name" + "\t";
        str += "quantity" + "\t";
        str += "\n";
        data.forEach((obj) => {
            str += obj.id + "\t";
            str += obj.name + "\t";
            str += obj.quantity + "\t";
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

export default BuildToast;
