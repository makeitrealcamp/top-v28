import { View } from 'react-native';

import Tweet from '../components/Tweet';

import globalStyles from '../App.styles.js';
import useTweet from '../domain/useTweet.js';

export default function Post({ route }) {
  const { id } = route.params;
  const { data: item } = useTweet({ id });
  return (
    <View style={[globalStyles.container, globalStyles.top, { paddingTop: 4 }]}>
      {item && (
        <Tweet
          content={item.content}
          createdAt={item.createdAt}
          user={item.user}
        />
      )}
    </View>
  );
}
