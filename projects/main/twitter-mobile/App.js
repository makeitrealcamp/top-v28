import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Welcome from './screens/Welcome.js';
import SignIn from './screens/SignIn.js';
import SignUp from './screens/SignUp.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignUp />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
