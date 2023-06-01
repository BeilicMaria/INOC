import React from 'react';
import {StyleSheet, View} from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';
type Props = {
  handleColorchange: (color: any) => void;
  currentColor: any;
};

const ColorPickerComponent = (props: Props) => {
  return (
    <View style={styles.container}>
      <ColorPicker
        color={props.currentColor}
        swatchesOnly={false}
        onColorChange={props.handleColorchange}
        thumbSize={40}
        sliderSize={40}
        noSnap={true}
        row={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    marginTop: '100%',
  },
});

export default ColorPickerComponent;
