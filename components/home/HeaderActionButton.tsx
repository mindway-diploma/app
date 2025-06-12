import { StyleSheet, View, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import { Colors } from '@/constants/Colors';

interface HeaderActionButtonProps {
    icon: ReactNode;
    onPress: any;
}
const HeaderActionButton = ({icon, onPress}: HeaderActionButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        pressed && [styles.buttonPressed]
      ]}
    >
      {icon}
    </Pressable>
  )
}

export default HeaderActionButton

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#272727"
  },
  buttonPressed: {
    backgroundColor: "#222", // темнее при нажатии
    opacity: 0.9
  }
})