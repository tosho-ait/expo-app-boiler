import {
    AntDesign, Entypo,
    Feather,
    FontAwesome,
    FontAwesome5,
    FontAwesome6,
    Ionicons,
    MaterialCommunityIcons
} from "@expo/vector-icons";
import React from "react";
import Animated from "react-native-reanimated";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";


export function getIcon(label, size = 20, color = "white", animated) {

    if (!label) {
        return null;
    }

    let [provider, name] = label.split(":");

    if (animated) {

        const AnimatedIcon = Animated.createAnimatedComponent(MaterialCommunityIcons);
        return <AnimatedIcon name={name} size={32} style={animated}/>

    } else {
        if (provider === "ii") {
            return <Ionicons name={name} size={size} color={color}/>

        } else if (provider === "fa") {
            return <FontAwesome name={name} size={size} color={color}/>

        } else if (provider === "fa5") {
            return <FontAwesome5 name={name} size={size} color={color}/>

        } else if (provider === "fa6") {
            return <FontAwesome6 name={name} size={size} color={color}/>

        } else if (provider === "fe") {
            return <Feather name={name} size={size} color={color}/>

        } else if (provider === "mi") {
            return <MaterialIcons name={name} size={size} color={color}/>

        } else if (provider === "mc") {
            return <MaterialCommunityIcons name={name} size={size} color={color}/>

        } else if (provider === "ad") {
            return <AntDesign name={name} size={size} color={color}/>

        } else if (provider === "et") {
            return <Entypo name={name} size={size} color={color}/>
        }

    }

    return null;
}


// ii = Ionicon
// fa5 = FontAwesome5
// fa6 = FontAwesome6
// fe = Feather
// mc = aterialCommunityIcons
// ad = AntDesign
// et = Entypo
// mi = MaterialIcons
// fa = FontAwesome
