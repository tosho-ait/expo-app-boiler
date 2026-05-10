import { Pressable, Text, View } from 'react-native';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import ParallaxScrollView from "@/components/layout/ParallaxScrollView";
import PanelEmpty from "@/components/panels/PanelEmpty";
import { saveTodo, deleteTodo } from "@/redux/action";
import { useT } from "@/i18n";
import { hapticLight } from "@/lib/hapticUtil";


function TodoRow({ todo, isFirst, isLast }) {
    const dispatch = useDispatch();
    const { t } = useT();

    const toggle = () => {
        hapticLight();
        dispatch(saveTodo({
            ...todo,
            completed: !todo.completed,
            completedAt: !todo.completed ? new Date().toISOString() : null,
        }));
    };

    const remove = () => dispatch(deleteTodo(todo.todoId));

    return (
        <View className={"flex-row items-center px-4 py-3 " + (isLast ? "" : "border-b border-outline-100")}>
            <Pressable onPress={toggle} className="pr-3 active:opacity-60" hitSlop={10}>
                <Ionicons
                    name={todo.completed ? "checkmark-circle" : "ellipse-outline"}
                    size={26}
                    color={todo.completed ? "#34C759" : "#C6C6C8"}
                />
            </Pressable>
            <Pressable className="flex-1 active:opacity-60" onPress={() => router.push(`/todo-edit?id=${todo.todoId}`)}>
                <Text className={
                    "text-body " +
                    (todo.completed ? "line-through text-typography-400" : "text-typography-900")
                }>
                    {todo.title || t("dashboard.untitled")}
                </Text>
                {!!todo.note && (
                    <Text className="text-footnote text-typography-500 mt-0.5" numberOfLines={1}>
                        {todo.note}
                    </Text>
                )}
            </Pressable>
            <Pressable onPress={remove} className="p-2 active:opacity-60" hitSlop={6}>
                <Ionicons name="trash-outline" size={18} color="#8E8E93" />
            </Pressable>
        </View>
    );
}


export default function HomeScreen() {
    const todos = useSelector(state => state.todos.todos) || [];
    const { t } = useT();

    const activeCount = todos.filter(t => !t.completed).length;

    return (
        <ParallaxScrollView>
            <View className="pt-2 pb-32">

                {/* Large title — iOS style */}
                <View className="px-5 pt-4 pb-5">
                    <Text className="text-large-title font-bold text-typography-900">
                        {t("dashboard.yourTodos")}
                    </Text>
                    {todos.length > 0 && (
                        <Text className="text-callout text-typography-500 mt-1">
                            {activeCount === 0
                                ? t("dashboard.allDone")
                                : t("dashboard.tasksRemaining", { count: activeCount })}
                        </Text>
                    )}
                </View>

                {todos.length === 0 ? (
                    <PanelEmpty
                        icon="checkbox-marked-circle-outline"
                        text={t("dashboard.empty")}
                        subtext={t("dashboard.emptyHint")}
                    />
                ) : (
                    <View className="mx-4 bg-background-0 rounded-ios-2xl shadow-ios-card overflow-hidden">
                        {todos.map((todo, i) => (
                            <TodoRow
                                key={todo.todoId}
                                todo={todo}
                                isFirst={i === 0}
                                isLast={i === todos.length - 1}
                            />
                        ))}
                    </View>
                )}
            </View>
        </ParallaxScrollView>
    );
}
