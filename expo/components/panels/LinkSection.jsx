import { Text, View } from 'react-native'
import { getIcon } from "../../lib/iconUtil";
import React from "react";
import Button from "@/components/ui/Button";
import { COLORS } from "@/lib/colors";


/**
 * iOS-style settings row: tinted icon tile + title/description + chevron.
 *
 * @param {object} props
 * @param {string} [props.href]
 * @param {object} [props.confirm]
 * @param {function} [props.onPress]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.description2]
 * @param {string} props.icon
 * @param {string} [props.tint]      Tailwind bg- class for the icon tile (default: bg-background-100).
 * @param {string} [props.iconColor] Hex color for the icon glyph (default: COLORS.ACCENT).
 */
export default function LinkSection({
    href,
    confirm,
    onPress,
    title,
    description,
    description2,
    icon,
    tint = "bg-background-100",
    iconColor = COLORS.ACCENT,
}) {

    const content = (
        <View className="flex-row items-center justify-between px-4 py-3 min-h-[56px]">
            <View className="flex-row items-center gap-3 flex-1 pr-3">
                <View className={`w-9 h-9 rounded-ios-sm items-center justify-center ${tint}`}>
                    {getIcon(icon, 20, iconColor)}
                </View>
                <View className="flex-1">
                    <Text className="text-body font-medium text-typography-900" numberOfLines={1}>
                        {title}
                    </Text>
                    {description && (
                        <Text className="text-footnote text-typography-500 mt-0.5" numberOfLines={2}>
                            {description}
                        </Text>
                    )}
                    {description2 && (
                        <Text className="text-footnote text-typography-500" numberOfLines={2}>
                            {description2}
                        </Text>
                    )}
                </View>
            </View>
            {getIcon("ii:chevron-forward", 18, "#C6C6C8")}
        </View>
    );

    return <Button href={href} custom={content} confirm={confirm} onPress={onPress} />
}
