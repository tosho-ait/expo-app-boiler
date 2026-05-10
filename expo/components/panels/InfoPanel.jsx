import React from 'react';
import { Text, View } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import { useT } from "@/i18n";


function InfoPanel({ text, isCollapsible }) {

    const [expanded, setExpanded] = React.useState(false);
    const { t } = useT();

    if (!text || !text.length) return null;

    const content = isCollapsible && !expanded ? [text[0] + "…"] : text;

    return (
        <View className="bg-tertiary-50 rounded-ios-xl p-4 flex-row gap-3">
            <View className="pt-0.5">
                {getIcon("ii:information-circle", 22, "#0A84FF")}
            </View>
            <View className="flex-1">
                {content.map((paragraph, index) => (
                    <Text key={index}
                        numberOfLines={isCollapsible && !expanded ? 3 : undefined}
                        className={`text-callout text-typography-800 ${index > 0 ? 'mt-2' : ''}`}>
                        {paragraph}
                    </Text>
                ))}
                {isCollapsible && !expanded && (
                    <Text onPress={() => setExpanded(true)}
                        className="text-footnote font-semibold text-tertiary-500 mt-2">
                        {t("infoPanel.showFull")}
                    </Text>
                )}
            </View>
        </View>
    );
}

export default InfoPanel;
