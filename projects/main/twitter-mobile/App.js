import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Welcome from './screens/Welcome.js';
import SignIn from './screens/SignIn.js';
import SignUp from './screens/SignUp.js';
import Home from './screens/Home.js';
import Create from './screens/Create.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Welcome />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
