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

export const checkBuildSettingsType = (object: any) => {
    /* start number checks */
    if(object?.numSlots === undefined || typeof object?.numSlots !== 'number'){
        return false;
    }
    if(object?.componentMaterialEfficiency === undefined || typeof object?.componentMaterialEfficiency !== 'number'){
        return false;
    }
    if(object?.componentTimeEfficiency === undefined || typeof object?.componentTimeEfficiency !== 'number'){
        return false;
    }
    if(object?.coreVolume === undefined || typeof object?.coreVolume !== 'number'){
        return false;
    }
    if(object?.defensiveVolume === undefined || typeof object?.defensiveVolume !== 'number'){
        return false;
    }
    if(object?.offensiveVolume === undefined || typeof object?.offensiveVolume !== 'number'){
        return false;
    }
    if(object?.propulsionVolume === undefined || typeof object?.propulsionVolume !== 'number'){
        return false;
    }
    if(object?.skillLevel === undefined || typeof object?.skillLevel !== 'number'){
        return false;
    }
    if(object?.buildCostIndex === undefined || typeof object?.buildCostIndex !== 'number'){
        return false;
    }
    if(object?.reactionCostIndex === undefined || typeof object?.reactionCostIndex !== 'number'){
        return false;
    }
    if(object?.reactionCostIndex === undefined || typeof object?.reactionCostIndex !== 'number'){
        return false;
    }
    if(object?.reactionFacilityTax === undefined || typeof object?.reactionFacilityTax !== 'number'){
        return false;
    }
    if(object?.complexFacilityTax === undefined || typeof object?.complexFacilityTax !== 'number'){
        return false;
    }
    /* end number checks */

    /* string type checks */
    if(object?.refinery === undefined){
        return false;
    }
    if(object?.refinery !== "Athanor" && object?.refinery !== "Tatara"){
        return false;
    }
    if(object?.refineryTeRig === undefined){
        return false;
    }
    if(object?.refineryTeRig !== "None" && object?.refineryTeRig !== "T1" && object?.refineryTeRig !== "T2"){
        return false;
    }
    if(object?.refineryMeRig === undefined){
        return false;
    }
    if(object?.refineryMeRig !== "None" && object?.refineryMeRig !== "T1" && object?.refineryMeRig !== "T2"){
        return false;
    }
    if(object?.refinerySystem === undefined){
        return false;
    }
    if(object?.refinerySystem !== "wormhole" && object?.refinerySystem !== "lowsec" && object?.refinerySystem !== "nullsec"){
        return false;
    }
    if(object?.tataraRig === undefined){
        return false;
    }
    if(object?.tataraRig !== "None" && object?.tataraRig !== "T1" && object?.tataraRig !== "T2"){
        return false;
    }
    if(object?.complex === undefined){
        return false;
    }
    if(object?.complex !== "Azbel" && object?.complex !== "Raitaru"){
        return false;
    }
    if(object?.complexLargeRig === undefined){
        return false;
    }
    if(object?.complexLargeRig !== "None" && object?.complexLargeRig !== "T1" && object?.complexLargeRig !== "T2"){
        return false;
    }
    if(object?.complexTeRig === undefined){
        return false;
    }
    if(object?.complexTeRig !== "None" && object?.complexTeRig !== "T1" && object?.complexTeRig !== "T2"){
        return false;
    }
    if(object?.complexMeRig === undefined){
        return false;
    }
    if(object?.complexMeRig !== "None" && object?.complexMeRig !== "T1" && object?.complexMeRig !== "T2"){
        return false;
    }
    if(object?.complexSystem === undefined){
        return false;
    }
    if(object?.complexSystem !== "wormhole" && object?.complexSystem !== "lowsec" && object?.complexSystem !== "nullsec" && object?.complexSystem !== "highsec"){
        return false;
    }
    if(object?.ancientRelic === undefined){
        return false;
    }
    if(object?.ancientRelic !== "Intact" && object?.ancientRelic !== "Malfunctioning" && object?.ancientRelic !== "Wrecked"){
        return false;
    }
    if(object?.decryptor === undefined){
        return false;
    }
    if(object?.decryptor !== "Accelerant Decryptor" && object?.decryptor !== "Optimized Attainment Decryptor" && object?.decryptor !== "Attainment Decryptor" && object?.decryptor !== "Augmentation Decryptor" && object?.decryptor !== "Parity Decryptor" && object?.decryptor !== "Process Decryptor" && object?.decryptor !== "Symmetry Decryptor" && object?.decryptor !== "Optimized Augmentation Decryptor" && object?.decryptor !== "None"){
        return false;
    }
    if(object?.implant === undefined){
        return false;
    }
    if(object?.implant !== "None" && object?.implant !== "1%" && object?.implant !== "2%" && object?.implant !== "4%"){
        return false;
    }
    if(object?.materialsOrderType === undefined){
        return false;
    }
    if(object?.materialsOrderType !== "buy" && object?.materialsOrderType !== "sell"){
        return false;
    }
    if(object?.subsystemsOrderType === undefined){
        return false;
    }
    if(object?.subsystemsOrderType !== "buy" && object?.subsystemsOrderType !== "sell"){
        return false;
    }
    /* end string types */

    /* trade hubs */
    if(object?.materialsLocation === undefined){
        return false;
    }
    if(object?.materialsLocation !== 10000002 && object?.materialsLocation !== 10000043 && object?.materialsLocation !== 10000030 && object?.materialsLocation !== 10000042 && object?.materialsLocation !== 10000032){
        return false;
    }
    if(object?.subsystemsLocation === undefined){
        return false;
    }
    if(object?.subsystemsLocation !== 10000002 && object?.subsystemsLocation !== 10000043 && object?.subsystemsLocation !== 10000030 && object?.subsystemsLocation !== 10000042 && object?.subsystemsLocation !== 10000032){
        return false;
    }
    /* end trade hubs */
    
    // pretty sure this is safe now
    return true;
}

export const checkCookie = (cookie: any) => {
    if(cookie === undefined){
        return DEFAULT_SETTINGS;
    }
    const obj = JSON.parse(cookie.value);
    const objectChecksOut = checkBuildSettingsType(obj);

    if(objectChecksOut){
        return obj;
    }
    
    return DEFAULT_SETTINGS
}