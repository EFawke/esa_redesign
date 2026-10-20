export const UNITS: [number, string][] = [
    [1e9, "B"],
    [1e6, "M"],
];

export function formatNumber(
    num: number | "Infinity" | "0",
    type: "price" | "int",
) {
    if (num === "Infinity" || num === "0") {
        return;
    }
    const suffix = type === "price" ? " ISK" : "";
    for (const [divisor, unit] of UNITS) {
        if (num >= divisor) {
            return `${(num / divisor).toFixed(2)} ${unit}${suffix}`;
        }
    }
    return `${Number(num).toLocaleString()}${suffix}`;
}

export function getClassName(percentage: number, upIsBad?: boolean) {
    if (percentage === 0) {
        return "zero_percent";
    }
    if(upIsBad){
        return percentage > 0 ? "warning" : "success";
    } else {
        return percentage < 0 ? "warning" : "success";
    }
}

export const isBarChart = (field: string) => {
    if (
        field === "minSell" ||
        field === "maxBuy" ||
        field === "profit" ||
        field === "matCosts"
    ) {
        return false;
    } else {
        return true;
    }
};
