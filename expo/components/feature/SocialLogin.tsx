import * as React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {AntDesign} from "@expo/vector-icons";
import Svg, {Path} from 'react-native-svg'

const GoogleIcon = ({size = 20}) => (
    <Svg width={size} height={size} viewBox="0 0 533.5 544.3">
        <Path fill="#4285F4"
              d="M533.5 278.4c0-17.4-1.6-34-4.7-50.2H272v95h147.3c-6.4 34.7-25 64-53.3 83.8v69.6h85.9c50.2-46.3 81.6-114.4 81.6-198.2z"/>
        <Path fill="#34A853"
              d="M272 544.3c72.4 0 133.2-23.9 177.6-64.7l-85.9-69.6c-23.9 16-54.3 25.4-91.7 25.4-70.4 0-130-47.4-151.3-111.3H31.2v69.9c44.3 87.6 136.1 150.3 240.8 150.3z"/>
        <Path fill="#FBBC05"
              d="M120.7 324.1c-10.5-31.4-10.5-65.6 0-97l-89.5-69.9C11.2 209.4 0 242 0 278.4c0 36.4 11.2 69 31.2 97l89.5-69.9z"/>
        <Path fill="#EA4335"
              d="M272 107.7c39.3 0 74.5 13.6 102.3 40.4l76.4-76.4C405.2 26.7 344.4 0 272 0 167.3 0 75.5 62.7 31.2 150.3l89.5 69.9C142 155.1 201.6 107.7 272 107.7z"/>
    </Svg>
)

export default function SocialLogin({onSocialLogin}) {

    return (
        <View key="6" className="flex gap-3">

            {/*<View key="9" className="px-16 flex-row items-center gap-3">*/}
            {/*    <View className="flex-1 h-px bg-gray-400"/>*/}
            {/*    <Text className="mx-2 text-gray-400">or</Text>*/}
            {/*    <View className="flex-1 h-px bg-gray-400"/>*/}
            {/*</View>*/}

            <TouchableOpacity
                onPress={() => onSocialLogin("oauth_google")}
                className="flex-row gap-2 items-center justify-center w-full py-3 mt-4 bg-white border border-gray-400 rounded-full active:opacity-70">
                <GoogleIcon size={20}/>
                <Text className="ml-2 text-base font-semibold text-gray-700">
                    Sign In with Google
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => onSocialLogin("oauth_apple")}
                className="flex-row gap-2 items-center justify-center w-full py-3 mt-4 bg-white border border-gray-400 rounded-full active:opacity-70">
                <AntDesign name="apple1" size={21}/>
                <Text className="ml-2 text-base font-semibold text-gray-700">
                    Sign In with Apple
                </Text>
            </TouchableOpacity>
        </View>
    )
}
