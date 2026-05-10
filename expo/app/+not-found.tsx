import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useT } from "@/i18n";


export default function NotFoundScreen() {
    const { t } = useT();
    return (
        <View className="flex-1 items-center justify-center px-6 bg-background-100">
            <View className="w-16 h-16 rounded-full bg-background-200 items-center justify-center mb-4">
                <Ionicons name="compass-outline" size={32} color="#8E8E93" />
            </View>
            <Text className="text-title-2 font-bold text-typography-900">
                {t("notFound.title")}
            </Text>
            <Link href="/" className="mt-4 px-5 py-3 rounded-full bg-primary-800">
                <Text className="text-headline font-semibold text-white">
                    {t("notFound.goHome")}
                </Text>
            </Link>
        </View>
    );
}
