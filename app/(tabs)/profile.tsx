import { StyleSheet, View, Text, TouchableOpacity, FlatList, Alert, ScrollView } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useUser } from '@/context/UserContext';
import PostCard from '@/components/cards/PostCard';
import { GuardedScreen } from '@/components/GuardedScreen';
import { router, useFocusEffect } from 'expo-router';
import React from 'react';

export default function ProfileScreen() {
  const { user, clearUser } = useUser();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchUserPosts = async () => {
    console.log(user);
    console.log(user?._id);
    if (!user?._id) return;
    try {
      setLoading(true);
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/user/${user._id}`);
      const data = await res.json();
      console.log(data);
      setPosts(data);
    } catch (e) {
      Alert.alert('Ошибка', 'Не удалось загрузить посты');
    } finally {
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   fetchUserPosts();
  // }, [user?._id]);

  const handleLogout = async () => {
    await AsyncStorage.removeItem('token');
    clearUser();

    router.replace('/(auth)/login')
  };

  useFocusEffect(
      React.useCallback(() => {
        fetchUserPosts();
      }, [user?._id])
    );

  return (
    <GuardedScreen>
    <ScrollView style={{ flex: 1, backgroundColor: '#fff', paddingTop: 40 }}>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, width: "100%", marginBottom: 20}}>
      <Text style={{
        fontFamily: 'Gantari-bold',
        fontSize: 24,
        textAlign: 'center',
        marginVertical: 20,
        alignSelf: 'center',
      }}>
        {user?.name || 'Профиль'}
      </Text>
       <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>Log out</Text>
      </TouchableOpacity>
    </View>
      <Text style={{ fontSize: 16, color: '#888', marginBottom: 20, textAlign: "center" }}>{user?.email}</Text>
      <Text style={{ fontSize: 20, marginTop: 30, marginBottom: 10, textAlign: "center" }}>Мои посты</Text>
      {loading ? (
        <Text>Загрузка...</Text>
      ) : posts.length === 0 ? (
        <Text>Постов нет</Text>
      ) : (
        posts.map(item => (
          <PostCard
              id={item._id}
              content={item.content}
              user={{
                _id: item.creator?._id || '',
                displayName: item.creator?.displayName || '',
                avatar: item.creator?.avatar || ''
              }}
              date={item.createdAt ? new Date(item.createdAt).toLocaleDateString() : ''}
              time={item.createdAt ? new Date(item.createdAt).toLocaleTimeString() : ''}
              images={item.images || []}
              showFullContent={false}
              onLike={undefined}
              removePost={undefined}
              showActions={false}
            />
        ))
      )}
      <View style={{height: 400}}/>
    </ScrollView>
    </GuardedScreen>
  );
}

const styles = StyleSheet.create({
  logoutBtn: {
    backgroundColor: '#545454',
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 32,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
