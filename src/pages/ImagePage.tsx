import React from 'react';
import {StyleSheet, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

type Props = {
  route: any;
  navigation: any;
};

const ImagePage = (props: Props) => {
  const {imageData} = props.route.params;

  return (
    <SafeAreaView style={styles.container}>
      {imageData ? (
        <Image
          style={styles.image}
          source={{
            uri: imageData,
          }}
        />
      ) : null}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default ImagePage;
