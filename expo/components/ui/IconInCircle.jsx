import React from 'react';
import { Image, View } from 'react-native';
import { getIcon } from "@/lib/iconUtil";

const VARIANTS = {
    small: { size: 40, iconSize: 24 },
    medium: { size: 56, iconSize: 32 },
    large: { size: 64, iconSize: 32 },
};

const IconInCircle = ({
    icon,
    variant = "medium",
    iconColor = "white",
    bgColor = "#e5e7eb",
    image = null,
    className = ""
}) => {

    const { size, iconSize } = VARIANTS[variant] || VARIANTS.medium;

    return (
        <View style={{ backgroundColor: bgColor, width: size, height: size }}
            className={`rounded-full items-center justify-center overflow-hidden ${className || ""}`}>
            {image
                ? <Image source={{ uri: image }} className="w-full h-full" />
                : getIcon(icon, iconSize, iconColor)
            }
        </View>
    );
};

export default IconInCircle;
