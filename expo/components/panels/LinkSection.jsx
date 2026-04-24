import { Text, View } from 'react-native'
import { getIcon } from "../../lib/iconUtil";
import React from "react";
import Button from "@/components/ui/Button";


/**
 * @param {object} props
 * @param {string} [props.href]
 * @param {object} [props.confirm]
 * @param {function} [props.onPress]
 * @param {string} props.title
 * @param {string} [props.description]
 * @param {string} [props.description2]
 * @param {string} props.icon
 * @param {number} [props.iconSize]
 */
export default function LinkSection({ href, confirm, onPress, title, description, description2, icon, iconSize }) {

    const content = <View className="flex flex-row w-full justify-between items-center">
        <View className="flex flex-row items-center gap-3">
            <View className="px-3">
                {getIcon(icon, iconSize || 32, "black")}
            </View>
            <View>
                <Text className="text-xl font-semibold">{title}</Text>
                {description && <Text className="text-md text-zinc-600">{description}</Text>}
                {description2 && <Text className="text-md text-zinc-600">{description2}</Text>}
            </View>
        </View>
        <View classNam="p-1">
            {getIcon("fa5:chevron-right", null, "black")}
        </View>
    </View>

    return <Button href={href} custom={content} confirm={confirm} onPress={onPress} />

}