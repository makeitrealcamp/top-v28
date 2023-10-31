import { View } from 'react-native';

import Tweet from '../components/Tweet';

import globalStyles from '../App.styles.js';

export default function Post({ route }) {
  const { item } = route.params;
  return (
    <View style={[globalStyles.container, globalStyles.top, { paddingTop: 4 }]}>
      <Tweet
        content={item.content}
        createdAt={item.createdAt}
        user={item.user}
      />
    </View>
  );
}
