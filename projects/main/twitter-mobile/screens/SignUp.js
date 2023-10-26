import { Image, Text, TextInput, View } from 'react-native';

import globalStyles from '../App.styles.js';
import TouchButton from '../components/TouchButton.jsx';
import Separator from '../components/Separator.jsx';

export default function SignUp() {
  return (
    <View style={globalStyles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={[globalStyles.logo.big, globalStyles.space]}
      />
      <Text style={globalStyles.h1}>Welcome</Text>

      <View style={[globalStyles.wrapper]}>
        <TextInput
          style={[globalStyles.input, globalStyles.space]}
          autoComplete="name"
          placeholder="Name"
        />
        <TextInput
          style={[globalStyles.input, globalStyles.space]}
          autoCapitalize="none"
          autoComplete="username"
          placeholder="Username"
        />
        <TextInput
          style={[globalStyles.input, globalStyles.space]}
          autoCapitalize="none"
          autoComplete="email"
          placeholder="Email"
        />
        <TextInput
          style={[globalStyles.input, globalStyles.space]}
          secureTextEntry
          placeholder="Password"
        />
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
