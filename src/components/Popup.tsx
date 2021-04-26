import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { SvgFromUri } from "react-native-svg";
import { RectButton } from "react-native-gesture-handler";
import colors from "../styles/colors";
import fonts from "../styles/fonts";

interface PopupProps {
    data: {
        name: string;
        photo: string;
    };

    handleDelete: () => void;
    handleCancel: () => void;
}

export function Popup({data, handleCancel, handleDelete}: PopupProps) {
    return (
        <View style={styles.background}>
            <View style={styles.content}>
                <SvgFromUri uri={data.photo} width={120} height={120} style={styles.plantImage}/>
                <Text style={styles.greeting}>Deseja mesmo deletar sua</Text>
                <Text style={styles.plantName}>{data.name}?</Text>
                <View style={styles.buttons}>
                    <RectButton onPress={handleCancel} style={styles.buttonCancel}><Text style={styles.buttonCancelText}>Cancelar</Text></RectButton>
                    <RectButton onPress={handleDelete} style={styles.buttonDelete}><Text style={styles.buttonDeleteText}>Deletar</Text></RectButton>
                </View>
            </View> 
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        position: "absolute",
        zIndex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    content: {
        width: "80%",
        height: 320,
        backgroundColor: colors.background,
        borderRadius: 20,
        padding: 32,
        alignItems: "center"
    },
    plantImage: {
        backgroundColor: colors.shape,
        borderRadius: 20
    },
    greeting: {
        marginTop: 16,
        fontSize: 17,
        fontFamily: fonts.text,
        color: colors.heading
    },
    plantName: {
        fontSize: 17,
        fontFamily: fonts.heading,
        color: colors.heading
    },
    buttons: {
        flexDirection: "row",
        marginTop: 24
    },
    buttonCancel: {
        width: 96,
        height: 48,
        backgroundColor: colors.shape,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderRadius: 12
    },
    buttonCancelText: {
        color: colors.heading,
        fontFamily: fonts.text,
        fontSize: 15
    },
    buttonDelete: {
        width: 96,
        height: 48,
        color: colors.heading,
        backgroundColor: colors.shape,
        alignItems: "center",
        justifyContent: "center",
        marginHorizontal: 5,
        borderRadius: 12
    },
    buttonDeleteText: {
        color: colors.red,
        fontFamily: fonts.text,
        fontSize: 15
    },
});