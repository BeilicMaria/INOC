import React from 'react';
import {StyleSheet, Image, SafeAreaView, View} from 'react-native';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

type Props = {
  route: any;
  navigation: any;
};

const ImagePage = (props: Props) => {
  const {imageData} = props.route.params;
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);
  const rotation = useSharedValue(1);
  const savedRotation = useSharedValue(1);

  /**
   *
   */
  const pinchGesture = Gesture.Pinch()
    .onUpdate(e => {
      scale.value = savedScale.value * e.scale;
    })
    .onEnd(() => {
      savedScale.value = scale.value;
    });

  /**
   *
   */
  const rotationGesture = Gesture.Rotation()
    .onUpdate(e => {
      rotation.value = savedRotation.value + e.rotation;
    })
    .onEnd(() => {
      savedRotation.value = rotation.value;
    });

  /**
   *
   */
  const scaleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{scale: scale.value}],
  }));

  /**
   *
   */
  const rotateAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{rotateZ: `${(rotation.value / Math.PI) * 180}deg`}],
  }));
  return (
    <SafeAreaView style={styles.container}>
      <GestureHandlerRootView>
        <GestureDetector
          gesture={Gesture.Simultaneous(pinchGesture, rotationGesture)}>
          {imageData ? (
            <Animated.View
              style={[
                scaleAnimatedStyle,
                rotateAnimatedStyle,
                styles.animatedView,
              ]}>
              <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                  uri: imageData,
                }}
              />
            </Animated.View>
          ) : null}
        </GestureDetector>
      </GestureHandlerRootView>
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
  animatedView: {
    backgroundColor: '#ffffee',
  },
});

export default ImagePage;
