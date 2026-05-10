import React from "react";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import PageSignature from "@/components/layout/PageSignature";
import InfoPanel from "@/components/panels/InfoPanel";
import { View } from "react-native";
import { useT, t as tStatic } from "@/i18n";


const csvFields = ['todoId', 'title', 'note', 'completed', 'completedAt', 'updatedAt'];


async function writeAndShare(filename, contents, mimeType, uti) {
    const fileUri = FileSystem.documentDirectory + filename;
    await FileSystem.writeAsStringAsync(fileUri, contents, { encoding: FileSystem.EncodingType.UTF8 });
    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType, dialogTitle: tStatic("exportPage.shareDialog"), UTI: uti });
    } else {
        alert(tStatic("exportPage.savedTo", { path: fileUri }));
    }
}


const handleExportCsv = async (todos) => {
    try {
        const data = (todos || []).map(t => ({
            todoId: t.todoId,
            title: t.title || '',
            note: t.note || '',
            completed: t.completed ? 'yes' : 'no',
            completedAt: t.completedAt || '',
            updatedAt: t.updatedAt,
        }));
        const csvText = Papa.unparse({ fields: csvFields, data });
        await writeAndShare('appboiler-todos.csv', csvText, 'text/csv', 'public.comma-separated-values-text');
    } catch (err) {
        alert(tStatic("exportPage.failed", { error: err.message }));
    }
};


export default function EditExportScreen() {

    const todos = useSelector(state => state.todos.todoList) || [];
    const { t } = useT();

    return (
        <PageSignature heading={t("exportPage.title")}>
            <View className="py-10 bg-white">
                <InfoPanel text={[
                    t("exportPage.description"),
                ]} />
                <View className="px-4 pt-4 pb-10">
                    <Button pill title={t("exportPage.button")}
                        onPress={() => handleExportCsv(todos)} />
                </View>
            </View>
        </PageSignature>
    );
}
