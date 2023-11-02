import { useState } from 'react';
import { TextInput, View } from 'react-native';

import globalStyles from '../App.styles';
import TouchButton from '../components/TouchButton';
import useTweets from '../domain/useTweets';

export default function Create({ navigation }) {
  const [content, setContent] = useState('');
  const {
    actions: { create },
  } = useTweets();

  async function onSubmit() {
    await create({ content });
    setContent('');
    navigation.navigate('List');
  }
  return (
    <View
      style={[globalStyles.container, globalStyles.top, { paddingTop: 12 }]}
    >
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
          onChangeText={(text) => setContent(text)}
          value={content}
        />
        <TouchButton title="Tweet" onPress={onSubmit} />
      </View>
    </View>
  );
}
