import * as React from 'react';
import {StyleSheet} from 'react-native';
import {Appbar, FAB} from 'react-native-paper';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  undo: () => void;
  redo: () => void;
  changePenColor: () => void;
  changePenWidth: () => void;
  save: () => void;
  reset: () => void;
  color: any;
  width: number;
};

const BottomBar = (props: Props) => {
  const {bottom} = useSafeAreaInsets();
  return (
    <Appbar style={styles.bottom} safeAreaInsets={{bottom}}>
      <Appbar.Action
        color="#ffff"
        icon="undo"
        onPress={() => {
          props.undo();
        }}
      />
      <Appbar.Action
        color="#ffff"
        icon="redo"
        onPress={() => {
          props.redo();
        }}
      />
      <Appbar.Action
        color={props.color}
        icon="palette"
        onPress={() => {
          props.changePenColor();
        }}
      />
      <FAB
        mode="flat"
        style={styles.fab}
        size="small"
        icon="border-color"
        label={`${props.width ? props.width : ''}`}
        color="#ffff"
        onPress={() => {
          props.changePenWidth();
        }}
      />
      <Appbar.Action
        color="#ffff"
        icon="content-save"
        onPress={() => {
          props.save();
        }}
      />
      <Appbar.Action
        color="#ffff"
        icon="delete"
        onPress={() => {
          props.reset();
        }}
      />
    </Appbar>
  );
};

const styles = StyleSheet.create({
  bottom: {
    backgroundColor: '#BA90C6',
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  fab: {
    backgroundColor: 'rgba(0,0,0,0)',
  },
});

export default BottomBar;
