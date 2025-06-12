import AsyncStorage from '@react-native-async-storage/async-storage';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';

import * as SystemUI from 'expo-system-ui';
import * as NavigationBar from 'expo-navigation-bar';
import { UserProvider } from '@/context/UserContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    "Gantari-light": require('../assets/fonts/Gantari-Light.ttf'),
    "Gantari-regular": require('../assets/fonts/Gantari-Regular.ttf'),
    "Gantari-medium": require('../assets/fonts/Gantari-Medium.ttf'),
    "Gantari-semibold": require('../assets/fonts/Gantari-SemiBold.ttf'),
    "Gantari-bold": require('../assets/fonts/Gantari-Bold.ttf'),
    "Gantari-extrabold": require('../assets/fonts/Gantari-ExtraBold.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
    NavigationBar.setVisibilityAsync('hidden');
    NavigationBar.setBehaviorAsync('overlay-swipe');
    NavigationBar.setPositionAsync("absolute");
    SystemUI.setBackgroundColorAsync("transparent");
  }, [loaded]);

  if (!loaded) {
    return null; // ничего не рендерим, пока не проверили токен
  }

  return (
    <UserProvider>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/login" options={{ headerShown: false }} />
          <Stack.Screen name="(auth)/register" options={{ headerShown: false }} />
          <Stack.Screen name="posts/create" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" backgroundColor="transparent" translucent />
      </ThemeProvider>
    </UserProvider>
  );
}
