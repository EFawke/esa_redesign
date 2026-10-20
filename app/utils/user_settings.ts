export interface BuildSettings {
    numSlots: number;
    refinery: "Athanor" | "Tatara";
    refineryTeRig: "None" | "T1" | "T2";
    refineryMeRig: "None" | "T1" | "T2";
    refinerySystem: "wormhole" | "nullsec" | "lowsec";
    tataraRig: "None" | "T1" | "T2";

    complex: "Azbel" | "Raitaru";
    complexLargeRig: "None" | "T1" | "T2";
    complexTeRig: "None" | "T1" | "T2";
    complexMeRig: "None" | "T1" | "T2";
    complexSystem: "wormhole" | "nullsec" | "lowsec" | "highsec";
    componentMaterialEfficiency: number;
    componentTimeEfficiency: number;
    ancientRelic: "Intact" | "Malfunctioning" | "Wrecked";
    decryptor:
        | "Accelerant Decryptor"
        | "Optimized Attainment Decryptor"
        | "Attainment Decryptor"
        | "Augmentation Decryptor"
        | "Parity Decryptor"
        | "Process Decryptor"
        | "Symmetry Decryptor"
        | "Optimized Augmentation Decryptor"
        | "None";
    coreVolume: number;
    defensiveVolume: number;
    offensiveVolume: number;
    propulsionVolume: number;
    skillLevel: number;
    implant: "None" | "1%" | "2%" | "4%";
    buildCostIndex: number;
    reactionCostIndex: number;
    reactionFacilityTax: number;
    complexFacilityTax: number;
    materialsLocation: 10000002 | 10000043 | 10000030 | 10000042 | 10000032;
    materialsOrderType: "buy" | "sell";
    subsystemsLocation: 10000002 | 10000043 | 10000030 | 10000042 | 10000032;
    subsystemsOrderType: "buy" | "sell";
};

export const DEFAULT_SETTINGS: BuildSettings = {
    // refinery
    refinery: "Tatara",
    tataraRig: "None",
    refineryTeRig: "None",
    refineryMeRig: "None",
    refinerySystem: "wormhole",
    reactionCostIndex: 0.14,
    reactionFacilityTax: 0,

    // engineering complex
    complex: "Azbel",
    complexLargeRig: "None",
    complexTeRig: "None",
    complexMeRig: "None",
    complexSystem: "wormhole",
    buildCostIndex: 0.14,
    complexFacilityTax: 0,

    // manufacturing process
    componentMaterialEfficiency: 10,
    componentTimeEfficiency: 20,
    ancientRelic: "Intact",
    decryptor: "None",
    coreVolume: 1,
    defensiveVolume: 1,
    offensiveVolume: 1,
    propulsionVolume: 1,

    // character
    numSlots: 0,
    skillLevel: 1,
    implant: "None",

    // trade
    materialsLocation: 10000002,
    materialsOrderType: "buy",
    subsystemsLocation: 10000002,
    subsystemsOrderType: "sell",
};