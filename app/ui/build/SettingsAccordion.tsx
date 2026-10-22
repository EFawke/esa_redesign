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
			className="AccordionRoot box_shadowed"
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
							<Text className='accordion_label'>Refinery</Text>
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
								<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
								<Select.Content className="styled_accordion" style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label className="styled_accordion">Refinery</Select.Label>
										<Select.Item value="Athanor" className="styled_accordion">
											Athanor
										</Select.Item>
										<Select.Item value="Tatara" className="styled_accordion">
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
									<Text className='accordion_label'>Rig</Text>
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
										<Select.Trigger
											className="styled_accordion"
											style={{ width: "100%" }}
										/>
										<Select.Content
											className="styled_accordion"
											style={{ width: "100%" }}
										>
											<Select.Group>
												<Select.Label className="styled_accordion">Rig</Select.Label>
												<Select.Item value="None" className="styled_accordion">
													None
												</Select.Item>
												<Select.Item value="T1" className="styled_accordion">
													T1
												</Select.Item>
												<Select.Item value="T2" className="styled_accordion">
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
										<Text className='accordion_label'>
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
													refineryMeRig: value,
												});
											}}
										>
											<Select.Trigger
												className="styled_accordion"
												style={{ width: "100%" }}
											/>
											<Select.Content
												className="styled_accordion"
												style={{ width: "100%" }}
											>
												<Select.Group>
													<Select.Label className="styled_accordion">
														M.E. Rig
													</Select.Label>
													<Select.Item value="None" className="styled_accordion">
														None
													</Select.Item>
													<Select.Item value="T1" className="styled_accordion">
														T1
													</Select.Item>
													<Select.Item value="T2" className="styled_accordion">
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
											<Text className='accordion_label'>
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
											<Select.Trigger
												className="styled_accordion"
												style={{ width: "100%" }}
											/>
											<Select.Content
												className="styled_accordion"
												style={{ width: "100%" }}
											>
												<Select.Group>
													<Select.Label className="styled_accordion">
														T.E. Rig
													</Select.Label>
													<Select.Item value="None" className="styled_accordion">
														None
													</Select.Item>
													<Select.Item value="T1" className="styled_accordion">
														T1
													</Select.Item>
													<Select.Item value="T2" className="styled_accordion">
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
								<Text className='accordion_label'>System Type</Text>
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
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">
												Location
											</Select.Label>
											<Select.Item value="lowsec" className="styled_accordion">
												Low Sec
											</Select.Item>
											<Select.Item value="nullsec" className="styled_accordion">
												Null Sec
											</Select.Item>
											<Select.Item value="wormhole" className="styled_accordion">
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
									<Text className='accordion_label'>
										Reaction System Cost Index
									</Text>
									<TextField.Root
										className="styled_accordion"
										style={{ width: "100%" }}
										type="number"
										min={0.14}
										step={0.01}
										placeholder="0.14"
										defaultValue={
											settings.reactionCostIndex || ""
										}
										onChange={(e) => {
											setSettings({
												...settings,
												reactionCostIndex:
													parseFloat(e.target.value) <
													0.14
														? 0.14
														: parseFloat(
																e.target.value,
															),
											});
										}}
									>
										<TextField.Slot side="right">
											%
										</TextField.Slot>
									</TextField.Root>
								</Flex>
							</Tooltip>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text className='accordion_label'>Facility Tax</Text>
								<TextField.Root
									className="styled_accordion"
									style={{ width: "100%" }}
									type="number"
									min={0}
									step={0.01}
									placeholder="0"
									defaultValue={
										settings.reactionFacilityTax || ""
									}
									onChange={(e) => {
										setSettings({
											...settings,
											reactionFacilityTax:
												parseFloat(e.target.value) > 0
													? parseFloat(e.target.value)
													: 0,
										});
									}}
								>
									<TextField.Slot side="right">
										%
									</TextField.Slot>
								</TextField.Root>
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
								<Text className='accordion_label'>Manufacturing Complex</Text>
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
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }}/>
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">
												Manufacturing Complex
											</Select.Label>
											<Select.Item value="Raitaru" className="styled_accordion">
												Raitaru
											</Select.Item>
											<Select.Item value="Azbel" className="styled_accordion">
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
									<Text className='accordion_label'>Rig</Text>
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
										<Select.Trigger
											className="styled_accordion"
											style={{ width: "100%" }}
										/>
										<Select.Content
											className="styled_accordion"
											style={{ width: "100%" }}
										>
											<Select.Group>
												<Select.Label className="styled_accordion">Rig</Select.Label>
												<Select.Item value="None" className="styled_accordion">
													None
												</Select.Item>
												<Select.Item value="T1" className="styled_accordion">
													T1
												</Select.Item>
												<Select.Item value="T2" className="styled_accordion">
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
											<Text className='accordion_label'>
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
											<Select.Trigger className="styled_accordion" style={{width: '100%'}} />
											<Select.Content className="styled_accordion" style={{width: '100%'}}>
												<Select.Group>
													<Select.Label className="styled_accordion">
														Time Efficiency Rig
													</Select.Label>
													<Select.Item value="None" className="styled_accordion">
														None
													</Select.Item>
													<Select.Item value="T1" className="styled_accordion">
														T1
													</Select.Item>
													<Select.Item value="T2" className="styled_accordion">
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
										<Text className='accordion_label'>
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
											<Select.Trigger className="styled_accordion" style={{width: '100%'}}/>
											<Select.Content className="styled_accordion" style={{width: '100%'}}>
												<Select.Group>
													<Select.Label className="styled_accordion">
														Material Efficiency Rig
													</Select.Label>
													<Select.Item value="None" className="styled_accordion">
														None
													</Select.Item>
													<Select.Item value="T1" className="styled_accordion">
														T1
													</Select.Item>
													<Select.Item value="T2" className="styled_accordion">
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
								<Text className='accordion_label'>System Type</Text>
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
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">
												Location
											</Select.Label>
											<Select.Item value="lowsec" className="styled_accordion">
												Low Sec
											</Select.Item>
											<Select.Item value="nullsec" className="styled_accordion">
												Null Sec
											</Select.Item>
											<Select.Item value="wormhole" className="styled_accordion">
												Wormhole
											</Select.Item>
											<Select.Item value="highsec" className="styled_accordion">
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
									<Text className='accordion_label'>
										Build System Cost Index
									</Text>
									<TextField.Root
										className="styled_accordion"
										style={{ width: "100%" }}
										type="number"
										placeholder="0.14"
										min={0.14}
										step={0.01}
										defaultValue={
											settings.buildCostIndex || ""
										}
										onChange={(e) => {
											setSettings({
												...settings,
												buildCostIndex:
													parseFloat(e.target.value) >
													0.14
														? parseFloat(
																e.target.value,
															)
														: 0.14,
											});
										}}
									>
										<TextField.Slot side="right">
											%
										</TextField.Slot>
									</TextField.Root>
								</Flex>
							</Tooltip>
							<Flex
								direction="column"
								gap="1"
								align="start"
								style={{ width: "100%" }}
							>
								<Text className='accordion_label'>Facility Tax</Text>
								<TextField.Root
									className="styled_accordion"
									style={{ width: "100%" }}
									type="number"
									placeholder="0"
									min={0}
									max={100}
									step={0.01}
									defaultValue={
										settings.complexFacilityTax || ""
									}
									onChange={(e) => {
										setSettings({
											...settings,
											complexFacilityTax:
												parseFloat(e.target.value) > 0
													? parseFloat(e.target.value)
													: 0,
										});
									}}
								>
									<TextField.Slot side="right">
										%
									</TextField.Slot>
								</TextField.Root>
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
									<Text className='accordion_label'>{`Component M.E (${settings.componentMaterialEfficiency})`}</Text>
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
									<Text className='accordion_label'>{`Component T.E. (${settings.componentTimeEfficiency})`}</Text>
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
								<Text className='accordion_label'>Ancient Relic</Text>
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
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">
												Ancient Relic
											</Select.Label>
											<Select.Item value="Wrecked" className="styled_accordion">
												Wrecked
											</Select.Item>
											<Select.Item value="Malfunctioning" className="styled_accordion">
												Malfunctioning
											</Select.Item>
											<Select.Item value="Intact" className="styled_accordion">
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
								<Text className='accordion_label'>Decryptor</Text>
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
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">
												Decryptor
											</Select.Label>
											<Select.Item value="None" className="styled_accordion">
												None
											</Select.Item>
											<Select.Item value="Accelerant Decryptor" className="styled_accordion">
												Accelerant Decryptor
											</Select.Item>
											<Select.Item value="Attainment Decryptor" className="styled_accordion">
												Attainment Decryptor
											</Select.Item>
											<Select.Item value="Augmentation Decryptor" className="styled_accordion">
												Augmentation Decryptor
											</Select.Item>
											<Select.Item value="Optimized Attainment Decryptor" className="styled_accordion">
												Optimized Attainment Decryptor
											</Select.Item>
											<Select.Item value="Optimized Augmentation Decryptor" className="styled_accordion">
												Optimized Augmentation Decryptor
											</Select.Item>
											<Select.Item value="Parity Decryptor" className="styled_accordion">
												Parity Decryptor
											</Select.Item>
											<Select.Item value="Process Decryptor" className="styled_accordion">
												Process Decryptor
											</Select.Item>
											<Select.Item value="Symmetry Decryptor" className="styled_accordion">
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
							<Text className='accordion_label'>Core</Text>
							<TextField.Root
								className="styled_accordion"
								style={{ width: "100%" }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.coreVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										coreVolume:
											parseInt(e.target.value) < 0
												? 0
												: parseInt(e.target.value),
									});
								}}
							/>
							<Text className='accordion_label'>Defensive</Text>
							<TextField.Root
								className="styled_accordion"
								style={{ width: "100%" }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.defensiveVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										defensiveVolume:
											parseInt(e.target.value) < 0
												? 0
												: parseInt(e.target.value),
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
							<Text className='accordion_label'>Offensive</Text>
							<TextField.Root
								className="styled_accordion"
								style={{ width: "100%" }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.offensiveVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										offensiveVolume:
											parseInt(e.target.value) < 0
												? 0
												: parseInt(e.target.value),
									});
								}}
							/>
							<Text className='accordion_label'>Propulsion</Text>
							<TextField.Root
								className="styled_accordion"
								style={{ width: "100%" }}
								type="number"
								placeholder="0"
								min={0}
								step={1}
								defaultValue={settings.propulsionVolume || ""}
								onChange={(e) => {
									setSettings({
										...settings,
										propulsionVolume:
											parseInt(e.target.value) < 0
												? 0
												: parseInt(e.target.value),
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
								<Tooltip content="Reaction slots across all characters">
									<Text className='accordion_label'>Reaction Slots</Text>
								</Tooltip>
								<TextField.Root
									className="styled_accordion"
									style={{ width: "100%" }}
									type="number"
									placeholder="0"
									min={0}
									step={1}
									defaultValue={settings.numSlots || ""}
									onChange={(e) => {
										setSettings({
											...settings,
											numSlots:
												parseInt(e.target.value) < 0
													? 0
													: parseInt(e.target.value) >
														  100
														? 100
														: parseInt(
																e.target.value,
															),
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
									<Text className='accordion_label'>
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
												skillLevel: e[0],
											});
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
									<Text className='accordion_label'>Implant</Text>
								</Tooltip>
								<Select.Root
									defaultValue={settings.implant}
									onValueChange={(
										value: "None" | "1%" | "2%" | "4%",
									) => {
										setSettings({
											...settings,
											implant: value,
										});
									}}
								>
									<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
									<Select.Content className="styled_accordion" style={{ width: "100%" }}>
										<Select.Group>
											<Select.Label className="styled_accordion">Implant</Select.Label>
											<Select.Item value="None" className="styled_accordion">
												None
											</Select.Item>
											<Select.Item value="1%" className="styled_accordion">
												1%
											</Select.Item>
											<Select.Item value="2%" className="styled_accordion">
												2%
											</Select.Item>
											<Select.Item value="4%" className="styled_accordion">
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
			<Accordion.Item className="AccordionItem" value="item-7">
				<AccordionTrigger>Trade Hubs</AccordionTrigger>
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
							<Tooltip content="Where you purchase materials">
								<Text className='accordion_label'>Buying inputs</Text>
							</Tooltip>
							<Select.Root
								defaultValue={settings.materialsLocation.toString()}
								onValueChange={(value) => {
									setSettings({
										...settings,
										materialsLocation: Number(
											value,
										) as BuildSettings["materialsLocation"],
									});
								}}
							>
								<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
								<Select.Content className="styled_accordion" style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label className="styled_accordion">Trade Hub</Select.Label>
										<Select.Item value="10000002" className="styled_accordion">
											Jita
										</Select.Item>
										<Select.Item value="10000043" className="styled_accordion">
											Amarr
										</Select.Item>
										<Select.Item value="10000032" className="styled_accordion">
											Dodixie
										</Select.Item>
										<Select.Item value="10000042" className="styled_accordion">
											Hek
										</Select.Item>
										<Select.Item value="10000030" className="styled_accordion">
											Rens
										</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
							<Tooltip content="How you purchase materials">
								<Text className='accordion_label'>Order type</Text>
							</Tooltip>
							<Select.Root
								defaultValue={settings.materialsOrderType}
								onValueChange={(value: "buy" | "sell") => {
									setSettings({
										...settings,
										materialsOrderType: value,
									});
								}}
							>
								<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
								<Select.Content className="styled_accordion" style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label className="styled_accordion">Order type</Select.Label>
										<Select.Item value="buy" className="styled_accordion">
											Buy orders
										</Select.Item>
										<Select.Item value="sell" className="styled_accordion">
											Sell orders
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
							<Tooltip content="Where you sell your subsystems">
								<Text className='accordion_label'>Selling outputs</Text>
							</Tooltip>
							<Select.Root
								defaultValue={settings.subsystemsLocation.toString()}
								onValueChange={(value) => {
									setSettings({
										...settings,
										subsystemsLocation: Number(
											value,
										) as BuildSettings["subsystemsLocation"],
									});
								}}
							>
								<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
								<Select.Content className="styled_accordion" style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label className="styled_accordion">Trade Hub</Select.Label>
										<Select.Item value="10000002" className="styled_accordion">
											Jita
										</Select.Item>
										<Select.Item value="10000043" className="styled_accordion">
											Amarr
										</Select.Item>
										<Select.Item value="10000032" className="styled_accordion">
											Dodixie
										</Select.Item>
										<Select.Item value="10000042" className="styled_accordion">
											Hek
										</Select.Item>
										<Select.Item value="10000030" className="styled_accordion">
											Rens
										</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
							<Tooltip content="How you sell your products">
								<Text className='accordion_label'>Order type</Text>
							</Tooltip>
							<Select.Root
								defaultValue={settings.subsystemsOrderType.toString()}
								onValueChange={(value: "buy" | "sell") => {
									setSettings({
										...settings,
										subsystemsOrderType: value,
									});
								}}
							>
								<Select.Trigger className="styled_accordion" style={{ width: "100%" }} />
								<Select.Content className="styled_accordion" style={{ width: "100%" }}>
									<Select.Group>
										<Select.Label className="styled_accordion">Order type</Select.Label>
										<Select.Item value="buy" className="styled_accordion">
											Buy orders
										</Select.Item>
										<Select.Item value="sell" className="styled_accordion">
											Sell orders
										</Select.Item>
									</Select.Group>
								</Select.Content>
							</Select.Root>
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
		<Accordion.Header
			className="AccordionHeader"
			style={{ background: "transparent" }}
		>
			<Accordion.Trigger
				style={{ background: "transparent" }}
				className="AccordionTrigger"
				ref={forwardedRef}
			>
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
