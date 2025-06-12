import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function GuardedScreen({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const check = async () => {
        // await AsyncStorage.clear();  
      const token = await AsyncStorage.getItem('token');
      if (!token) {
        router.replace('/(auth)/login');
      }
    };
    check();
  }, []);

  return <>{children}</>;
}