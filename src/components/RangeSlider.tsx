import React from 'react';
import {View, StyleSheet} from 'react-native';
import Slider from '@react-native-community/slider';
import {MAX_WIDTH, MIN_WIDTH} from '../utils/utils';

type Props = {
  handleWidthchange: (color: any) => void;
  currentWidth: any;
};

const RangeSlider = (props: Props) => {
  return (
    <View style={styles.container}>
      <Slider
        style={{width: '100%', height: 70}}
        minimumValue={MIN_WIDTH}
        maximumValue={MAX_WIDTH}
        step={1}
        minimumTrackTintColor="#BA90C6"
        maximumTrackTintColor="#000000"
        onValueChange={props.handleWidthchange}
        value={props.currentWidth}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    position: 'absolute',
    marginTop: '100%',
    width: '100%',
  },
});

export default RangeSlider;
