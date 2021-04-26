import React, { useState } from "react";
import { 
    SafeAreaView, 
    StyleSheet, 
    Text,
    TextInput, 
    View, 
    KeyboardAvoidingView, 
    Platform, 
    TouchableWithoutFeedback, 
    Keyboard, 
    Alert 
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Button } from "../components/Button";

import colors from "../styles/colors";
import fonts from "../styles/fonts";

export function UserIdentification() {
    const [name, setName] = useState<string>();

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const navigation = useNavigation();

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!name);
    };
    
    function handleInputFocus() {
        setIsFocused(true);
    };
    
    function handleInputChange(value: string) {
        setIsFilled(!!value);
        setName(value);
    };
    
    async function handleSubmit() {
        if(!name) {
            return Alert.alert("Digite seu nome","Me diz como posso chamar você. 😊");
        };

        try {
            await AsyncStorage.setItem("@plantmanager:user", name);
            navigation.navigate("Confirmation", {
                title: "Prontinho",
                subtitle: "Agora vamos começar a cuidar das suas \n plantinhas com muito cuidado.",
                buttonTitle: "Começar",
                icon: "wink",
                nextScreen: "PlantSelect"
            });
        }catch{
            Alert.alert("Não foi possivel salvar seu nome. 😪");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView style={styles.container} behavior={Platform.OS == "ios" ? "padding" : "height"}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😊' : '😄'}
                                </Text>
                                <Text style={styles.title} >Como podemos {"\n"} chamar você?</Text>
                            </View>
                            <TextInput
                                style={[
                                    styles.input, 
                                    (isFocused || isFilled) && {borderColor: colors.green}
                                ]}
                                placeholder="Digite seu nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={handleInputChange}
                            />
                            <View style={styles.footer}>
                                <Button onPress={handleSubmit} title="Confirmar"/>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        justifyContent: "space-around"
    },
    content: {
        flex: 1,
        width: "100%"
    },
    emoji: {
        fontSize: 44
    },
    title: {
        fontSize: 24,
        lineHeight: 32,
        textAlign: "center",
        fontFamily: fonts.heading,
        color: colors.heading,
        marginTop: 20
    },
    form: {
        flex: 1,
        justifyContent: "center",
        paddingHorizontal: 54,
        alignItems: "center"
    },
    header: {
        alignItems: "center",
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: "100%",
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: "center"
    },
    footer: {
        marginTop: 40,
        width: "100%",
        paddingHorizontal: 20
    }
});