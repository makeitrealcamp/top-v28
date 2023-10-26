import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';

import Welcome from './screens/Welcome.js';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Welcome />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}
