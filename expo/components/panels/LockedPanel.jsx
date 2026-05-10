import React from 'react';
import { Text, View } from 'react-native';
import { getIcon } from "../../lib/iconUtil";
import Button from "@/components/ui/Button";
import { useT } from "@/i18n";


function LockedPanel({ text, isCollapsible, icon = "ii:lock-closed", title, href }) {

    const [expanded, setExpanded] = React.useState(false);
    const { t } = useT();

    if (!text || !text.length) return null;

    const content = isCollapsible && !expanded ? [text[0] + "…"] : text;

    return (
        <Button href={href} custom={
            <View className="bg-background-100 rounded-ios-xl p-4 flex-row gap-3">
                <View className="w-10 h-10 rounded-full bg-background-0 items-center justify-center shadow-ios-card">
                    {getIcon(icon, 20, "#636366")}
                </View>
                <View className="flex-1">
                    {title && (
                        <Text className="text-headline text-typography-900 mb-1">
                            {title}
                        </Text>
                    )}
                    {content.map((paragraph, index) => (
                        <Text key={index}
                            numberOfLines={isCollapsible && !expanded ? 2 : undefined}
                            className={`text-callout text-typography-600 ${index > 0 ? 'mt-1' : ''}`}>
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
                <View className="self-center pl-1">
                    {getIcon("ii:chevron-forward", 18, "#C6C6C8")}
                </View>
            </View>
        } />
    );
}

export default LockedPanel;
