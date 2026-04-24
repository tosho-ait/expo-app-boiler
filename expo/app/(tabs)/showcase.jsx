import React, { useState } from "react";
import { Alert, SafeAreaView, ScrollView, Text, View } from "react-native";
import Button from "@/components/ui/Button";
import RoundButton from "@/components/ui/RoundButton";
import DotButton from "@/components/ui/DotButton";
import IconInCircle from "@/components/ui/IconInCircle";
import ModalHeader from "@/components/ui/ModalHeader";
import BottomSheet from "@/components/ui/BottomSheet";
import ActionSheet from "@/components/ui/ActionSheet";
import InputString from "@/components/input/InputString";
import InputStringEmail from "@/components/input/InputStringEmail";
import InputStringPass from "@/components/input/InputStringPass";
import InputNote from "@/components/input/InputNote";
import Select from "@/components/input/Select";
import InfoPanel from "@/components/panels/InfoPanel";
import LockedPanel from "@/components/panels/LockedPanel";
import ErrorPanelText from "@/components/panels/ErrorPanelText";
import PanelDark from "@/components/panels/PanelDark";
import PanelFullWhite from "@/components/panels/PanelFullWhite";
import PanelSimpleWhite from "@/components/panels/PanelSimpleWhite";
import PanelEmpty from "@/components/panels/PanelEmpty";
import LinkSection from "@/components/panels/LinkSection";
import ViewSwitch from "@/components/ui/ViewSwitch";
import SurveyOption from "@/components/ui/SurveyOption";
import ProgressDots from "@/components/ui/ProgressDots";
import GraphicFavorites from "@/components/graphics/GraphicFavorites";
import { getIcon } from "@/lib/iconUtil";
import { COLORS } from "@/lib/colors";


function Section({ title, children }) {
    return (
        <View className="mb-8">
            <Text className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3 px-1">
                {title}
            </Text>
            <View className="gap-3">
                {children}
            </View>
        </View>
    );
}

function Row({ children }) {
    return <View className="flex-row flex-wrap gap-3 items-center">{children}</View>;
}

function Label({ children }) {
    return <Text className="text-xs text-gray-500 mb-1">{children}</Text>;
}


function ColorSwatches() {
    const swatches = [
        { label: "BLUE", bg: COLORS.BLUE_BG, hex: COLORS.BLUE },
        { label: "GREEN", bg: COLORS.GREEN_BG, hex: COLORS.GREEN },
        { label: "PURPLE", bg: COLORS.PURPLE_BG, hex: COLORS.PURPLE },
        { label: "YELLOW", bg: COLORS.YELLOW_BG, hex: COLORS.YELLOW },
        { label: "RED", bg: COLORS.RED_BG, hex: COLORS.RED },
        { label: "ACCENT", bg: COLORS.ACCENT_BG, hex: COLORS.ACCENT },
    ];
    return (
        <Row>
            {swatches.map(s => (
                <View key={s.label} className="items-center">
                    <View className={`w-16 h-16 rounded-xl ${s.bg}`} />
                    <Text className="text-[10px] text-gray-600 mt-1 font-semibold">{s.label}</Text>
                    <Text className="text-[10px] text-gray-400">{s.hex}</Text>
                </View>
            ))}
        </Row>
    );
}


function IconGrid() {
    const items = [
        "ii:list-outline", "ii:settings-outline", "ii:person-circle-outline",
        "ii:heart", "ii:star", "ii:flash",
        "fa5:crown", "fa5:check", "fa5:users",
        "mc:cloud-sync", "mc:earth", "mc:magic-staff",
        "ad:plus", "ad:tags", "fa:bar-chart",
    ];
    return (
        <Row>
            {items.map(ic => (
                <View key={ic} className="items-center w-[70px]">
                    <View className="w-12 h-12 bg-gray-100 rounded-xl items-center justify-center">
                        {getIcon(ic, 22, "#374151")}
                    </View>
                    <Text className="text-[9px] text-gray-500 mt-1" numberOfLines={1}>{ic}</Text>
                </View>
            ))}
        </Row>
    );
}


