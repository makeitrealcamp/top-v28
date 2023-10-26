import { Image, Text, View } from 'react-native';

import globalStyles from '../App.styles.js';
import TouchButton from '../components/TouchButton.jsx';
import Separator from '../components/Separator.jsx';

export default function Welcome() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={[globalStyles.logo.big, globalStyles.space]}
      />
      <Text style={globalStyles.h1}>Welcome to Twitter</Text>
      <Text style={globalStyles.space}>Do you want to create an account?</Text>
      <View style={[globalStyles.wrapper]}>
        <TouchButton title="Sign Up" />
      </View>
      <View style={[globalStyles.wrapper, globalStyles.space]}>
        <Separator text="or" />
      </View>
      <Text style={globalStyles.space}>Do you already have an account?</Text>
      <View style={[globalStyles.wrapper]}>
        <TouchButton title="Sign In" variant="secondary" />
      </View>
    </View>
  );
}
