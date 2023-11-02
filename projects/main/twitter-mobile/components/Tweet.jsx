import { formatRelative } from 'date-fns';
import { EvilIcons } from '@expo/vector-icons';
import { Dimensions, Image, Text, View } from 'react-native';

import styles from './Tweet.styles';

const IconGroup = ({ name, count }) => (
  <View style={{ flexDirection: 'row' }}>
    <EvilIcons name={name} size={20} color="black" />
    {count >= 0 && <Text>{count}</Text>}
  </View>
);

export default function Tweet({ content, createdAt, user }) {
  const deviceWith = Dimensions.get('window').width;
  const photoWidth = 64;
  const photoHeight = 64;

  return (
    <View style={styles.container}>
      <View
        style={{
          width: photoWidth,
          height: photoHeight,
        }}
      >
        <Image
          source={{
            uri: user.profilePhoto ?? 'https://placehold.co/48/png',
          }}
          style={styles.photo}
        />
      </View>
      <View style={{ width: deviceWith - 96 }}>
        <View style={styles.header}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={{ color: 'gray' }}>@{user.username}</Text>
          <Text style={{ color: 'gray' }}>
            {' '}
            · {formatRelative(new Date(createdAt), new Date())}
          </Text>
        </View>
        <Text style={{ lineHeight: 20 }}>{content}</Text>
        <View style={styles.iconsContainer}>
          <IconGroup name="comment" count={0} />
          <IconGroup name="retweet" count={0} />
          <IconGroup name="heart" count={0} />
          <IconGroup name="chart" count={0} />
          <IconGroup name="share-apple" />
        </View>
      </View>
    </View>
  );
}
