import { View } from 'react-native';

import globalStyles from '../App.styles.js';
import TouchButton from '../components/TouchButton.jsx';

export default function Profile({ navigation }) {
  return (
    <View
      style={[globalStyles.container, globalStyles.top, { paddingTop: 12 }]}
    >
      <View style={globalStyles.wrapper}>
        <TouchButton
          title="Sign Out"
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'Welcome' }],
            })
          }
        />
      </View>
    </View>
  );
}
