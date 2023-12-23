import {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import usePowerSaveMode from '../hooks/usePowerSaveMode';

const BatterySaver = () => {
  const {isPowerSaveMode, error} = usePowerSaveMode();
  const [batteryInfo, setBatteryInfo] = useState<string>(
    isPowerSaveMode ? 'On' : 'Off',
  );

  useEffect(() => {
    setBatteryInfo(isPowerSaveMode ? 'On' : 'Off');
  }, [isPowerSaveMode]);

  return (
    <View style={[styles.container, StyleSheet.absoluteFill]}>
      <Text style={styles.title}>Battery Saver Mode : {batteryInfo}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    height: 50,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
  },
});

export default BatterySaver;
