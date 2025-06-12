import { StyleSheet, TextInput, View, Platform, ViewStyle, TouchableOpacity } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { PropsWithChildren, useState } from 'react';
import { Spacing } from '@/constants/Spacing';
import { Radius } from '@/constants/Radius';

type Props = PropsWithChildren<{
  onPress: any;
  type: "filled" | "outlined";
  style?: ViewStyle;
  disabled?: boolean;
}>;

export default function Button({
    children,
    onPress,
    type,
    style,
    disabled = false
}: Props) {
  return (
    <TouchableOpacity
        disabled={disabled}
        style={[styles.button, {...style}, type === "filled" ? styles.filled : styles.oulined]}
        onPress={onPress}>
        {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
    filled: {
        backgroundColor: Colors.dark.primary
    },
    oulined: {
        borderColor: Colors.dark.primary
    },

    button: {
        paddingVertical: Spacing.md,
        paddingHorizontal: Spacing.lg,
        borderRadius: Radius.sm,
        borderWidth: 1,
        borderColor: "#002640"
    }
});