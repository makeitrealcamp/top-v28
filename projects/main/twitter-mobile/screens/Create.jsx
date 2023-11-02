import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Button, Image, TextInput, View } from 'react-native';

import globalStyles from '../App.styles';
import TouchButton from '../components/TouchButton';
import useTweets from '../domain/useTweets';

export default function Create({ navigation }) {
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const {
    actions: { create },
  } = useTweets();

  async function onSubmit() {
    const formData = new FormData();

    formData.append('content', content);
    if (selectedImage) {
      const uri = selectedImage.uri;
      const name = uri.split('/').pop();
      const type = uri.split('.').pop();

      formData.append('photo', {
        uri,
        type: `image/${type}`,
        size: selectedImage.fileSize,
        name,
      });
    }

    await create(formData);
    setContent('');
    setSelectedImage(null);
    navigation.navigate('List');
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 0.1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0]);
    } else {
      alert('You did not select any image.');
    }
  };

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
        {selectedImage && (
          <Image
            source={{ uri: selectedImage?.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}

        <Button
          title="Pick an image from camera roll"
          onPress={pickImageAsync}
        />
        <TouchButton title="Tweet" onPress={onSubmit} />
      </View>
    </View>
  );
}
