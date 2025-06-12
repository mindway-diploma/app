import type { PropsWithChildren, ReactElement } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
} from 'react-native-reanimated';

import { ThemedView } from '@/components/ThemedView';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';
import { LinearGradient } from 'expo-linear-gradient';
import { ThemedText } from './ThemedText';
import { FontFamily, FontSize } from '@/constants/Typography';
import { Radius } from '@/constants/Radius';
import { Colors } from '@/constants/Colors';

const HEADER_HEIGHT = 360;

type Props = PropsWithChildren<{
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  backgroundComponent?: ReactElement;
  title?: string;
  headerHeight: number;
}>;

export default function ParallaxScrollView({
  children,
  headerImage,
  headerBackgroundColor,
  backgroundComponent,
  title,
  headerHeight
}: Props) {
  const colorScheme = useColorScheme() ?? 'light';
  const baseColors = ["rgba(0, 0, 0, 0)",
      "rgb(0, 0, 0)",];
  const scrollRef = useAnimatedRef<Animated.ScrollView>();
  const scrollOffset = useScrollViewOffset(scrollRef);
  const bottom = useBottomTabOverflow();
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [headerHeight, 0,headerHeight],
            [headerHeight / 2, 0,headerHeight * 0.75]
          ),
        },
        // {
        //   scale: interpolate(scrollOffset.value, [-HEADER_HEIGHT, 0, HEADER_HEIGHT], [2, 1, 1]),
        // },
      ],
    };
  });
  const titleStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(
          scrollOffset.value,
          [-headerHeight, 0, headerHeight],
          [-20, 0, 30] // меньшее движение
        ),
      },
    ],
    opacity: interpolate(
      scrollOffset.value,
      [-headerHeight, 0, headerHeight],
      [1, 1, 0.4]
    ),
  }));
  return (
    <ThemedView style={styles.container}>
      <Animated.ScrollView
        ref={scrollRef}
        scrollEventThrottle={16}
        scrollIndicatorInsets={{ bottom }}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled" // 👈 обязательно
        contentContainerStyle={{ paddingBottom: bottom, flexGrow: 1 }} // 👈 прокрутка
      >
        <Animated.View
          style={[
            styles.header,
            { backgroundColor: headerBackgroundColor[colorScheme], height: headerHeight },
            headerAnimatedStyle,
          ]}>
          {headerImage}
        </Animated.View>
          <LinearGradient 
                  colors={baseColors  as [string, string, ...string[]]} 
                  start={{ x: 0.5, y: 0 }}   // ↕ сверху вниз
                  end={{ x: 0.5, y: 1 }}
                  style={styles.base}>
        <Animated.View style={[{marginBottom: 20, marginTop: "auto"}, titleStyle]}>
          <ThemedText style={styles.screenTitle}>{title}</ThemedText>
        </Animated.View>
          </LinearGradient>
        <View style={styles.content}>{children}</View>
      </Animated.ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  base: {
    paddingTop: 10
  },
  container: {
    flex: 1,
  },
  header: {
    overflow: 'hidden',
  },
  screenTitle: {
    fontSize: FontSize.xxl,
    fontFamily: FontFamily.gantari.bold,
    textAlign: "center"
  },
  content: {
    borderRadius: Radius.xl,
    flex: 1,
    gap: 16,
    overflow: 'hidden',
  },
});
