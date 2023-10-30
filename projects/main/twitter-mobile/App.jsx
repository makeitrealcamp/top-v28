import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Welcome from './screens/Welcome';
import SignIn from './screens/SignIn';
import SignUp from './screens/SignUp';
import Home from './screens/Home';
import Create from './screens/Create';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <SignIn />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
