import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import type { PropsWithChildren } from 'react';

export default function GradientBackground({ children }: PropsWithChildren) {
  const scheme = useColorScheme();
  const baseColors = Colors[scheme ?? 'light'].gradientBackground as [string, string, ...string[]];
  const overlayColors = Colors[scheme ?? 'light'].gradientBackgroundOverlay as [string, string, ...string[]];

  return (
    <LinearGradient 
        colors={baseColors} 
        start={{ x: 0, y: 0.5 }}     // ↔ слева направо
        end={{ x: 1, y: 0.5 }}
        style={styles.base}>
      <LinearGradient 
        colors={overlayColors} 
        start={{ x: 0.5, y: 0 }}   // ↕ сверху вниз
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill} />
        {children}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
     // 🔽 добавляем это
  },
});
