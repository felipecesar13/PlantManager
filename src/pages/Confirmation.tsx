import { useNavigation } from "@react-navigation/core";
import { useRoute } from "@react-navigation/native";
import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface Params {
    title: string,
    subtitle: string,
    buttonTitle: string,
    icon: "smile" | "hug" | "wink",
    nextScreen: string
}

const emojis = {
    hug: "🤗",
    smile: "😁",
    wink: "😉"
}

export function Confirmation() {
    const navigation = useNavigation();
    const routes = useRoute();

    const {title, subtitle, buttonTitle, icon, nextScreen} = routes.params as Params;

    function handleMoveOn() {
        navigation.navigate(nextScreen);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>
                    {emojis[icon]}
                </Text>
                <Text style={styles.title}>
                    {title}
                </Text>
                <Text style={styles.subtitle}>
                    {subtitle}
                </Text>
                <View style={styles.footer}>
                    <Button title={buttonTitle} onPress={handleMoveOn} />
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        padding: 30
    },
    emoji: {
        fontSize: 84
    },
    title: {
        fontSize: 24,
        fontFamily: fonts.heading,
        textAlign: "center",
        color: colors.heading,
        marginTop: 35,
        lineHeight: 38
    },
    subtitle: {
        fontSize: 18,
        fontFamily: fonts.text,
        textAlign: "center",
        color: colors.heading,
        paddingVertical: 10,
    },
    footer: {
        width: "100%",
        paddingHorizontal: 50,
        marginTop: 35
    }
});