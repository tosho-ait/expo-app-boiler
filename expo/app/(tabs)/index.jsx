import { Pressable, Text, View } from 'react-native';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/layout/ParallaxScrollView";
import PanelFullWhite from "@/components/panels/PanelFullWhite";
import { saveTodo, deleteTodo } from "@/redux/action";
import { COLORS } from "@/lib/colors";


function TodoRow({ todo }) {
    const dispatch = useDispatch();

    const toggle = () => {
        dispatch(saveTodo({
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : null,
        }));
    };

    const remove = () => dispatch(deleteTodo(todo.todoId));

    return (
        <View className="flex-row items-center py-3 border-b border-gray-100">
            <Pressable onPress={toggle} className="pr-3">
                <Ionicons
                    name={todo.completed ? "checkbox" : "square-outline"}
                    size={26}
                    color={todo.completed ? "#38bdf8" : "#94a3b8"}
                />
            </Pressable>
            <Pressable className="flex-1" onPress={() => router.push(`/todo-edit?id=${todo.todoId}`)}>
                <Text className={"text-base " + (todo.completed ? "line-through text-gray-400" : "text-gray-800")}>
                    {todo.title || "Untitled"}
                </Text>
                {!!todo.note && (
                    <Text className="text-sm text-gray-500 mt-0.5" numberOfLines={1}>
                        {todo.note}
                    </Text>
                )}
            </Pressable>
            <Pressable onPress={remove} className="p-2">
                <Ionicons name="trash-outline" size={20} color="#94a3b8" />
            </Pressable>
        </View>
    );
}


function EmptyState() {
    return (
        <View className="items-center py-16">
            <Ionicons name="checkbox-outline" size={64} color="#cbd5e1" />
            <Text className="text-gray-500 mt-4 text-lg">No todos yet</Text>
            <Text className="text-gray-400 mt-1 text-sm">Tap + to add one</Text>
        </View>
    );
}


export default function HomeScreen() {
    const todos = useSelector(state => state.todos.todos) || [];

    return (
        <ParallaxScrollView>
            <View className="flex pt-4 pb-40">
                <View className="px-5 pt-8 pb-3">
                    <Text className="text-gray-600 text-2xl font-semibold">Your Todos</Text>
                </View>
                <PanelFullWhite>
                    {todos.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <View>
                            {todos.map(t => <TodoRow key={t.todoId} todo={t} />)}
                        </View>
                    )}
                </PanelFullWhite>
            </View>
        </ParallaxScrollView>
    );
}
