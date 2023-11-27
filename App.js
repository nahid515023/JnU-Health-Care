import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Login, Registration, Home } from "./App/Screens/index";
// import Login from "./App/Screens/Login";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaView } from "react-native-safe-area-context";

import { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    RMedium: require("./assets/fonts/Roboto-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerTitle: "",
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Regi"
          component={Registration}
          options={{
            headerTitle: "Back to Login",
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: "Home",
            headerStyle: { backgroundColor: "#fff" },
            headerShadowVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
