import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DrawingPage from './src/pages/DrawingPage';
import ImagePage from './src/pages/ImagePage';
const Stack = createNativeStackNavigator();
function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Drawing" component={DrawingPage} />
          <Stack.Screen name="Image" component={ImagePage} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});

export default App;
