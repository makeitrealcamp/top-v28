import { FlatList, TouchableOpacity, View } from 'react-native';

import Tweet from '../components/Tweet';

import globalStyles from '../App.styles.js';
import useTweets from '../domain/useTweets.js';

export default function List({ navigation }) {
  const { data = [] } = useTweets();
  return (
    <View style={[globalStyles.container, globalStyles.top]}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Post', {
                id: item.id,
              })
            }
          >
            <Tweet
              content={item.content}
              createdAt={item.createdAt}
              photo={item.photo}
              user={item.user}
            />
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
