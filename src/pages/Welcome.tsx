import React from "react";
import { SafeAreaView, Text, View, Image, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/core";
import { Feather } from "@expo/vector-icons";

import waterImg from "../assets/watering.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";


export function Welcome() {
  const navigaton = useNavigation();

  function handleStart() {
    navigaton.navigate("UserIdentification");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'} 
          suas plantas de {'\n'} 
          forma fácil
        </Text>

        <Image source={waterImg} style={styles.image} resizeMode="contain" />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas {'\n'} 
          plantas. Nós cuidamos de lembrar você {'\n'} 
          sempre que precisar.
        </Text>

        <TouchableOpacity style={styles.button} onPress={handleStart} activeOpacity={0.7}>
            <Feather name="chevron-right" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20
  },
  title: {
    fontSize: 28,
    textAlign: "center",
    color: colors.heading,
    marginTop: 38,
    fontFamily: fonts.heading,
    lineHeight: 34
  },
  subtitle: {
    textAlign: "center",
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.text
  },
  image: {
    height: Dimensions.get("window").width * 0.7
  },
  button: {
    backgroundColor: colors.green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    marginBottom: 10,
    height: 56,
    width: 56
  },
  buttonIcon : {
    color: colors.white,
    fontSize: 28
  }
});