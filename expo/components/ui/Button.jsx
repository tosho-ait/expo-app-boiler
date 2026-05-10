import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import InputStringUncentered from "@/components/input/InputStringUncentered";
import { COLORS } from "@/lib/colors";
import { hapticLight, hapticMedium, hapticWarning } from "@/lib/hapticUtil";
import { useT } from "@/i18n";


// Variants:
//   pill         — primary CTA, full-width, rounded-full, brand fill + soft shadow.
//   blue         — solid CTA (rounded-ios-xl) with brand fill. (Legacy name kept for back-compat.)
//   secondary    — tinted gray fill, brand-colored label. Pairs with pill as a softer CTA.
//   ghost        — transparent surface, brand-colored label.
//   destructive  — solid red fill, white label.
//   link_blue    — accent-colored text link (inline actions, back buttons).
//   link_pale    — muted text link (secondary actions, "skip", "forgot").

export default function Button({
    title = "",
    icon = "",
    iconPosition = "left",         // "left" | "right"
    isDisabled = false,
    confirm = undefined,
    custom = undefined,
    className = "",
    onPress = undefined,
    href = "",
    action = undefined,
    testID = "",

    pill = false,
    blue = false,
    secondary = false,
    ghost = false,
    destructive = false,
    link_blue = false,
    link_pale = false,
}) {

    const dispatch = useDispatch();
    const router = useRouter();
    const { t } = useT();

    const [showModal, setShowModal] = useState(false);
    const [yesConfirm, setYesConfirm] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleClose = () => setShowModal(false);

    let buttonClasses = "";
    let textClasses = "";
    let iconSize = 20;
    let iconColor = COLORS.WHITE;
    let iconGap = "gap-2";
    let isSolid = false;
    let pressClasses = "active:opacity-90";

    if (pill) {
        buttonClasses = "py-4 px-6 w-full rounded-full flex justify-center items-center bg-primary-800 shadow-ios-card";
        textClasses = "text-headline font-semibold text-white";
        iconColor = COLORS.WHITE;
        iconSize = 20;
        isSolid = true;
        pressClasses = "active:opacity-90 active:scale-[0.98]";
        if (isDisabled) {
            buttonClasses = "py-4 px-6 w-full rounded-full flex justify-center items-center bg-background-200";
            textClasses = "text-headline font-semibold text-typography-400";
            iconColor = "#8E8E93";
        }
    } else if (blue) {
        buttonClasses = "py-3 px-5 rounded-ios-xl flex flex-row items-center justify-center bg-primary-800 shadow-ios-card";
        textClasses = "text-headline font-semibold text-white";
        iconColor = COLORS.WHITE;
        iconSize = 18;
        isSolid = true;
        pressClasses = "active:opacity-90 active:scale-[0.98]";
        if (isDisabled) {
            buttonClasses = "py-3 px-5 rounded-ios-xl flex flex-row items-center justify-center bg-background-200";
            textClasses = "text-headline font-semibold text-typography-400";
            iconColor = "#8E8E93";
        }
    } else if (secondary) {
        buttonClasses = "py-3 px-5 rounded-ios-xl flex flex-row items-center justify-center bg-background-100";
        textClasses = "text-headline font-semibold text-primary-800";
        iconColor = COLORS.ACCENT;
        iconSize = 18;
        pressClasses = "active:opacity-70 active:scale-[0.98]";
        if (isDisabled) {
            textClasses = "text-headline font-semibold text-typography-300";
            iconColor = "#C6C6C8";
        }
    } else if (ghost) {
        buttonClasses = "py-3 px-4 rounded-ios-xl flex flex-row items-center justify-center";
        textClasses = "text-headline font-semibold text-primary-800";
        iconColor = COLORS.ACCENT;
        iconSize = 18;
        pressClasses = "active:opacity-50";
        if (isDisabled) {
            textClasses = "text-headline font-semibold text-typography-300";
            iconColor = "#C6C6C8";
        }
    } else if (destructive) {
        buttonClasses = "py-3 px-5 rounded-ios-xl flex flex-row items-center justify-center bg-error-500 shadow-ios-card";
        textClasses = "text-headline font-semibold text-white";
        iconColor = COLORS.WHITE;
        iconSize = 18;
        isSolid = true;
        pressClasses = "active:opacity-90 active:scale-[0.98]";
        if (isDisabled) {
            buttonClasses = "py-3 px-5 rounded-ios-xl flex flex-row items-center justify-center bg-background-200";
            textClasses = "text-headline font-semibold text-typography-400";
            iconColor = "#8E8E93";
        }
    } else if (link_blue) {
        buttonClasses = "px-2 py-1 flex flex-row items-center justify-center";
        textClasses = "text-body font-semibold text-tertiary-500";
        iconColor = "#0A84FF";
        iconSize = 18;
        iconGap = "gap-1";
        pressClasses = "active:opacity-50";
        if (isDisabled) {
            textClasses = "text-body font-semibold text-typography-300";
            iconColor = "#C6C6C8";
        }
    } else if (link_pale) {
        buttonClasses = "px-2 py-1 flex flex-row items-center justify-center";
        textClasses = "text-callout font-medium text-typography-500";
        iconColor = "#636366";
        iconSize = 16;
        iconGap = "gap-1";
        pressClasses = "active:opacity-50";
        if (isDisabled) {
            textClasses = "text-callout font-medium text-typography-300";
            iconColor = "#C6C6C8";
        }
    }

    // iOS-style alert dialog with rounded card and stacked actions.
    const confirmComponent = (
        <Modal transparent
            visible={showModal}
            animationType="fade"
            onRequestClose={handleClose}>
            <Pressable className="flex-1 justify-center items-center bg-black/40 px-8" onPress={handleClose}>
                <Pressable
                    onPress={(e) => e.stopPropagation()}
                    className="w-full max-w-[340px] bg-background-0 rounded-ios-2xl overflow-hidden shadow-ios-card-lg">
                    <View className="px-5 pt-5 pb-3 items-center">
                        <Text className="text-headline font-semibold text-typography-900 text-center">
                            {confirm?.title}
                        </Text>
                        <Text className="text-footnote text-typography-600 text-center mt-2">
                            {confirm?.text}
                        </Text>
                        {confirm?.text2 && (
                            <Text className="text-footnote text-typography-600 text-center mt-1">
                                {confirm?.text2}
                            </Text>
                        )}

                        {confirm?.extraConfirm && (
                            <View className="w-full pt-4 pb-2">
                                <InputStringUncentered
                                    value={yesConfirm}
                                    onChange={setYesConfirm}
                                    label={t("common.typeYesToConfirm")}
                                />
                            </View>
                        )}
                    </View>

                    <View className="h-px bg-outline-100" />

                    <View className="flex-row">
                        <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={handleClose}
                            className="flex-1 py-3 items-center justify-center">
                            <Text className="text-body text-tertiary-500">
                                {t("common.cancel") || "Cancel"}
                            </Text>
                        </TouchableOpacity>
                        <View className="w-px bg-outline-100" />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            disabled={
                                confirm?.extraConfirm === true &&
                                "yes".localeCompare(yesConfirm, undefined, { sensitivity: "base" })
                            }
                            onPress={async () => {
                                await doOnPressActions();
                                handleClose();
                            }}
                            className="flex-1 py-3 items-center justify-center">
                            <Text className="text-body font-semibold text-error-500">
                                {confirm?.buttonLabel}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </Pressable>
            </Pressable>
        </Modal>
    );

    const doOnPressActions = async () => {
        if (onPress) await onPress();
        if (action) {
            let d = action();
            if (Array.isArray(d)) {
                for await (const a of d) await dispatch(a);
            } else if (d) {
                dispatch(d);
            }
        }
        if (href) router.navigate(href);
        if (confirm) handleClose();
    };

    const fireHaptic = () => {
        if (isDisabled) return;
        if (confirm) hapticWarning();
        else if (isSolid) hapticMedium();
        else hapticLight();
    };

    const doOnPress = async () => {
        if (processing) return;
        fireHaptic();
        if (confirm) {
            setYesConfirm("");
            setShowModal(true);
        } else {
            setProcessing(true);
            try {
                await doOnPressActions();
            } finally {
                setProcessing(false);
            }
        }
    };

    if (custom) {
        return (
            <Pressable onPress={doOnPress} className="active:opacity-60" testID={testID || undefined}>
                {custom}
                {confirm && confirmComponent}
            </Pressable>
        );
    }

    const finalClasses = `${buttonClasses} ${pressClasses} ${className}`.trim();

    const iconNode = icon ? <Text>{getIcon(icon, iconSize, iconColor)}</Text> : null;
    const titleNode = title ? <Text className={textClasses}>{title}</Text> : null;

    return (
        <Pressable
            className={finalClasses}
            onPress={doOnPress}
            disabled={isDisabled}
            testID={testID || undefined}>
            <View className={`flex flex-row justify-center items-center ${iconGap}`}>
                {iconPosition === "left" && iconNode}
                {titleNode}
                {iconPosition === "right" && iconNode}
            </View>
            {confirm && confirmComponent}
        </Pressable>
    );
}
