import { StyleSheet, Text, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native'
import React from 'react'
import { router } from 'expo-router'
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Props = {
  title: string;
  subtitle?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  absolute?: boolean;
  style?: ViewStyle;
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
          absolute && { position: "absolute", top: 0, zIndex: 10, width: "100%" },
          style
        ]}
      >
        <View style={[
          styles.headerTop, 
          {paddingTop: insets.top, height: 70 + insets.top},
          {backgroundColor, elevation: backgroundColor === "white" ? 2 : 0},]}
        >
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onLeftPress}
          >
            {
              leftContent ?
              leftContent :
              <View style={{ width: 40 }} />
            }
          </TouchableOpacity>
          <View style={{flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 9, maxWidth: "50%"}}>
            {
              titlePreIcon && titlePreIcon
            }
            <View style={{alignItems: "center"}}>
              <Text style={[styles.headerTitle, {fontSize: titleStyle?.fontSize ? titleStyle.fontSize : 20, ...titleStyle}]}>{title}</Text>
              {
                  subtitle &&
                  <Text style={{color: "#A8A8A8", fontSize: 15, fontFamily: "Montserrat600"}}>{subtitle}</Text>
              }
            </View>
            {
              titlePostIcon && titlePostIcon
            }
          </View>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={onRightPress}
          >
            {
              rightContent ?
              rightContent :
              <View style={{ width: 40 }} />
            }
            {/* <BackIcon /> */}
          </TouchableOpacity>
        </View>
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
        backgroundColor: "#E2EDBE",
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
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
      },
      headerButton: {
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
      },
})