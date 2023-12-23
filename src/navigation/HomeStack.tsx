import {createStackNavigator} from '@react-navigation/stack';
import Dashboard from './Dashboard';

const Stack = createStackNavigator();
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  );
};

export default HomeStack;
