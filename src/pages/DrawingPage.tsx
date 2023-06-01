import React, {useRef, useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {SketchCanvas, SketchCanvasRef} from 'rn-perfect-sketch-canvas';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import {runOnJS} from 'react-native-reanimated';
import BottomBar from '../components/BottomBar';
import ColorPickerComponent from '../components/ColorPickerComponent';
import RangeSlider from '../components/RangeSlider';

type Props = {
  navigation: any;
};

function DrawingPage(props: Props): JSX.Element {
  const [changeColor, SetChangeColor] = useState(false);
  const [changeWidth, SetChangeWidth] = useState(false);
  const ref = useRef<SketchCanvasRef>(null!);

  const [color, setColor] = useState('black');
  const [strokeWidth, setStrokeWidth] = useState(1);

  /**
   *
   */
  const handleVisibleColorChange = () => {
    SetChangeColor(!changeColor);
    SetChangeWidth(false);
  };

  /**
   *
   */
  const hanldeVisibleWidthChange = () => {
    SetChangeWidth(!changeWidth);
    SetChangeColor(false);
  };

  /**
   *
   */
  const handleSaveImage = () => {
    let image = ref.current?.toBase64();
    if (image) {
      //   setImage(`data:image/jpeg;base64,${image}`);
      props.navigation.navigate('Image', {
        imageData: `data:image/jpeg;base64,${image}`,
      });
    }
  };

  /**
   *
   */
  const handleUndo = () => {
    ref?.current?.undo();
  };

  /**
   *
   */
  const handleRedo = () => {
    ref?.current?.redo();
  };

  /**
   *
   */
  const handleReset = () => {
    ref?.current?.reset();
  };

  /**
   *
   * @param color
   */
  const handleColorChange = (color: any) => {
    setColor(color);
  };

  /**
   *
   */
  const panGesture = Gesture.Pan()
    // .onUpdate(e => {})
    .onEnd(e => {
      if (e?.translationX > 0) {
        runOnJS(handleRedo)();
      } else {
        runOnJS(handleUndo)();
      }
    });

  /**
   *
   */
  const pinchGesture = Gesture.Pinch()
    // .onUpdate(e => {
    // })
    .onEnd(() => {
      runOnJS(handleReset)();
    });

  /**
   *
   */
  const singleTap = Gesture.Tap()
    .maxDuration(250)
    .minPointers(2)
    .onStart(() => {
      runOnJS(handleVisibleColorChange)();
    });

  /**
   *
   */
  const doubleTap = Gesture.Tap()
    .maxDuration(250)
    .numberOfTaps(2)
    .onStart(() => {
      runOnJS(hanldeVisibleWidthChange)();
    });

  /**
   *
   */
  const longPressGesture = Gesture.LongPress().onEnd((e, success) => {
    console.log(e);
    if (success) {
      runOnJS(handleSaveImage)();
    }
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.btnContainer}>
        <SketchCanvas
          containerStyle={styles.canvas}
          ref={ref}
          strokeColor={color}
          strokeWidth={strokeWidth}
        />
        <GestureHandlerRootView style={styles.gestureControlView}>
          <GestureDetector
            gesture={Gesture.Exclusive(
              singleTap,
              doubleTap,
              longPressGesture,
              pinchGesture,
              panGesture,
            )}>
            <View style={[styles.image]} />
          </GestureDetector>
        </GestureHandlerRootView>
        {changeColor ? (
          <ColorPickerComponent
            handleColorchange={handleColorChange}
            currentColor={color}
          />
        ) : null}
        {changeWidth ? (
          <RangeSlider
            handleWidthchange={setStrokeWidth}
            currentWidth={strokeWidth}
          />
        ) : null}
      </View>
      <BottomBar
        color={color}
        save={handleSaveImage}
        undo={handleUndo}
        redo={handleRedo}
        reset={handleReset}
        changePenColor={handleVisibleColorChange}
        changePenWidth={hanldeVisibleWidthChange}
        width={strokeWidth}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  btnContainer: {
    flexDirection: 'column',
    paddingHorizontal: 10,
    flexWrap: 'wrap',
    marginBottom: 0,
    width: '100%',
    height: '90%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  canvas: {
    borderWidth: 1,
    flex: 1,
    backgroundColor: '#FFF',
    width: '100%',
    height: '100%',
    marginTop: 10,
  },
  gestureControlView: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '100px',
    height: '100px',
    backgroundColor: '#f2f',
  },
});

export default DrawingPage;
