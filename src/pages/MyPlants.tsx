import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View, FlatList, Alert} from "react-native";
import { Header } from "../components/Header";
import { loadPlant, PlantProps, removePlant } from "../libs/storage";
import { formatDistance } from "date-fns";
import { pt } from "date-fns/locale";

import waterdrop from "../assets/waterdrop.png";
import colors from "../styles/colors";
import fonts from "../styles/fonts";
import { PlantCardSecondary } from "../components/PlantCardSecondary";
import { Load } from "../components/Load";
import { Popup } from "../components/Popup";

export function MyPlants() {
    const [myPlants, setMyPLants] = useState<PlantProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [nextWaterd, setNextWaterd] = useState<string>();
    const [deletePopupOpen, setDeletePopupOpen] = useState(false);
    const [plantDelete, setPlantDelete] = useState<PlantProps>(myPlants[0]);

    function handleRemove(plant: PlantProps) {
        setDeletePopupOpen(true);
        setPlantDelete(plant);
    };

    function handleCancelDelete() {
        setDeletePopupOpen(false);
    };

    async function handleDelete(plant: PlantProps) {
        try {
            await removePlant(String(plant.id))
            setMyPLants(oldData => oldData.filter((item) => item.id !== plant.id));
            setDeletePopupOpen(false);
        } catch (error) {
            Alert.alert("Não foi possivel remover", "Ocorreu um erro ao tentar remover sua planta tente novamente ou entre em contato com a gente. 😥");
        };
    };

    useEffect(() => {
        async function loadStorageData() {
            const plantsStoraged = await loadPlant();
            const nextTime = formatDistance(
                new Date(plantsStoraged[0].dateTimeNotification).getTime(),
                new Date().getTime(),
                {locale: pt}
            );

            setMyPLants(plantsStoraged);
            setNextWaterd(`Não esqueça de regar a ${plantsStoraged[0].name} daqui a ${nextTime}`);
            setLoading(false);
        };

        loadStorageData();
    }, []);

    if(loading) {
        return <Load />
    };

    return (
        <View style={styles.screen}>
            {deletePopupOpen && (<Popup data={plantDelete} handleCancel={handleCancelDelete} handleDelete={() => handleDelete(plantDelete)}/>)}
            <View style={styles.container}>
                <Header/>
                <View style={styles.spotlight}>
                    <Image source={waterdrop} style={styles.spotlightImage}/>
                    <Text style={styles.spotlightText}>
                        {nextWaterd}
                    </Text>
                </View>

                <View style={styles.plants}>
                    <Text style={styles.plantsTitle}>Próximas regadas</Text>
                    <FlatList 
                        data={myPlants}
                        keyExtractor={(item) => String(item.id)}
                        renderItem={({item}) => <PlantCardSecondary handleRemove={() => {handleRemove(item)}} data={item}/>}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 30,
        backgroundColor: colors.background,
    },
    spotlight: {
        backgroundColor: colors.blue_light,
        paddingHorizontal: 20,
        borderRadius: 20,
        height: 110,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    spotlightImage: {
        width: 60,
        height: 60
    },
    spotlightText: {
        flex: 1,
        color: colors.blue,
        paddingHorizontal: 20,
        textAlign: "justify",
        fontFamily: fonts.text
    },
    plants: {
        flex: 1,
        width: "100%"
    },
    plantsTitle: {
        fontSize: 24,
        fontFamily: fonts.heading,
        color: colors.heading,
        marginVertical: 20
    }
});