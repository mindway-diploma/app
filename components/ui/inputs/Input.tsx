import { StyleSheet, TextInput, View, Platform, ViewStyle } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { useState } from 'react';
import { Spacing } from '@/constants/Spacing';

type Props = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  style?: ViewStyle;
};

export default function Input({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  style,
}: Props) {
  const scheme = useColorScheme();
  const background = Colors[scheme ?? 'light'].background.secondary;
  const textColor = Colors[scheme ?? 'light'].text.primary;

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: background, borderBottomColor: Colors[scheme ?? 'light'].primary },
        style,

      ]}
    >
      <TextInput
        style={[styles.input, { color: textColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#ccc"
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 12,
    paddingHorizontal: Spacing.xl,
    borderBottomWidth: 1,
  },
  input: {
    height: 52,
    fontSize: 16,
  },
});

function getBottomShadowIOS(color: string) {
  return {
    shadowColor: color,
    shadowOffset: { width: 0, height: 1.8 }, // чуть ниже
    shadowOpacity: 1,
    shadowRadius: 0.5, // чуть размытая как в Figma
  };
}
