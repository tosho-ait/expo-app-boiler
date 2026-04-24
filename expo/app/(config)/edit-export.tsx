import React from "react";
import Button from "@/components/ui/Button";
import { useSelector } from "react-redux";
import Papa from 'papaparse';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import PageSignature from "@/components/layout/PageSignature";
import InfoPanel from "@/components/panels/InfoPanel";
import { View } from "react-native";


const csvFields = ['todoId', 'title', 'note', 'completed', 'completedAt', 'updatedAt'];


async function writeAndShare(filename, contents, mimeType, uti) {
    const fileUri = FileSystem.documentDirectory + filename;
    await FileSystem.writeAsStringAsync(fileUri, contents, { encoding: FileSystem.EncodingType.UTF8 });
    if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, { mimeType, dialogTitle: 'Share your export', UTI: uti });
    } else {
        alert('Sharing not available – file saved to: ' + fileUri);
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
        alert('Failed to export CSV: ' + err.message);
    }
};


export default function EditExportScreen() {

    const todos = useSelector(state => state.todos.todoList) || [];

    return (
        <PageSignature heading="Export">
            <View className="py-10 bg-white">
                <InfoPanel text={[
                    "Export your todos as a CSV file.",
                ]} />
                <View className="px-4 pt-4 pb-10">
                    <Button pill title="Export Todos (CSV)"
                        onPress={() => handleExportCsv(todos)} />
                </View>
            </View>
        </PageSignature>
    );
}
