import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Create from './screens/Create';
import Post from './screens/Post';
import UserContext, { UserProvider } from './containers/UserContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <UserContext.Consumer>
        {({ user }) => (
          <NavigationContainer>
            <Stack.Navigator>
              {user ? (
                <Stack.Group>
                  <Stack.Screen name="Home" component={Home} />
                  <Stack.Screen name="Create" component={Create} />
                  <Stack.Screen name="Post" component={Post} />
                </Stack.Group>
              ) : (
                <Stack.Group>
                  <Stack.Screen name="Sign In" component={SignIn} />
                  <Stack.Screen name="Sign Up" component={SignUp} />
                </Stack.Group>
              )}
              <Stack.Group>
                <Stack.Screen name="Welcome" component={Welcome} />
              </Stack.Group>
            </Stack.Navigator>
            <StatusBar style="auto" />
          </NavigationContainer>
        )}
      </UserContext.Consumer>
    </UserProvider>
  );
}
