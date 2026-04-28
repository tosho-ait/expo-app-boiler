import React, { useState } from 'react';
import { Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome5 } from "@expo/vector-icons";
import { getIcon } from "../../lib/iconUtil";
import { useDispatch } from "react-redux";
import { useRouter } from "expo-router";
import InputStringUncentered from "@/components/input/InputStringUncentered";
import { COLORS } from "@/lib/colors";
import { hapticLight, hapticMedium, hapticWarning } from "@/lib/hapticUtil";
import { useT } from "@/i18n";


// Four variants:
//   pill       — primary CTA, full-width rounded-full, accent background
//   blue       — solid rounded-lg button (save / submit)
//   link_blue  — accent-colored text link (inline actions, back buttons)
//   link_pale  — muted text link (secondary actions, "skip", "forgot")
//
// All props beyond the variant flags: title, icon, isDisabled, confirm, custom,
// className, onPress, href, action, testID.

export default function Button({
    title = "",
    icon = "",
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
    let iconColor = COLORS.BLACK;
    let iconGap = "gap-2";
    let isSolid = false;

    if (pill) {
        buttonClasses = `p-3 w-full rounded-full flex justify-center items-center ${COLORS.ACCENT_BG}`;
        textClasses = 'text-xl font-semibold text-white';
        iconColor = COLORS.WHITE;
        iconSize = 22;
        isSolid = true;
        if (isDisabled) textClasses = 'text-xl font-semibold text-gray-300';
    } else if (blue) {
        buttonClasses = `py-3 px-6 rounded-lg flex flex-row items-center justify-center ${COLORS.ACCENT_BG}`;
        textClasses = 'text-xl font-semibold text-white';
        iconColor = COLORS.WHITE;
        iconSize = 22;
        isSolid = true;
        if (isDisabled) textClasses = 'text-xl font-semibold text-gray-300';
    } else if (link_blue) {
        buttonClasses = 'px-2 py-1 flex flex-row items-center justify-center';
        textClasses = `text-xl font-semibold ${COLORS.ACCENT_TEXT}`;
        iconColor = COLORS.ACCENT;
        iconGap = "gap-1";
        if (isDisabled) textClasses = 'text-xl font-semibold text-gray-400';
    } else if (link_pale) {
        buttonClasses = 'px-2 py-1 flex flex-row items-center justify-center';
        textClasses = 'text-base font-semibold text-gray-600';
        iconColor = COLORS.MUTED_600;
        iconSize = 17;
        iconGap = "gap-1";
        if (isDisabled) textClasses = 'text-base font-semibold text-gray-400';
    }

    const confirmComponent = (
        <Modal transparent
            visible={showModal}
            animationType="fade"
            onRequestClose={handleClose}>
            <Pressable className="flex-1 justify-center items-center bg-black/25" onPress={handleClose}>
                <View className="w-[90%] bg-white rounded-xl overflow-hidden">
                    <View className="flex-row justify-between items-center px-5 pt-4 pb-3">
                        <Text className="text-xl font-bold text-slate-800">{confirm?.title}</Text>
                        <TouchableOpacity
                            onPress={handleClose}
                            className="w-10 h-10 rounded-full items-center justify-center bg-slate-200">
                            <FontAwesome5 name="times" size={16} color="#64748b" />
                        </TouchableOpacity>
                    </View>

                    <View className="p-5">
                        <Text className="text-lg font-medium text-slate-800 mb-4">{confirm?.text}</Text>
                        {confirm?.text2 && <Text className="pt-1 text-lg mb-2">{confirm?.text2}</Text>}

                        {confirm?.extraConfirm && (
                            <View className="pt-4 mb-4">
                                <InputStringUncentered
                                    notCentered
                                    value={yesConfirm}
                                    onChange={setYesConfirm}
                                    label={t("common.typeYesToConfirm")}
                                />
                            </View>
                        )}

                        <View className="flex-row justify-end pt-2">
                            <Button blue
                                title={confirm?.buttonLabel}
                                isDisabled={
                                    confirm?.extraConfirm === true &&
                                    "yes".localeCompare(yesConfirm, undefined, {
                                        sensitivity: "base",
                                    })
                                }
                                onPress={async () => {
                                    await doOnPressActions();
                                    handleClose();
                                }} />
                        </View>
                    </View>
                </View>
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

    const finalClasses = `${buttonClasses} ${isSolid ? 'active:opacity-50' : ''} ${className}`.trim();

    return (
        <Pressable
            className={finalClasses}
            onPress={doOnPress}
            disabled={isDisabled}
            testID={testID || undefined}>
            <View className={`flex flex-row justify-center items-center ${iconGap}`}>
                {icon && <Text>{getIcon(icon, iconSize, iconColor)}</Text>}
                {title && <Text className={textClasses}>{title}</Text>}
            </View>
            {confirm && confirmComponent}
        </Pressable>
    );
}
