import React from 'react';
import { Image, View } from 'react-native';
import { getIcon } from "@/lib/iconUtil";

const VARIANTS = {
    small: { size: 36, iconSize: 20, radius: 'rounded-ios-sm' },
    medium: { size: 52, iconSize: 26, radius: 'rounded-ios-lg' },
    large: { size: 72, iconSize: 36, radius: 'rounded-ios-xl' },
    xlarge: { size: 96, iconSize: 48, radius: 'rounded-ios-2xl' },
};

const IconInCircle = ({
    icon,
    variant = "medium",
    iconColor = "white",
    bgColor = "#0A84FF",
    image = null,
    rounded = true,            // when false, uses iOS-style square-rounded tile
    className = ""
}) => {

    const { size, iconSize, radius } = VARIANTS[variant] || VARIANTS.medium;
    const shapeClass = rounded ? "rounded-full" : radius;

    return (
        <View style={{ backgroundColor: bgColor, width: size, height: size }}
            className={`items-center justify-center overflow-hidden ${shapeClass} ${className || ""}`}>
            {image
                ? <Image source={{ uri: image }} className="w-full h-full" />
                : getIcon(icon, iconSize, iconColor)
            }
        </View>
    );
};

export default IconInCircle;