export default function ShowcaseScreen() {
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [note, setNote] = useState("");
    const [selectValue, setSelectValue] = useState("b");
    const [viewId, setViewId] = useState("list");
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
        <View className="flex-1 bg-gray-100">
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }}>

                    <View className="mb-6">
                        <Text className="text-3xl font-bold text-gray-900">UI Showcase</Text>
                        <Text className="text-gray-500 mt-1">
                            A gallery of every component available in the boilerplate.
                        </Text>
                    </View>

                    {/* COLORS */}
                    <Section title="Colors">
                        <ColorSwatches />
                    </Section>

                    {/* ICONS */}
                    <Section title="Icons (getIcon)">
                        <Text className="text-xs text-gray-400 mb-1">
                            Format: <Text className="font-mono">provider:name</Text> — ii, fa, fa5, fa6, fe, mi, mc, ad, et
                        </Text>
                        <IconGrid />
                    </Section>

                    {/* BUTTON VARIANTS */}
                    <Section title="Buttons">
                        <Label>pill — primary full-width CTA</Label>
                        <Button pill title="Continue" onPress={() => {}} />

                        <Label>blue — solid rounded-lg button</Label>
                        <Row>
                            <Button blue title="Save" onPress={() => {}} />
                            <Button blue title="With icon" icon="fa5:check" onPress={() => {}} />
                            <Button blue title="Disabled" isDisabled onPress={() => {}} />
                        </Row>

                        <Label>link_blue — accent-colored text link</Label>
                        <Row>
                            <Button link_blue title="Back" icon="ii:chevron-back" onPress={() => {}} />
                            <Button link_blue title="Leave feedback" onPress={() => {}} />
                        </Row>

                        <Label>link_pale — muted text link (secondary actions)</Label>
                        <Row>
                            <Button link_pale title="Skip for now" onPress={() => {}} />
                            <Button link_pale title="Forgot password?" onPress={() => {}} />
                        </Row>

                        <Label>with confirmation dialog</Label>
                        <Button
                            blue
                            title="Delete (with confirm)"
                            confirm={{
                                title: "Delete Item",
                                text: "Are you sure? This cannot be undone.",
                                buttonLabel: "Delete",
                            }}
                            onPress={() => Alert.alert("Deleted!")}
                        />
                    </Section>

                    {/* ROUND + DOT BUTTONS */}
                    <Section title="Round & Dot buttons">
                        <Label>RoundButton variants</Label>
                        <Row>
                            <RoundButton variant="close" onPress={() => {}} />
                            <RoundButton variant="save" onPress={() => {}} />
                            <RoundButton variant="delete" onPress={() => {}} />
                            <RoundButton variant="reject" onPress={() => {}} />
                        </Row>

                        <Label>DotButton</Label>
                        <Row>
                            <DotButton icon="ii:search" onPress={() => {}} />
                            <DotButton icon="ii:notifications-outline" active overlay="5" onPress={() => {}} />
                            <DotButton icon="ii:filter" onPress={() => {}} />
                        </Row>
                    </Section>

                    {/* ICON IN CIRCLE */}
                    <Section title="IconInCircle">
                        <Row>
                            <View className="items-center">
                                <IconInCircle variant="small" icon="fa5:user" bgColor={COLORS.BLUE} />
                                <Text className="text-[10px] mt-1 text-gray-500">small</Text>
                            </View>
                            <View className="items-center">
                                <IconInCircle variant="medium" icon="fa5:crown" bgColor={COLORS.YELLOW} />
                                <Text className="text-[10px] mt-1 text-gray-500">medium</Text>
                            </View>
                            <View className="items-center">
                                <IconInCircle variant="large" icon="mc:earth" bgColor={COLORS.PURPLE} />
                                <Text className="text-[10px] mt-1 text-gray-500">large</Text>
                            </View>
                        </Row>
                    </Section>

                    {/* INPUTS */}
                    <Section title="Inputs">
                        <InputString label="Name" value={text} onChange={setText} />
                        <InputStringEmail value={email} onChange={setEmail} />
                        <InputStringPass value={pass} onChange={setPass} />
                        <InputNote note={note} setNote={setNote} />
                        <Select
                            label="Select an option"
                            value={selectValue}
                            onChange={setSelectValue}
                            options={[
                                { value: "a", label: "Option A" },
                                { value: "b", label: "Option B" },
                                { value: "c", label: "Option C" },
                            ]}
                        />
                    </Section>

                    {/* VIEW SWITCH */}
                    <Section title="ViewSwitch">
                        <Row>
                            <ViewSwitch
                                views={[
                                    { id: "list", icon: "ii:list" },
                                    { id: "grid", icon: "ii:grid" },
                                    { id: "chart", icon: "ii:pie-chart" },
                                ]}
                                activeViewId={viewId}
                                onSelect={setViewId}
                            />
                        </Row>
                    </Section>

                    {/* PANELS */}
                    <Section title="Panels">
                        <Label>PanelFullWhite</Label>
                        <PanelFullWhite>
                            <Text className="text-gray-700">Full-width white panel, no rounding.</Text>
                        </PanelFullWhite>

                        <Label>PanelSimpleWhite (rounded)</Label>
                        <PanelSimpleWhite className="p-4">
                            <Text className="text-gray-700">Rounded white panel.</Text>
                        </PanelSimpleWhite>

                        <Label>PanelDark (grouped list)</Label>
                        <PanelDark>
                            <LinkSection
                                href={null}
                                onPress={() => {}}
                                title="Settings"
                                description="Adjust your preferences"
                                icon="ii:settings-outline"
                            />
                            <View className="px-4"><View className="h-px bg-white" /></View>
                            <LinkSection
                                onPress={() => {}}
                                title="Export"
                                description="Download your data"
                                icon="mc:export-variant"
                            />
                        </PanelDark>

                        <Label>InfoPanel</Label>
                        <InfoPanel text={[
                            "InfoPanel is used to show contextual hints.",
                            "It supports multiple paragraphs.",
                        ]} />

                        <Label>InfoPanel (collapsible)</Label>
                        <InfoPanel isCollapsible text={[
                            "This panel is collapsible. Only the first paragraph is shown until the user taps 'show full info'.",
                            "Second paragraph hidden until expanded.",
                        ]} />

                        <Label>LockedPanel</Label>
                        <LockedPanel
                            title="Pro Feature"
                            text={["Unlock this by upgrading to Pro."]}
                            icon="ii:lock-closed"
                            href={null}
                        />

                        <Label>ErrorPanelText</Label>
                        <Row>
                            <Button link_small title={showError ? "Hide error" : "Show error"}
                                onPress={() => setShowError(v => !v)} />
                        </Row>
                        {showError && <ErrorPanelText error="Something went wrong. Please try again." />}

                        <Label>PanelEmpty</Label>
                        <PanelEmpty
                            icon="folder-search-outline"
                            text="No items here yet"
                            subtext="Add your first item to get started"
                            action={{ label: "Add Item", onPress: () => {} }}
                        />
                    </Section>

                    {/* MODALS */}
                    <Section title="Modals & Sheets">
                        <Row>
                            <Button blue title="Open BottomSheet" onPress={() => setShowBottomSheet(true)} />
                            <Button blue title="Open ActionSheet" onPress={() => setShowActionSheet(true)} />
                        </Row>

                        <Label>ModalHeader (standalone preview)</Label>
                        <View className="bg-white rounded-xl border border-gray-200">
                            <ModalHeader title="Modal Title" onClose={() => {}} />
                            <View className="px-6 pb-4">
                                <Text className="text-gray-600">Modal content goes here.</Text>
                            </View>
                        </View>
                    </Section>

                    {/* PROGRESS DOTS */}
                    <Section title="ProgressDots">
                        <Row>
                            <ProgressDots total={6} completed={1} />
                        </Row>
                        <Row>
                            <ProgressDots total={6} completed={3} />
                        </Row>
                        <Row>
                            <ProgressDots total={6} completed={6} />
                        </Row>
                    </Section>

                    {/* SURVEY OPTIONS */}
                    <Section title="SurveyOption">
                        <SurveyOption title="Build a side project" icon="ii:rocket-outline" onPress={() => {}} />
                        <SurveyOption title="Ship a production app" icon="ii:flash-outline" onPress={() => {}} />
                        <SurveyOption title="Learn the stack" icon="ii:school-outline" onPress={() => {}} />
                    </Section>

                    {/* GRAPHICS */}
                    <Section title="Graphics">
                        <GraphicFavorites />
                    </Section>

                    {/* TYPOGRAPHY */}
                    <Section title="Typography">
                        <Text className="text-4xl font-black text-gray-900">Display</Text>
                        <Text className="text-3xl font-bold text-gray-900">Heading 1</Text>
                        <Text className="text-2xl font-bold text-gray-900">Heading 2</Text>
                        <Text className="text-xl font-semibold text-gray-800">Heading 3</Text>
                        <Text className="text-lg text-gray-700">Body large</Text>
                        <Text className="text-base text-gray-700">Body regular</Text>
                        <Text className="text-sm text-gray-500">Body small</Text>
                        <Text className="text-xs text-gray-400 uppercase tracking-wider">Caption</Text>
                    </Section>

                </ScrollView>
            </SafeAreaView>

            <BottomSheet
                visible={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
                title="Bottom Sheet"
                heightClass="h-[50%]">
                <View className="p-6 gap-4">
                    <Text className="text-gray-700 text-lg">
                        BottomSheet slides up from the bottom and has a modal header.
                    </Text>
                    <Button blue title="Close" onPress={() => setShowBottomSheet(false)} />
                </View>
            </BottomSheet>

            <ActionSheet visible={showActionSheet} onClose={() => setShowActionSheet(false)}>
                <View className="px-4 pb-4 gap-2">
                    <Button link_p title="Edit" icon="ii:pencil-outline" onPress={() => setShowActionSheet(false)} />
                    <Button link_p title="Share" icon="ii:share-outline" onPress={() => setShowActionSheet(false)} />
                    <Button link_pp title="Delete" icon="ii:trash-outline" onPress={() => setShowActionSheet(false)} />
                </View>
            </ActionSheet>
        </View>
    );
}
