import React, { useCallback, useState } from "react";
import {
  useFocusEffect,
  useRoute,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { View } from "react-native";

import MapView, { Marker, MapEvent } from "react-native-maps";
import { OccurrenceAlert } from "./styles";

import LoggedInModal from "../../components/LoggedInModal";
import AsyncStorage from "@react-native-community/async-storage";

import { getUser } from "../../services/users";
import { getAllUsersOccurrences } from "../../services/occurrences";

type ParamList = {
  params: {
    showReportModal: boolean;
  };
};

interface Occurrence {
  id_occurrence: number;
  location: [number, number];
  gun: string;
  occurrence_date_time: string;
  register_date_time: string;
  occurrence_type: string;
  physical_aggression: boolean;
  police_report: boolean;
  victim: boolean;
}

const Home = () => {
  const route = useRoute<RouteProp<ParamList, "params">>();
  const navigation = useNavigation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [occurrences, setOccurrences] = useState<Occurrence[]>([]);

  useFocusEffect(
    useCallback(() => {
      setIsReporting(false);
    }, [])
  );

  useFocusEffect(() => {
    if (route.params) {
      setIsModalOpen(route.params.showReportModal);
    }
  });

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

  useFocusEffect(
    useCallback(() => {
      getAllUsersOccurrences().then((response) => {
        setOccurrences(response.body);
      });
    }, [])
  );

  // Function to use on modal closed.
  const handleClosedModal = () => {
    setIsModalOpen(false);
    route.params = undefined;
  };

  const handleReportingCoordinatesOnMap = (e: MapEvent) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;

    if (isReporting) {
      setIsReporting(false);
      navigation.navigate("Occurrence", { latitude, longitude });
    }
  };

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
        style={{ flex: 1 }}
        onPress={(e) => handleReportingCoordinatesOnMap(e)}
      >
        {occurrences?.map((occurrence: Occurrence) => {
          return (
            <Marker
              key={occurrence.id_occurrence}
              coordinate={{
                latitude: occurrence.location[0],
                longitude: occurrence.location[1],
              }}
            />
          );
        })}
      </MapView>
      <OccurrenceAlert
        show={isModalOpen && isLogged}
        title="Reportar Ocorrência"
        message="Toque para selecionar o local no mapa com o marcador"
        showConfirmButton={true}
        confirmText="Entendido"
        onConfirmPressed={() => {
          handleClosedModal();
          setIsReporting(true);
        }}
        onDismiss={() => handleClosedModal()}
      />
    </View>
  );
};

export default Home;
