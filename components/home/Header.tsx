// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { ThemedView } from '../ThemedView'
// import { ThemedText } from '../ThemedText'
// import PartLogoIcon from '@/assets/svg/PartLogoIcon'
// import { Spacing } from '@/constants/Spacing'
// import HeaderActionButton from './HeaderActionButton'
// import ChatIcon from '@/assets/svg/home/ChatIcon'
// import NotificationsIcon from '@/assets/svg/home/NotificationsIcon'
// import NewIcon from '@/assets/svg/home/NewIcon'
// import Animated, { Extrapolate, Extrapolation, interpolate, SharedValue, useAnimatedReaction, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
// import { useSafeAreaInsets } from 'react-native-safe-area-context'
// import { router } from 'expo-router'


// const HEADER_SCROLL_OFFSET = 40;

// const HIDE_OFFSET = 40;
// const HIDE_DISTANCE = 80;

// const Header = ({ scrollY }: { scrollY: SharedValue<number> }) => {

//     const lastScrollY = useSharedValue(0);
//     const headerY = useSharedValue(0);
//     const isHidden = useSharedValue(false);

//     useAnimatedReaction(
//         () => scrollY.value,
//         (currentY, prevY) => {
//         if (prevY === null) return;
//         const dy = currentY - prevY;

//         // Скролл вниз
//         if (dy > 0 && currentY > HIDE_OFFSET) {
//             if (!isHidden.value) {
//             headerY.value = withTiming(-HIDE_DISTANCE, { duration: 250 });
//             isHidden.value = true;
//             }
//         }

//         // Скролл вверх
//         if (dy < -5) {
//             if (isHidden.value) {
//             headerY.value = withTiming(0, { duration: 250 });
//             isHidden.value = false;
//             }
//         }

//         lastScrollY.value = currentY;
//         },
//         [scrollY]
//     );

//     const animatedStyle = useAnimatedStyle(() => ({
//         transform: [{ translateY: headerY.value }],
//     }));
//   return (
//     <Animated.View style={[styles.header, animatedStyle]}>
//         <PartLogoIcon/>
//         <View style={{flexDirection: "row", gap: 18, alignItems: "center"}}>
//             <HeaderActionButton
//                 icon={<ChatIcon/>}
//                 onPress={() => console.log("chat")}
//             />
//             <HeaderActionButton
//                 icon={<NotificationsIcon/>}
//                 onPress={() => console.log("notifications")}
//             />
//             <HeaderActionButton
//                 icon={<NewIcon/>}
//                 onPress={() => router.push("/(offers)/create")}
//             />
//         </View>
//     </Animated.View>
//   )
// }

// export default Header

// const styles = StyleSheet.create({
//     header:{
//         left: 0,
//         right: 0,
//         zIndex: 100,
//         paddingVertical: Spacing.md, 
//         paddingHorizontal: Spacing.lg, 
//         flexDirection: "row", 
//         justifyContent: "space-between",
//         alignItems: "center",
//     }
// })

import React from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle, Image } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title?: string;
  subtitle?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  absolute?: boolean;
  style?: ViewStyle;
  leftContentStyle?: ViewStyle;
  rightContentStyle?: ViewStyle;
  titleStyle?: TextStyle;
  backgroundColor?: string;
  titlePreIcon?: React.ReactNode;
  titlePostIcon?: React.ReactNode;
};

const Header = ({
  title,
  subtitle,
  onLeftPress,
  onRightPress,
  leftContent,
  rightContent,
  leftContentStyle,
  rightContentStyle,
  absolute = true,
  style,
  titleStyle,
  backgroundColor = 'white',
  titlePreIcon,
  titlePostIcon
}: Props) => {
    const insets = useSafeAreaInsets();
    console.log(insets)
    return (
      <View
        style={[
          styles.header,
          absolute && { position: "absolute", top: 0, zIndex: 10, width: "100%", paddingTop: insets.top + 10, paddingBottom: 10 },
          style
        ]}
      >
        <Image
            source={require('@/assets/images/MindWayLogo.png')}
            style={{ width: 193, height: 61, alignSelf: 'center', }}
            resizeMode='contain'
        />
      </View>
    )
}

export default Header

const styles = StyleSheet.create({
    header: {
        alignItems: "center",
        width: "100%",
        position: "static",
        justifyContent: "center",
        backgroundColor: "#fff",
      },
      headerTitle: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: "Montserrat600",
      },
      headerTop: {
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "white",
        flexDirection: "row",
        position: "absolute",
        top: 0,
      },
      headerButton: {
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
      },
})