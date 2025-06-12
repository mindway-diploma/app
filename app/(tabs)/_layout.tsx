import { Redirect, router, Tabs } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Platform, View, TouchableOpacity, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Spacing } from '@/constants/Spacing';
import { TabIconWithFocus } from '@/components/navigation/TabIconWithFocus';
import ProfileIcon from '@/assets/svg/ProfileIcon';
import NotificationsIcon from '@/assets/svg/NotificationsIcon';
import HomeIcon from '@/assets/svg/HomeIcon';
import SearchIcon from '@/assets/svg/SearchIcon';
import AddIcon from '@/assets/svg/AddIcon';

export default function TabLayout() {
  const colorScheme = useColorScheme();


  return (
    <View style={{ flex: 1 }}>
      {/* Кастомная кнопка поверх таббара */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => {
          router.push('/posts/create'); // Переход на экран создания
        }}
        activeOpacity={0.8}
      >
        <AddIcon/>
      </TouchableOpacity>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "black",
          tabBarInactiveTintColor: "white",
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "white",
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 38,
            borderTopRightRadius: 38,
            borderTopWidth: 0,
            paddingHorizontal: 10,
            height: Platform.OS === "ios" ? 100 : 100,
            paddingTop: Spacing.md,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title:"",
            tabBarIcon: ({ color, focused }) => (
              <HomeIcon/>
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <SearchIcon color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="spacer"
          options={{
            tabBarButton: () => <View style={{ width: 90 }} />, // ширина под вашу кнопку
          }}
        />
        <Tabs.Screen
          name="sessions"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <NotificationsIcon color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: '',
            tabBarIcon: ({ color, focused }) => (
              <ProfileIcon color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    position: 'absolute',
    bottom: 60, // чуть выше таббара
    alignSelf: 'center',
    zIndex: 10,
    backgroundColor: '#4F8EF7', // ваш цвет
    borderRadius: 32,
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
});
