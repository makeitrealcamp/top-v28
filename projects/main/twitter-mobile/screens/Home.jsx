import { EvilIcons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import List from './List.jsx';
import Create from './Create.jsx';
import Profile from './Profile.jsx';

import globalStyles from '../App.styles.js';

const Tab = createBottomTabNavigator();

const LogoTitle = () => (
  <Image
    source={require('../assets/logo.png')}
    style={globalStyles.logo.small}
  />
);

export default function Home({ navigation }) {
  useEffect(() => {
    navigation.setOptions({
      headerTitle: (props) => <LogoTitle {...props} />,
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let name;
          if (route.name === 'List') {
            name = 'navicon';
          } else if (route.name === 'Create') {
            name = 'plus';
          } else if (route.name === 'Profile') {
            name = 'user';
          }
          return (
            <EvilIcons
              name={name}
              size={32}
              color={focused ? globalStyles.colors.primary : 'black'}
            />
          );
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="List" component={List} />
      <Tab.Screen name="Create" component={Create} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
