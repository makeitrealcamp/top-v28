import { useContext } from 'react';
import { View } from 'react-native';

import globalStyles from '../App.styles.js';

import { clearSession } from '../api/session.js';
import TouchButton from '../components/TouchButton.jsx';
import UserContext from '../containers/UserContext/index.jsx';

export default function Profile({ navigation }) {
  const { setUser } = useContext(UserContext);
  async function onSignOut() {
    await clearSession();
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{ name: 'Welcome' }],
    });
  }

  return (
    <View
      style={[globalStyles.container, globalStyles.top, { paddingTop: 12 }]}
    >
      <View style={globalStyles.wrapper}>
        <TouchButton title="Sign Out" onPress={onSignOut} />
      </View>
    </View>
  );
}
