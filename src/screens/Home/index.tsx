import AsyncStorage from "@react-native-community/async-storage";
import {
    useFocusEffect,
    useRoute,
    RouteProp,
    useNavigation,
} from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

import LoggedInModal from "../../components/LoggedInModal";
import { getUser } from "../../services/users";

type ParamList = {
    params: {
        showReportModal: boolean;
    };
};

const Home = () => {
    const route = useRoute<RouteProp<ParamList, "params">>();
    const [isLogged, setIsLogged] = useState(false);

    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            AsyncStorage.getItem("username").then((username) => {
                getUser(username).then((response) => {
                    if (response.status === 200) {
                        setIsLogged(true);
                    } else {
                        setIsLogged(false);
                    }
                });
            });
        }, [route.params?.showReportModal])
    );

    return (
        <View style={{ flex: 1 }}>
            {!isLogged && <LoggedInModal navObject={navigation} />}
            <MapView
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={styles.MapView}
            >
                <Marker
                    coordinate={{
                        latitude: -15.9897883,
                        longitude: -48.0464073,
                    }}
                />
            </MapView>
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    MapView: {
        flex: 1,
        width: "100%",
        padding: 32,
    },
});
