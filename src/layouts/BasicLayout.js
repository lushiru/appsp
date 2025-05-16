import {
    StatusBar as StatusBarRN,
    ScrollView,
  } from "react-native";
  import * as ScreenOrientation from 'expo-screen-orientation';
  import { SafeAreaView } from 'react-native-safe-area-context';
  

  export function BasicLayout(props) {
    const { children } = props;

    
    ScreenOrientation.unlockAsync();
  
    return (
      <>
        <StatusBarRN />
        <SafeAreaView>
        <ScrollView>{children}</ScrollView>
        </SafeAreaView>
      </>
    );
  }