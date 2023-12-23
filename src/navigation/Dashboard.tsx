// MapComponent.js
import React, {useEffect, useRef, useState} from 'react';
import {Alert, Image, NativeEventEmitter, StyleSheet, View} from 'react-native';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {images} from '../utils/constants/assets';
import {NativeModules} from 'react-native';
import usePowerSaveMode from '../hooks/usePowerSaveMode';
import BatterySaver from '../components/BatterySaver';

const Dashboard = () => {
  const [location, setLocation] = useState({latitude: 0, longitude: 0});
  const mapRef = useRef(null);
  const [coordinates, setCoordinates] = useState([
    {latitude: 28.442106540365955, longitude: 77.07741001001594},
    {latitude: 28.444983826251566, longitude: 77.08159425607937},
    {latitude: 28.447087497256007, longitude: 77.07965233675387},
  ]);
  const [heading, setHeading] = useState(0);

  //Mocking location
  //   useEffect(() => {
  //     const updateLocation = () => {
  //       const newCoordinate = {
  //         latitude: 28.442106540365955 + Math.random() * 0.02,
  //         longitude: 77.07741001001594 + Math.random() * 0.02,
  //       };

  //       if (coordinates.length >= 2) {
  //         const lastCoordinate = coordinates[coordinates.length - 2];
  //         const dx = newCoordinate.longitude - lastCoordinate.latitude;
  //         const dy = newCoordinate.longitude - lastCoordinate.longitude;
  //         const newHeading = Math.atan2(dy, dx) * (100 / Math.PI);
  //         setHeading(newHeading);
  //       }

  //       setCoordinates(prevCoordinates => [...prevCoordinates, newCoordinate]);
  //     };

  //     const timerId = setInterval(updateLocation, 5000);
  //     return () => {
  //       clearInterval(timerId);
  //     };
  //   }, [coordinates]);

  if (coordinates.length === 0) {
    return null;
  }

  const getMarkerRotation = (markerIndex: any) => {
    if (markerIndex >= 1) {
      const lastCoordinate = coordinates[markerIndex - 1];
      const currentCoordinate = coordinates[markerIndex];
      const dx = currentCoordinate.latitude - lastCoordinate.latitude;
      const dy = currentCoordinate.longitude - lastCoordinate.longitude;
      const rotation = Math.atan2(dy, dx) * (100 / Math.PI);
      return rotation;
    }
    return 0;
  };

  return (
    <View style={[StyleSheet.absoluteFillObject]}>
      <BatterySaver />
      <View />
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordinates[0]?.latitude,
          longitude: coordinates[0]?.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        ref={mapRef}>
        <Polyline
          coordinates={coordinates}
          strokeColor="#000"
          strokeWidth={1.5}
        />
        {coordinates.map((coord, index) => {
          let adjustedCoord = {...coord};

          if (index > 0) {
            // Calculate a point slightly behind the current coordinate
            const previousCoord = coordinates[index - 1];
            const dx = coord.longitude - previousCoord.longitude;
            const dy = coord.latitude - previousCoord.latitude;
            const length = Math.sqrt(dx * dx + dy * dy);

            const scale = (length - 0.0005) / length;
            adjustedCoord = {
              latitude: previousCoord.latitude + scale * dy,
              longitude: previousCoord.longitude + scale * dx,
            };
          }
          return (
            <Marker
              key={index}
              coordinate={adjustedCoord}
              title={`Marker ${index + 1}`}
              animateToRegion={adjustedCoord}
              anchor={{x: 0.5, y: 0.5}}
              rotation={getMarkerRotation(index)}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  transform: [{rotate: `${getMarkerRotation(index)}deg`}],
                }}
                source={images.triangle}
              />
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
});

export default Dashboard;
