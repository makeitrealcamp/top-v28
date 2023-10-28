import { FlatList, ScrollView, Text, View } from 'react-native';
import Tweet from '../components/Tweet';

const data = [
  {
    id: '1',
    content: 'Aliquip consectetur velit fugiat sunt nulla veniam nostrud.',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '2',
    content:
      'Amet dolor in ut ea ullamco anim nostrud cillum non sint aliqua est minim ut. Incididunt adipisicing anim ut nulla magna. Minim velit voluptate dolore est laborum aliqua anim. Proident id aute laborum aliqua incididunt consectetur Lorem duis consequat veniam nostrud.',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '3',
    content:
      'Aliqua minim id nisi voluptate consectetur nostrud. Duis et dolore adipisicing deserunt esse consequat tempor ad fugiat aliqua aliquip anim. Cillum duis occaecat adipisicing ea ut velit aute.',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '4',
    content:
      'Fugiat deserunt est elit non duis tempor cupidatat laboris laboris dolore mollit adipisicing. Voluptate irure adipisicing quis eiusmod do duis do elit cupidatat consectetur.',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '5',
    content: 'Hello world 2',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '6',
    content: 'Hello world 2',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
  {
    id: '7',
    content: 'Hello world 2',
    createdAt: '2023-10-27',
    user: {
      username: 'johndoe',
      name: 'John Doe',
    },
  },
];

export default function Home() {
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Tweet
            content={item.content}
            createdAt={item.createdAt}
            user={item.user}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
