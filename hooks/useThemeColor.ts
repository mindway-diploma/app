import { useColorScheme } from 'react-native';
import { Colors } from '@/constants/Colors';

type Theme = typeof Colors.light;

function getNestedColorValue(obj: Theme, path: string): string | undefined {
  return path.split('.').reduce((acc: any, key: string) => acc?.[key], obj);
}

export function useThemeColor(
  overrides: { light?: string; dark?: string },
  colorKey: string
): string {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    overrides[scheme] ||
    getNestedColorValue(theme, colorKey) ||
    'transparent' // fallback
  );
}