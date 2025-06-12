import { Image, StyleSheet, Platform, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Header from '@/components/home/Header';
import { FontFamily } from '@/constants/Typography';
import ChatIcon from '@/assets/svg/ChatIcon';
import { LinearGradient } from 'expo-linear-gradient';
import PostCard from '@/components/cards/PostCard';
import GeneralIcon from '@/assets/svg/topics/GeneralIcon';
import NewsIcon from '@/assets/svg/topics/NewsIcon';
import TrendsIcon from '@/assets/svg/topics/TrendsIcon';
import LifestyleIcon from '@/assets/svg/topics/LifestyleIcon';
import IdeasIcon from '@/assets/svg/topics/IdeasIcon';
import ExperiencesIcon from '@/assets/svg/topics/ExperiencesIcon';
import { useEffect, useState } from 'react';
import { GuardedScreen } from '@/components/GuardedScreen';
import { useUser } from '@/context/UserContext';
import { useFocusEffect } from 'expo-router';
import React from 'react';


const topics = [
  {
    title: "General",
    icon: (color: string) => <GeneralIcon color={color} />,
    bg: require('@/assets/images/topics/generalBg.png'),
  },
  {
    title: "NEWS",
    icon: (color: string) => <NewsIcon color={color} />,
    bg: require('@/assets/images/topics/newsBg.png'),
  },
  {
    title: "Trends",
    icon: (color: string) => <TrendsIcon color={color} />,
    bg: require('@/assets/images/topics/trendsBg.png'),
  },
  {
    title: "Lifestyle",
    icon: (color: string) => <LifestyleIcon color={color} />,
    bg: require('@/assets/images/topics/lifestyleBg.png'),
  },
  {
    title: "ideas",
    icon: (color: string) => <IdeasIcon color={color} />,
    bg: require('@/assets/images/topics/ideasBg.png'),
  },
  {
    title: "experiences",
    icon: (color: string) => <ExperiencesIcon color={color} />,
    bg: require('@/assets/images/topics/experiencesBg.png'),
  },
]

function TopicButton({ title, icon, onPress, selected }: {title: string, icon: any, onPress: any, selected: boolean}) {
  return (
    <TouchableOpacity
      style={[{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 15,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        backgroundColor: selected ? "#545454" : 'white',
      }, {
      }]}
      onPress={() => onPress()}
    >
      {icon(selected ? "white" : "black")}
      <Text style={{ marginLeft: 10, fontFamily: FontFamily.gantari.bold, fontSize: 20, color: selected ? "white" : "black" }}>{title}</Text>
    </TouchableOpacity>
  );
}


export default function HomeScreen() {
  const {user} = useUser();
  console.log(user);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async (topicTitle?: string) => {
    try {
      setLoading(true);
      let url = `${process.env.EXPO_PUBLIC_API_URL}/posts`;
      if (topicTitle) {
        url += `?topic=${encodeURIComponent(topicTitle)}`;
      }
      const res = await fetch(url);
      const data = await res.json();
      setPosts(data);
    } catch (e) {
      // Можно добавить обработку ошибки
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(selectedTopic.title);
  }, [selectedTopic]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPosts(selectedTopic.title);
    }, [selectedTopic])
  );

  return (
    <GuardedScreen>
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <Image
          source={selectedTopic.bg}
          style={{width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, zIndex: 0}}
        />
        <Header /> 
        <ScrollView style={{ paddingTop: 120 }}>
            <View style={{paddingHorizontal: 20,}}>
              <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-between"}}>
                <View>
                  <Text style={{fontSize: 24, fontFamily: FontFamily.gantari.medium}}>Hello,</Text>
                  <Text style={{fontSize: 24, fontFamily: FontFamily.gantari.bold}}>{user?.name}</Text>
                </View>
                <View style={{flexDirection: "row", alignItems: "center", justifyContent: "flex-end", gap: 28}}>
                  <TouchableOpacity>
                    <ChatIcon/>
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <Image
                      source={require('@/assets/images/userImage.jpg')}
                      style={{ width: 80, height: 80, borderRadius: 50 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{paddingLeft: 100, paddingVertical: 10, marginTop: 15}} contentContainerStyle={{gap: 10, paddingRight: 200}} >
              {
                topics.map(item => (
                  <TopicButton
                    key={item.title}
                    title={item.title}
                    icon={item.icon}
                    selected={selectedTopic.title === item.title}
                    onPress={() => setSelectedTopic(item)}
                  />
                ))
              }
            </ScrollView>
            <View style={{marginTop: 25, gap: 15}}>
              {loading ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>Загрузка...</Text>
              ) : posts.length === 0 ? (
                <Text style={{textAlign: 'center', marginTop: 20}}>Постов нет</Text>
              ) : (
                posts.map(post => (
                  <PostCard
                    key={post._id}
                    id={post._id}
                    content={post.content}
                    user={{
                      _id: post.creator?._id || '',
                      displayName: post.creator?.displayName || '',
                      avatar: post.creator?.avatar || ''
                    }}
                    date={post.createdAt ? new Date(post.createdAt).toLocaleDateString() : ''}
                    time={post.createdAt ? new Date(post.createdAt).toLocaleTimeString() : ''}
                    images={post.images || []}
                    showFullContent={false}
                    onLike={undefined}
                    removePost={undefined}
                    showActions={false}
                  />
                ))
              )}
            </View>
            <View style={{marginBottom: 400}}/>
            </ScrollView>
            </View>
        </GuardedScreen>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  header: {
    height: 120,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontFamily: FontFamily.gantari.bold,
  },
  chatIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
});