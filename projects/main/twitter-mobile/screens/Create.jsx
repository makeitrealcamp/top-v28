import { TextInput, View } from 'react-native';

import globalStyles from '../App.styles';
import TouchButton from '../components/TouchButton';

export default function Create() {
  return (
    <View style={[globalStyles.container, globalStyles.top]}>
      <View style={globalStyles.wrapper}>
        <TextInput
          style={[
            globalStyles.input,
            globalStyles.space,
            { height: 128, maxHeight: 128 },
          ]}
          placeholder="What's happening?"
          multiline={true}
          numberOfLines={4}
        />
        <TouchButton title="Tweet" />
      </View>
    </View>
  );
}
