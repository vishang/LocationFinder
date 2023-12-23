import {useEffect, useState} from 'react';
import {NativeModules} from 'react-native';

const {BatteryModule} = NativeModules;

//Custom Hook to Fetch BatteryModule Data
const usePowerSaveMode = () => {
  const [isPowerSaveMode, setIsPowerSaveMode] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPowerSaveMode = async () => {
      try {
        const result = await new Promise((resolve, reject) => {
          BatteryModule.isPowerSaveModeEnabled(resolve, reject);
        });

        setIsPowerSaveMode(result);
      } catch (err) {
        setError(err);
      }
    };

    fetchPowerSaveMode();
  }, []);

  return {isPowerSaveMode, error};
};

export default usePowerSaveMode;
