// @ts-nocheck
import React, { useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import InputString from "@/components/input/InputString";
import InputNote from "@/components/input/InputNote";
import Button from "@/components/ui/Button";
import ModalHeader from "@/components/ui/ModalHeader";
import { saveTodo, deleteTodo } from "@/redux/action";
import { generateUUID } from "@/lib/miscUtil";


export default function TodoEditScreen() {
    const dispatch = useDispatch();
    const { id } = useLocalSearchParams<{ id?: string }>();

    const existing = useSelector(state => (state.todos.todoList || []).find(t => t.todoId === id));

    const [title, setTitle] = useState(existing?.title || "");
    const [note, setNote] = useState(existing?.note || "");

    const isNew = !existing;

    const onSave = () => {
        const todoId = existing?.todoId || generateUUID();
        dispatch(saveTodo({
            todoId,
            title: title.trim(),
            note: note?.trim() || "",
            completed: existing?.completed || false,
            completedAt: existing?.completedAt || null,
        }));
        router.back();
    };

    const onDelete = () => {
        if (existing) dispatch(deleteTodo(existing.todoId));
        router.back();
    };

    return (
        <View className="flex-1 bg-white">
            <ModalHeader
                title={isNew ? "New Todo" : "Edit Todo"}
                onClose={() => router.back()}
            />
            <ScrollView className="flex-1 px-5 pt-4">
                <View className="gap-4">
                    <InputString
                        label="Title"
                        value={title}
                        onChange={setTitle}
                    />
                    <InputNote
                        note={note}
                        setNote={setNote}
                    />
                </View>

                <View className="mt-8 gap-3">
                    <Button
                        blue
                        title="Save"
                        isDisabled={!title.trim()}
                        onPress={onSave}
                    />
                    {!isNew && (
                        <Button
                            link
                            title="Delete"
                            confirm={{
                                title: "Delete Todo",
                                text: "Are you sure?",
                                buttonLabel: "Delete",
                            }}
                            onPress={onDelete}
                        />
                    )}
                </View>
            </ScrollView>
        </View>
    );
}
