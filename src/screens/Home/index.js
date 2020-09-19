import React, { Component } from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet
} from 'react-native';
//import { Marker } from 'react-native-svg';
import MapView, { Marker } from 'react-native-maps';

export default function Home() {

      return (
          <View style = {{ flex: 1 }}>

            <MapView
                initialRegion={{
                    latitude: -15.9897883,
                    longitude: -48.0464073,
                    latitudeDelta: 0.0042,
                    longitudeDelta: 0.0031,
                }}
                style={styles.MapView}
            >
                <MapView.Marker
                    coordinate={{
                        latitude: -15.9897883,
                        longitude: -48.0464073
                    }}
                />
            </MapView>
          </View>    
      );
  };

  const styles = StyleSheet.create({
      MapView: {
          flex: 1,
          width: "100%",
          padding: 32
      }
  })