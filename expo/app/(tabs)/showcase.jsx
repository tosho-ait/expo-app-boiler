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
import Card from "@/components/ui/Card";
import AppText from "@/components/ui/AppText";
import ViewSwitch from "@/components/ui/ViewSwitch";
import SurveyOption from "@/components/ui/SurveyOption";
import ProgressDots from "@/components/ui/ProgressDots";
import GraphicFavorites from "@/components/graphics/GraphicFavorites";
import { getIcon } from "@/lib/iconUtil";


function Section({ title, children }) {
    return (
        <View className="mb-9">
            <Text className="text-caption font-semibold text-typography-500 uppercase tracking-wider mb-3 px-1">
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
    return <Text className="text-footnote text-typography-400 mb-0.5 mt-1">{children}</Text>;
}


function ColorSwatches() {
    const swatches = [
        { label: "BRAND", bg: "bg-primary-800", hex: "#091A2F" },
        { label: "BLUE", bg: "bg-tertiary-500", hex: "#0A84FF" },
        { label: "GREEN", bg: "bg-success-500", hex: "#34C759" },
        { label: "PURPLE", bg: "bg-[#AF52DE]", hex: "#AF52DE" },
        { label: "ORANGE", bg: "bg-warning-500", hex: "#FF9500" },
        { label: "RED", bg: "bg-error-500", hex: "#FF3B30" },
    ];
    return (
        <Row>
            {swatches.map(s => (
                <View key={s.label} className="items-center">
                    <View className={`w-16 h-16 rounded-ios-xl shadow-ios-card ${s.bg}`} />
                    <Text className="text-caption-2 text-typography-700 mt-1.5 font-semibold">{s.label}</Text>
                    <Text className="text-caption-2 text-typography-400">{s.hex}</Text>
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
                <View key={ic} className="items-center w-[68px]">
                    <View className="w-12 h-12 bg-background-0 rounded-ios-lg items-center justify-center shadow-ios-card">
                        {getIcon(ic, 22, "#091A2F")}
                    </View>
                    <Text className="text-caption-2 text-typography-500 mt-1" numberOfLines={1}>{ic}</Text>
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
    const [surveyChoice, setSurveyChoice] = useState("");
    const [showBottomSheet, setShowBottomSheet] = useState(false);
    const [showActionSheet, setShowActionSheet] = useState(false);
    const [showError, setShowError] = useState(false);

    return (
        <View className="flex-1 bg-background-100">
            <SafeAreaView className="flex-1">
                <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 120 }} showsVerticalScrollIndicator={false}>

                    <View className="mb-6 mt-2">
                        <Text className="text-large-title font-bold text-typography-900">UI Showcase</Text>
                        <Text className="text-callout text-typography-500 mt-1">
                            Every component, restyled in iOS 17 / soft-neumorphic.
                        </Text>
                    </View>

                    <Section title="Typography (AppText)">
                        <Card padding="md">
                            <AppText variant="largeTitle">Large title</AppText>
                            <AppText variant="title1">Title 1</AppText>
                            <AppText variant="title2">Title 2</AppText>
                            <AppText variant="title3">Title 3</AppText>
                            <AppText variant="headline">Headline</AppText>
                            <AppText variant="body">Body</AppText>
                            <AppText variant="callout" tone="secondary">Callout · secondary tone</AppText>
                            <AppText variant="subhead" tone="tertiary">Subhead · tertiary tone</AppText>
                            <AppText variant="footnote">Footnote</AppText>
                            <AppText variant="caption" tone="accent">Caption · accent</AppText>
                        </Card>
                    </Section>

                    <Section title="Colors">
                        <ColorSwatches />
                    </Section>

                    <Section title="Icons (getIcon)">
                        <Text className="text-caption text-typography-400">
                            Format: <Text className="font-mono">provider:name</Text> — ii, fa, fa5, fa6, fe, mi, mc, ad, et
                        </Text>
                        <IconGrid />
                    </Section>

                    <Section title="Buttons">
                        <Label>pill — primary CTA</Label>
                        <Button pill title="Continue" onPress={() => { }} />

                        <Label>blue — solid CTA</Label>
                        <Row>
                            <Button blue title="Save" onPress={() => { }} />
                            <Button blue title="With icon" icon="fa5:check" onPress={() => { }} />
                            <Button blue title="Disabled" isDisabled onPress={() => { }} />
                        </Row>

                        <Label>secondary — tinted CTA</Label>
                        <Row>
                            <Button secondary title="Cancel" onPress={() => { }} />
                            <Button secondary icon="ii:share-outline" title="Share" onPress={() => { }} />
                        </Row>

                        <Label>ghost — minimal action</Label>
                        <Row>
                            <Button ghost title="Skip for now" onPress={() => { }} />
                            <Button ghost icon="ii:add" title="Add another" onPress={() => { }} />
                        </Row>

                        <Label>destructive — irreversible action</Label>
                        <Row>
                            <Button destructive title="Delete account" onPress={() => { }} />
                        </Row>

                        <Label>link_blue — accent text link</Label>
                        <Row>
                            <Button link_blue title="Back" icon="ii:chevron-back" onPress={() => { }} />
                            <Button link_blue title="Leave feedback" onPress={() => { }} />
                        </Row>

                        <Label>link_pale — muted text link</Label>
                        <Row>
                            <Button link_pale title="Skip for now" onPress={() => { }} />
                            <Button link_pale title="Forgot password?" onPress={() => { }} />
                        </Row>

                        <Label>with confirmation dialog</Label>
                        <Button
                            destructive
                            title="Delete (with confirm)"
                            confirm={{
                                title: "Delete Item",
                                text: "Are you sure? This cannot be undone.",
                                buttonLabel: "Delete",
                            }}
                            onPress={() => Alert.alert("Deleted!")}
                        />
                    </Section>

                    <Section title="Round & Dot buttons">
                        <Label>RoundButton variants</Label>
                        <Row>
                            <RoundButton variant="close" onPress={() => { }} />
                            <RoundButton variant="save" onPress={() => { }} />
                            <RoundButton variant="delete" onPress={() => { }} />
                            <RoundButton variant="reject" onPress={() => { }} />
                        </Row>

                        <Label>DotButton</Label>
                        <Row>
                            <DotButton icon="ii:search" onPress={() => { }} />
                            <DotButton icon="ii:notifications-outline" active overlay="5" onPress={() => { }} />
                            <DotButton icon="ii:filter" onPress={() => { }} />
                        </Row>
                    </Section>

                    <Section title="IconInCircle / IconTile">
                        <Label>Round (rounded-full)</Label>
                        <Row>
                            <View className="items-center">
                                <IconInCircle variant="small" icon="fa5:user" bgColor="#0A84FF" />
                                <Text className="text-caption-2 mt-1 text-typography-500">small</Text>
                            </View>
                            <View className="items-center">
                                <IconInCircle variant="medium" icon="fa5:crown" bgColor="#FF9500" />
                                <Text className="text-caption-2 mt-1 text-typography-500">medium</Text>
                            </View>
                            <View className="items-center">
                                <IconInCircle variant="large" icon="mc:earth" bgColor="#AF52DE" />
                                <Text className="text-caption-2 mt-1 text-typography-500">large</Text>
                            </View>
                            <View className="items-center">
                                <IconInCircle variant="xlarge" icon="ii:rocket" bgColor="#34C759" />
                                <Text className="text-caption-2 mt-1 text-typography-500">xlarge</Text>
                            </View>
                        </Row>

                        <Label>Square-rounded tile</Label>
                        <Row>
                            <IconInCircle variant="small" rounded={false} icon="ii:settings" bgColor="#091A2F" />
                            <IconInCircle variant="medium" rounded={false} icon="ii:heart" bgColor="#FF3B30" />
                            <IconInCircle variant="large" rounded={false} icon="fa5:check" bgColor="#091A2F" />
                        </Row>
                    </Section>

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

                    <Section title="ViewSwitch (segmented)">
                        <ViewSwitch
                            views={[
                                { id: "list", icon: "ii:list" },
                                { id: "grid", icon: "ii:grid" },
                                { id: "chart", icon: "ii:pie-chart" },
                            ]}
                            activeViewId={viewId}
                            onSelect={setViewId}
                        />
                    </Section>

                    <Section title="Cards">
                        <Label>Card · elevated</Label>
                        <Card variant="elevated">
                            <Text className="text-body text-typography-700">Soft-shadowed white surface.</Text>
                        </Card>

                        <Label>Card · grouped</Label>
                        <Card variant="grouped">
                            <Text className="text-body text-typography-700">Hairline border, no shadow — sits flush.</Text>
                        </Card>

                        <Label>Card · tinted</Label>
                        <Card variant="tinted">
                            <Text className="text-body text-typography-700">Tinted fill — for callouts and chips.</Text>
                        </Card>
                    </Section>

                    <Section title="Panels">
                        <Label>PanelFullWhite (page section)</Label>
                        <PanelFullWhite>
                            <Text className="text-body text-typography-700">Full-width content card.</Text>
                        </PanelFullWhite>

                        <Label>PanelSimpleWhite</Label>
                        <PanelSimpleWhite className="p-4">
                            <Text className="text-body text-typography-700">Rounded white card.</Text>
                        </PanelSimpleWhite>

                        <Label>PanelDark — iOS grouped list</Label>
                        <PanelDark>
                            <LinkSection
                                onPress={() => { }}
                                title="Settings"
                                description="Adjust your preferences"
                                icon="ii:settings-outline"
                            />
                            <LinkSection
                                onPress={() => { }}
                                title="Export"
                                description="Download your data"
                                icon="mc:export-variant"
                            />
                            <LinkSection
                                onPress={() => { }}
                                title="Account"
                                description="Manage your profile"
                                icon="ii:person-circle-outline"
                            />
                        </PanelDark>

                        <Label>InfoPanel</Label>
                        <InfoPanel text={[
                            "InfoPanel is used to show contextual hints.",
                            "It supports multiple paragraphs.",
                        ]} />

                        <Label>InfoPanel (collapsible)</Label>
                        <InfoPanel isCollapsible text={[
                            "This panel is collapsible. Only the first paragraph shows until expanded.",
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
                            <Button secondary title={showError ? "Hide error" : "Show error"}
                                onPress={() => setShowError(v => !v)} />
                        </Row>
                        {showError && <ErrorPanelText error="Something went wrong. Please try again." />}

                        <Label>PanelEmpty</Label>
                        <PanelEmpty
                            icon="folder-search-outline"
                            text="No items here yet"
                            subtext="Add your first item to get started"
                            action={{ label: "Add Item", onPress: () => { } }}
                        />
                    </Section>

                    <Section title="Modals & Sheets">
                        <Row>
                            <Button blue title="Open BottomSheet" onPress={() => setShowBottomSheet(true)} />
                            <Button secondary title="Open ActionSheet" onPress={() => setShowActionSheet(true)} />
                        </Row>

                        <Label>ModalHeader (preview)</Label>
                        <Card padding="none">
                            <ModalHeader title="Modal Title" onClose={() => { }} />
                            <View className="px-5 pb-4">
                                <Text className="text-body text-typography-600">Modal content goes here.</Text>
                            </View>
                        </Card>
                    </Section>

                    <Section title="ProgressDots">
                        <ProgressDots total={6} completed={1} />
                        <View className="h-3" />
                        <ProgressDots total={6} completed={3} />
                        <View className="h-3" />
                        <ProgressDots total={6} completed={6} />
                    </Section>

                    <Section title="SurveyOption">
                        <SurveyOption
                            icon="ii:rocket-outline"
                            title="Build a side project"
                            selected={surveyChoice === "side"}
                            onPress={() => setSurveyChoice("side")} />
                        <SurveyOption
                            icon="ii:flash-outline"
                            title="Ship a production app"
                            selected={surveyChoice === "prod"}
                            onPress={() => setSurveyChoice("prod")} />
                        <SurveyOption
                            icon="ii:school-outline"
                            title="Learn the stack"
                            selected={surveyChoice === "learn"}
                            onPress={() => setSurveyChoice("learn")} />
                    </Section>

                    <Section title="Graphics">
                        <Card padding="lg" variant="tinted">
                            <View className="items-center">
                                <GraphicFavorites />
                            </View>
                        </Card>
                    </Section>

                </ScrollView>
            </SafeAreaView>

            <BottomSheet
                visible={showBottomSheet}
                onClose={() => setShowBottomSheet(false)}
                title="Bottom Sheet"
                heightClass="h-[50%]">
                <View className="p-6 gap-4">
                    <Text className="text-body text-typography-700">
                        BottomSheet slides up from the bottom and has a modal header.
                    </Text>
                    <Button blue title="Close" onPress={() => setShowBottomSheet(false)} />
                </View>
            </BottomSheet>

            <ActionSheet visible={showActionSheet} onClose={() => setShowActionSheet(false)}>
                <View className="px-4 pb-4 gap-2">
                    <Button ghost title="Edit" icon="ii:pencil-outline" onPress={() => setShowActionSheet(false)} />
                    <Button ghost title="Share" icon="ii:share-outline" onPress={() => setShowActionSheet(false)} />
                    <Button ghost title="Delete" icon="ii:trash-outline" onPress={() => setShowActionSheet(false)} />
                </View>
            </ActionSheet>
        </View>
    );
}
