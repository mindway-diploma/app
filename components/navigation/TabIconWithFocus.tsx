import { View, StyleSheet, useColorScheme, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export const TabIconWithFocus = ({
  icon,
  focused,
}: {
  icon: React.ReactNode;
  focused: boolean;
}) => {
    const colorScheme = useColorScheme();
  return (
    <View style={styles.wrapper}>
      {focused ? (
        <LinearGradient
          colors={Platform.OS === "ios" ? ['transparent', "rgba(206, 206, 32, 0.32)"] : ['transparent',"rgba(206, 206, 32, 0.09)", "rgba(206, 206, 32, 0.32)"]} // жёлтый градиент
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradientBackground}
        >
          {icon}
        </LinearGradient>
      ) : (
        <View style={styles.inactiveBackground}>{icon}</View>
      )}

      {focused && <View style={[styles.underline, {backgroundColor: Colors[colorScheme ?? 'light'].primary}]} />}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientBackground: {
    padding: 12,
    width: 83,
    alignItems: "center"
  },
  inactiveBackground: {
    padding: 12,
    borderRadius: 16,
  },
  underline: {
    height: 4,
    width: 83,
    borderRadius: 2,
  },
});
