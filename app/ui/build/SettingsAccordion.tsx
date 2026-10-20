import * as React from "react";
import { Accordion } from "radix-ui";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import "@/app/css/accordion.css";
import { type Ref } from "react";
import {
	Flex,
	Tooltip,
	Select,
	Text,
	TextField,
	Slider,
	Heading,
} from "@radix-ui/themes";
import { type BuildSettings } from "@/app/utils/user_settings";

export const SettingsAccordion = ({
	settings,
	setSettings,
}: {
	settings: BuildSettings | null;
	setSettings: (settings: BuildSettings) => void;
}) => {
	if (settings === null) {
		return null;
	}
	return (
		<Accordion.Root
			className="AccordionRoot"
			type="single"
			collapsible
		>
			<Accordion.Item className="AccordionItem" value="item-1">
				<AccordionTrigger>Refinery</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "40%" }}
						>
							<Text
								size="3"
							>
								Refinery
							</Text>
							<Select.Root
								defaultValue={settings.refinery}
								onValueChange={(
									value: "Athanor" | "Tatara",
								) => {
									setSettings({
										...settings,
										refinery: value,
									});
								}}
							>
								<Select.Trigger style={{ width: "100%" }} />
								<Select.Content style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label>
											Refinery
										</Select.Label>
										<Select.Item value="Athanor">
											Athanor
										</Select.Item>
										<Select.Item value="Tatara">
											Tatara
										</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
							{settings.refinery === "Tatara" && (
								<Flex
									direction="column"
									gap="1"
									align="start"
									style={{ width: "100%" }}
								>
									<Text
										size="3"
									>
										Rig
									</Text>
									<Select.Root
										defaultValue={settings.tataraRig}
										onValueChange={(
											value: "None" | "T1" | "T2",
										) => {
											setSettings({
												...settings,
												tataraRig: value,
											});
										}}
									>
										<Select.Trigger style={{ width: "100%" }}/>
										<Select.Content style={{ width: "100%" }}>
											<Select.Group>
												<Select.Label>Rig</Select.Label>
												<Select.Item value="None">
													None
												</Select.Item>
												<Select.Item value="T1">
													T1
												</Select.Item>
												<Select.Item value="T2">
													T2
												</Select.Item>
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</Flex>
							)}
							{settings.refinery === "Athanor" && (
								<>
									<Flex
										direction="column"
										gap="1"
										align="start"
										style={{ width: "100%" }}
										justify="between"
									>
											<Text
												size="3"
											>
												Material Efficiency Rig
											</Text>
										<Select.Root
											defaultValue={
												settings.refineryMeRig
											}
											onValueChange={(
												value: "None" | "T1" | "T2",
											) => {
												setSettings({
													...settings,
													refineryMeRig: value
												});
											}}
										>
											<Select.Trigger style={{ width: "100%" }} />
											<Select.Content style={{ width: "100%" }}>
												<Select.Group>
													<Select.Label>
														M.E. Rig
													</Select.Label>
													<Select.Item value="None">
														None
													</Select.Item>
													<Select.Item value="T1">
														T1
													</Select.Item>
													<Select.Item value="T2">
														T2
													</Select.Item>
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Flex>
									<Flex
										direction="column"
										gap="1"
										align="start"
										style={{ width: "100%" }}
										justify="between"
									>
										<Tooltip content="Feature in development">
										<Text
											size="3"
										>
											Time Efficiency Rig
										</Text>
										</Tooltip>
										<Select.Root
											defaultValue={
												settings.refineryTeRig
											}
											onValueChange={(
												value: "None" | "T1" | "T2",
											) => {
												setSettings({
													...settings,
													refineryTeRig: value,
												});
											}}
										>
											<Select.Trigger style={{ width: "100%" }}/>
											<Select.Content style={{ width: "100%" }}>
												<Select.Group>
													<Select.Label>
														T.E. Rig
													</Select.Label>
													<Select.Item value="None">
														None
													</Select.Item>
													<Select.Item value="T1">
														T1
													</Select.Item>
													<Select.Item value="T2">
														T2
													</Select.Item>
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Flex>
								</>
							)}
						</Flex>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text
									size="3"
								>
									System Type
								</Text>
								<Select.Root
									defaultValue={settings.refinerySystem}
									onValueChange={(
										value:
											"lowsec" | "nullsec" | "wormhole",
									) => {
										setSettings({
											...settings,
											refinerySystem: value,
										});
									}}
								>
									<Select.Trigger style={{ width: "100%" }}/>
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>
												Location
											</Select.Label>
											<Select.Item value="lowsec">
												Low Sec
											</Select.Item>
											<Select.Item value="nullsec">
												Null Sec
											</Select.Item>
											<Select.Item value="wormhole">
												Wormhole
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
							<Tooltip content="Found in the manufacturing window in-game">
								<Flex
									direction="column"
									gap="1"
									align="start"
									style={{ width: "100%" }}
								>
									<Text size="3">
										Reaction System Cost Index
									</Text>
									<TextField.Root
										style={{ width: "100%" }}										
										type="number"
										min={0.14}
										step={0.01}
										placeholder="0.14"
										defaultValue={settings.reactionCostIndex || ""}
										onChange={(e) => {
											setSettings({
												...settings,
												reactionCostIndex: parseFloat(e.target.value) < 0.14 ? 0.14 : parseFloat(e.target.value),
											});
										}}
									><TextField.Slot side="right">%</TextField.Slot></TextField.Root>
								</Flex>
							</Tooltip>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text size="3">
									Facility Tax
								</Text>
								<TextField.Root
									style={{ width: "100%" }}
									type="number"
									min={0}
									step={0.01}
									placeholder="0"
									defaultValue={settings.reactionFacilityTax || ""}
									onChange={(e) => {
										setSettings({
											...settings,
											reactionFacilityTax: parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 0
										});
									}}
								><TextField.Slot side="right">%</TextField.Slot></TextField.Root>
							</Flex>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
			<Accordion.Item className="AccordionItem" value="item-2">
				<AccordionTrigger>Manufacturing Complex</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text
									size="3"
								>
									Manufacturing Complex
								</Text>
								<Select.Root
									defaultValue={settings.complex}
									onValueChange={(
										value: "Raitaru" | "Azbel",
									) => {
										setSettings({
											...settings,
											complex: value,
										});
									}}
								>
									<Select.Trigger style={{ width: "100%" }} />
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>
												Manufacturing Complex
											</Select.Label>
											<Select.Item value="Raitaru">
												Raitaru
											</Select.Item>
											<Select.Item value="Azbel">
												Azbel
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
							{settings.complex === "Azbel" && (
								<Flex
									direction="column"
									gap="1"
									align="start"
									style={{ width: "100%" }}
								>
									<Text
										size="3"
									>
										Rig
									</Text>
									<Select.Root
										defaultValue={settings.complexLargeRig}
										onValueChange={(
											value: "None" | "T1" | "T2",
										) => {
											setSettings({
												...settings,
												complexLargeRig: value,
											});
										}}
									>
										<Select.Trigger style={{ width: "100%" }}/>
										<Select.Content style={{ width: "100%" }}>
											<Select.Group>
												<Select.Label>Rig</Select.Label>
												<Select.Item value="None">
													None
												</Select.Item>
												<Select.Item value="T1">
													T1
												</Select.Item>
												<Select.Item value="T2">
													T2
												</Select.Item>
											</Select.Group>
										</Select.Content>
									</Select.Root>
								</Flex>
							)}
							{settings.complex === "Raitaru" && (
								<>
									<Flex
										direction="column"
										gap="1"
										align="start"
										style={{ width: "100%" }}
										justify="between"
									>
										<Tooltip content="Feature in development">
											<Text
												size="3"
											>
												Time Efficiency Rig
											</Text>
										</Tooltip>
										<Select.Root
											defaultValue={settings.complexTeRig}
											onValueChange={(
												value: "None" | "T1" | "T2",
											) => {
												setSettings({
													...settings,
													complexTeRig: value,
												});
											}}
										>
											<Select.Trigger />
											<Select.Content>
												<Select.Group>
													<Select.Label>
														Time Efficiency Rig
													</Select.Label>
													<Select.Item value="None">
														None
													</Select.Item>
													<Select.Item value="T1">
														T1
													</Select.Item>
													<Select.Item value="T2">
														T2
													</Select.Item>
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Flex>
									<Flex
										direction="column"
										gap="1"
										align="start"
										style={{ width: "100%" }}
										justify="between"
									>
										<Text
											size="3"
										>
											Material Efficiency Rig
										</Text>
										<Select.Root
											defaultValue={settings.complexMeRig}
											onValueChange={(
												value: "None" | "T1" | "T2",
											) => {
												setSettings({
													...settings,
													complexMeRig: value,
												});
											}}
										>
											<Select.Trigger />
											<Select.Content>
												<Select.Group>
													<Select.Label>
														Material Efficiency Rig
													</Select.Label>
													<Select.Item value="None">
														None
													</Select.Item>
													<Select.Item value="T1">
														T1
													</Select.Item>
													<Select.Item value="T2">
														T2
													</Select.Item>
												</Select.Group>
											</Select.Content>
										</Select.Root>
									</Flex>
								</>
							)}
						</Flex>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text
									size="3"
								>
									System Type
								</Text>
								<Select.Root
									defaultValue={settings.complexSystem}
									onValueChange={(
										value:
											| "lowsec"
											| "nullsec"
											| "wormhole"
											| "highsec",
									) => {
										setSettings({
											...settings,
											complexSystem: value,
										});
									}}
								>
									<Select.Trigger style={{ width: "100%" }} />
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>
												Location
											</Select.Label>
											<Select.Item value="lowsec">
												Low Sec
											</Select.Item>
											<Select.Item value="nullsec">
												Null Sec
											</Select.Item>
											<Select.Item value="wormhole">
												Wormhole
											</Select.Item>
											<Select.Item value="highsec">
												High Sec
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
							<Tooltip content="Found in the manufacturing window in-game">
								<Flex
									direction="column"
									gap="1"
									align="start"
									style={{ width: "100%" }}
								>
									<Text
										size="3"
									>
										Build System Cost Index
									</Text>
									<TextField.Root
										style={{ width: '100%' }}
										type="number"
										placeholder="0.14"
										min={0.14}
										step={0.01}
										defaultValue={settings.buildCostIndex || ""}
										onChange={(e) => {
											setSettings({
												...settings,
												buildCostIndex: parseFloat(e.target.value) > 0.14 ? parseFloat(e.target.value) : 0.14
											});
										}}
									><TextField.Slot side="right">%</TextField.Slot></TextField.Root>
								</Flex>
							</Tooltip>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text
									size="3"
								>
									Facility Tax
								</Text>
								<TextField.Root
									style={{ width: '100%' }}
									type="number"
									placeholder="0"
									min={0}
									max={100}
									step={0.01}
									defaultValue={settings.complexFacilityTax || ""}
									onChange={(e) => {
										setSettings({
											...settings,
											complexFacilityTax: parseFloat(e.target.value) > 0 ? parseFloat(e.target.value) : 0,
										});
									}}
								><TextField.Slot side='right'>%</TextField.Slot></TextField.Root>
							</Flex>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
			<Accordion.Item className="AccordionItem" value="item-3">
				<AccordionTrigger>Blueprints</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="4"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="2"
								align="start"
								style={{ width: "100%" }}
							>
								<Tooltip content="Component BPO Material Efficiency">
								<Text
									size="3"
								>{`Component M.E (${settings.componentMaterialEfficiency})`}</Text>
								</Tooltip>
								<Slider
									name="componentMaterialEfficiency"
									min={0}
									step={1}
									max={10}
									defaultValue={[
										settings.componentMaterialEfficiency,
									]}
									onValueChange={(e: number[]) => {
										setSettings({
											...settings,
											componentMaterialEfficiency: e[0],
										});
									}}
								/>
							</Flex>
							<Flex
								direction="column"
								gap="2"
								align="start"
								style={{ width: "100%" }}
							>
								<Tooltip content="Feature in development">
									<Text
										size="3"
									>{`Component T.E. (${settings.componentTimeEfficiency})`}</Text>
								</Tooltip>
								<Slider
									name="componentTimeEfficiency"
									min={0}
									step={1}
									max={20}
									defaultValue={[
										settings.componentTimeEfficiency,
									]}
									onValueChange={(e) => {
										setSettings({
											...settings,
											componentTimeEfficiency: e[0],
										});
									}}
								/>
							</Flex>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
			<Accordion.Item className="AccordionItem" value="item-4">
				<AccordionTrigger>Invention</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "100%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "40%" }}
							>
								<Text
									size="3"
								>
									Ancient Relic
								</Text>
								<Select.Root
									defaultValue={settings.ancientRelic}
									onValueChange={(
										value:
											| "Wrecked"
											| "Malfunctioning"
											| "Intact",
									) => {
										setSettings({
											...settings,
											ancientRelic: value,
										});
									}}
								>
									<Select.Trigger style={{ width: "100%" }} />
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>
												Ancient Relic
											</Select.Label>
											<Select.Item value="Wrecked">
												Wrecked
											</Select.Item>
											<Select.Item value="Malfunctioning">
												Malfunctioning
											</Select.Item>
											<Select.Item value="Intact">
												Intact
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "40%" }}
							>
								<Text
									size="3"
								>
									Decryptor
								</Text>
								<Select.Root
									defaultValue={settings.decryptor}
									onValueChange={(
										value:
											| "Accelerant Decryptor"
											| "Optimized Attainment Decryptor"
											| "Attainment Decryptor"
											| "Augmentation Decryptor"
											| "Parity Decryptor"
											| "Process Decryptor"
											| "Symmetry Decryptor"
											| "Optimized Augmentation Decryptor"
											| "None",
									) => {
										setSettings({
											...settings,
											decryptor: value,
										});
									}}
								>
									<Select.Trigger style={{ width: "100%" }}/>
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>
												Decryptor
											</Select.Label>
											<Select.Item value="None">
												None
											</Select.Item>
											<Select.Item value="Accelerant Decryptor">
												Accelerant Decryptor
											</Select.Item>
											<Select.Item value="Attainment Decryptor">
												Attainment Decryptor
											</Select.Item>
											<Select.Item value="Augmentation Decryptor">
												Augmentation Decryptor
											</Select.Item>
											<Select.Item value="Optimized Attainment Decryptor">
												Optimized Attainment Decryptor
											</Select.Item>
											<Select.Item value="Optimized Augmentation Decryptor">
												Optimized Augmentation Decryptor
											</Select.Item>
											<Select.Item value="Parity Decryptor">
												Parity Decryptor
											</Select.Item>
											<Select.Item value="Process Decryptor">
												Process Decryptor
											</Select.Item>
											<Select.Item value="Symmetry Decryptor">
												Symmetry Decryptor
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
			<Accordion.Item className="AccordionItem" value="item-5">
				<AccordionTrigger>Build Volume</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="1"
							align="start"
							style={{ width: "40%" }}
						>
							<Text
								size="3"
							>
								Core
							</Text>
							<TextField.Root
								style={{ width: '100%' }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.coreVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										coreVolume: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
									});
								}}
							/>
							<Text
								size="3"
							>
								Defensive
							</Text>
							<TextField.Root
								style={{ width: '100%' }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.defensiveVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										defensiveVolume: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
									});
								}}
							/>
						</Flex>
						<Flex
							direction="column"
							gap="1"
							align="start"
							style={{ width: "40%" }}
						>
							<Text
								size="3"
							>
								Offensive
							</Text>
							<TextField.Root
								style={{ width: '100%' }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.offensiveVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										offensiveVolume: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
									});
								}}
							/>
							<Text
								size="3"
							>
								Propulsion
							</Text>
							<TextField.Root
								style={{ width: '100%' }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.propulsionVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										propulsionVolume: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value),
									});
								}}
							/>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
			<Accordion.Item className="AccordionItem" value="item-6">
				<AccordionTrigger>Character</AccordionTrigger>
				<AccordionContent>
					<Flex
						direction="row"
						align="start"
						style={{ width: "100%" }}
						justify="between"
						mt="2"
						mb="2"
					>
						<Flex
							direction="column"
							gap="4"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text
									size="3"
								>
									Reaction Slots
								</Text>
								<TextField.Root
									style={{ width: '100%' }}
									type="number"
									placeholder="0"
									min={0}
									step={1}
									defaultValue={settings.numSlots || ""}
									onChange={(e) => {
										setSettings({
											...settings,
											numSlots: parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value) > 100 ? 100 : parseInt(e.target.value),
										});
									}}
								/>
							</Flex>
							<Tooltip content="Character skills for invention success calculations">
								<Flex
									direction="column"
									gap="1"
									align="start"
									style={{ width: "100%" }}
								>
									<Text
										size="3"
									>
										{`Skill Level (${settings.skillLevel})`}
									</Text>
									<Slider
										name="skillLevel"
										min={0}
										step={1}
										max={5}
										defaultValue={[
											Number(settings.skillLevel),
										]}
										onValueChange={(e: number[]) => {
											setSettings({
												...settings,
												skillLevel: e[0]
											})
										}}
									/>
								</Flex>
							</Tooltip>
						</Flex>
						<Flex
							direction="column"
							gap="2"
							align="start"
							style={{ width: "40%" }}
						>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Tooltip content="Feature in development">
									<Text
										size="3"
									>
										Implant
									</Text>
								</Tooltip>
								<Select.Root
									defaultValue={settings.implant}
									onValueChange={(value: "None" | "1%" | "2%" | "4%") => {
										setSettings({
											...settings,
											implant: value
										})
									}}
								>
									<Select.Trigger style={{ width: "100%" }}/>
									<Select.Content style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label>Implant</Select.Label>
											<Select.Item value="None">
												None
											</Select.Item>
											<Select.Item value="1%">
												1%
											</Select.Item>
											<Select.Item value="2%">
												2%
											</Select.Item>
											<Select.Item value="4%">
												4%
											</Select.Item>
										</Select.Group>
									</Select.Content>
								</Select.Root>
							</Flex>
						</Flex>
					</Flex>
				</AccordionContent>
			</Accordion.Item>
		</Accordion.Root>
	);
};

const AccordionTrigger = function AccordionTrigger({
	children,
	forwardedRef,
}: {
	children: string;
	forwardedRef?: Ref<HTMLButtonElement> | undefined;
}) {
	return (
		<Accordion.Header className="AccordionHeader">
			<Accordion.Trigger className="AccordionTrigger" ref={forwardedRef}>
				{children}
				<ChevronDownIcon className="AccordionChevron" aria-hidden />
			</Accordion.Trigger>
		</Accordion.Header>
	);
};

const AccordionContent = function AccordionContent({
	children,
	forwardedRef,
	...props
}: {
	children: React.ReactElement;
	forwardedRef?: Ref<HTMLDivElement> | undefined;
}) {
	return (
		<Accordion.Content
			className={"AccordionContent"}
			{...props}
			ref={forwardedRef}
		>
			<div className="AccordionContentText">{children}</div>
		</Accordion.Content>
	);
};

// export SettingsAccordion;
