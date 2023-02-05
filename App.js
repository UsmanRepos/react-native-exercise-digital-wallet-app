import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import * as Fonts from 'expo-font';
import AppLoading from 'expo-app-loading';
import Navigator from './navigation';

const getFonts = () => Fonts.loadAsync({
  'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
  'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
  'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
});
export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <>
        <Navigator />
        <StatusBar style="auto" />
      </>
    );
  }
  else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={console.warn}
      />
    );
  }
};

