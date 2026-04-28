import {Link} from 'expo-router';
import {StyleSheet, Text, View} from 'react-native';
import {useT} from "@/i18n";


export default function NotFoundScreen() {
    const {t} = useT();
    return (
        <View style={styles.container}>
            <Text type="title">{t("notFound.title")}</Text>
            <Link href="/" style={styles.link}>
                <Text type="link">{t("notFound.goHome")}</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    link: {
        marginTop: 15,
        paddingVertical: 15,
    },
});
