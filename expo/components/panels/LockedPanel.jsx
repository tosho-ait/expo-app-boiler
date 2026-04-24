import React from 'react';
import {Text, View} from 'react-native';
import {getIcon} from "../../lib/iconUtil";
import colors from "tailwindcss/colors";
import Button from "@/components/ui/Button";


function LockedPanel({text, isCollapsible, icon = "ii:lock-closed", title, href}) {

    const [expanded, setExpanded] = React.useState(false);

    if (text && text.length) {

        let content = text;

        if (isCollapsible && !expanded) {
            content = [text[0] + "..."];
        }

        return (
            <Button href={href} custom={
                <View className="bg-gray-200 p-4 rounded-xl relative">

                    <View className="absolute top-4 right-4">
                        {getIcon(icon, 24, colors.gray[600])}
                    </View>

                    <View className="pr-10 pl-2">
                        {title &&
                            <Text className="text-gray-800 font-semibold text-lg mb-2">{title}</Text>}

                        {content.map((paragraph, index) => (
                            <Text key={index}
                                  numberOfLines={isCollapsible && !expanded ? 2 : undefined}
                                  className={`text-gray-800 font-medium text-base ${index > 0 ? 'mt-2' : ''}`}>
                                {paragraph}
                            </Text>
                        ))}

                    </View>

                    {isCollapsible && !expanded && (
                        <Text onPress={() => setExpanded(true)}
                              className="text-gray-600 text-sm opacity-80 text-center font-medium mt-2">
                            show full info
                        </Text>
                    )}
                </View>
            }/>
        );
    }

    return null;
}

export default LockedPanel;
