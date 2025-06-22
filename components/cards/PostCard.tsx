import { Alert, Dimensions, Image, Modal, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { LinearGradient as ExpoLinearGradient } from 'expo-linear-gradient'
import { router, usePathname } from 'expo-router';
import { useFocusEffect } from "@react-navigation/native";
import ReadMoreArrowIcon from '@/assets/svg/posts/ReadMoreArrowIcon';
import ActionsIcon from '@/assets/svg/posts/ActionsIcon';
import LikeIcon from '@/assets/svg/posts/LikeIcon';
import CommentIcon from '@/assets/svg/posts/CommentIcon';
import { FontFamily } from '@/constants/Typography';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FilledLikeIcon from '@/assets/svg/posts/FilledLikeIcon';

interface PostCardProps {
    id: string;
    content: string;
    user: {
        _id: string;
        displayName: string;
        avatar: string;
    },
    date: string;
    topic: string;
    time: string;
    images: string[];
    showFullContent: boolean;
    onLike: any;
    removePost: any;
    showActions: boolean;
    background?: string;
}
const PostCard = (props: PostCardProps) => {
    console.log(props.topic);
    const [likesAmount, setLikesAmount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [commentsAmount, setCommentsAmount] = useState(0);
    const pathname = usePathname();
    // console.log(pathname);

    const [activeIndex, setActiveIndex] = useState(0);
    const [showPopup, setShowPopup] = useState(false);

    const [isGalleryVisible, setIsGalleryVisible] = useState(false);
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    const openGallery = (index: number) => {
      setActiveImageIndex(index);
      setIsGalleryVisible(true);
    };

    const closeGallery = () => {
      setIsGalleryVisible(false);
      setActiveImageIndex(0);
    };

    const onScroll = (event: any) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / Dimensions.get("window").width
        );
        setActiveIndex(index);
    };

    const handleCommentClick = () => {
        router.push({
            pathname: `/posts/[id]`,
            params: {
                id: props.id,
                data: JSON.stringify({
                    content: props.content,
                    user: props.user,
                    date: props.date,
                    time: props.time,
                    images: props.images,
                    scrollToComment: true,
                })
            }
        })
    }
    
    const toggleLike = async () => {
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                objectId: props.id,
                objectType: "Post"
            }),
        });
        const data = await res.json();
        // console.log(data);
        setLikesAmount(data.likesCount);
        fetchIsLiked();
        props.onLike();
    }
    const fetchLikesAmount = async () => {
        // console.log("FETCHING LIKES")
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/likes/${props.id}/Post/amount`);
        const data = await res.json();
        setLikesAmount(data.likesCount)
    }
    const fetchIsLiked = async () => {
        console.log("FETCHING is LIKEd");
        const token = await AsyncStorage.getItem("token");
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/likes/${props.id}/Post/is-liked`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const data = await res.json();
        // console.log(data);
        console.log(data);
        setIsLiked(data.isLiked)
    }
    
    const removePost = async (id: string) => {
        // const token = await AsyncStorage.getItem("token");
        // const res = await fetch(
        // `${process.env.EXPO_PUBLIC_API_URL}/posts/${id}`,
        // {
        //     method: "DELETE",
        //     headers: {
        //     "Content-Type": "application/json",
        //     Authorization: `Bearer ${token}`,
        //     },
        // }
        // );
        // const data = await res.json();
        // console.log(data);
    }
    const handleDelete = async (id: string) => {
        // Alert.alert(
        //       "Delete messages",
        //       "Are you sure that you want to delete all messages in this chat?",
        //       [
        //         {
        //             text: "Remove",
        //             onPress: () => {
        //                 setShowPopup(false);
        //                 props.removePost(id)
        //             },
        //         },
        //         {
        //           text: "Cancel",
        //           onPress: () => {},
        //         },
        //       ]
        //     );
    }
    const fetchCommentsAmount = async () => {
        console.log("FETCHING COMMENTS AMOUNT");
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comments/post/${props.id}/count`);
        const data = await res.json();
        console.log(data);
        setCommentsAmount(data.commentsCount)
    }
    useEffect(() => {
        // console.log("Images", props.images);
        fetchLikesAmount();
        fetchCommentsAmount();
        fetchIsLiked();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchLikesAmount();
            fetchCommentsAmount();
            fetchIsLiked();
        }, [])
      );
  return (
    <View style={[{width: "100%", zIndex: 999999, borderRadius: 32, position: 'relative', borderTopWidth: 1.5, borderLeftWidth: 1.5, borderRightWidth: 1.5, borderRightColor: "rgb(243, 243, 243)",  borderLeftColor: "rgb(243, 243, 243)", borderTopColor: "rgb(239, 239, 239)"}, props.background ? {backgroundColor: "white", elevation: 2, shadowColor: "#000",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 1, } : {}]}>
        <Modal
            visible={isGalleryVisible}
            transparent={true}
            onRequestClose={closeGallery}
            animationType="slide"
            >
            <View style={{ flex: 1, backgroundColor: "black" }}>
                <ScrollView
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                contentOffset={{ x: activeImageIndex * Dimensions.get('window').width, y: 0 }}
                >
                {props.images.map((item: any, index: number) => (
                    <View key={index} style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}>
                    <Image
                        source={{ uri: item }}
                        style={{ width: "100%", height: "100%", resizeMode: "contain" }}
                    />
                    <TouchableOpacity
                        style={{
                        position: "absolute",
                        top: 50,
                        right: 20,
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        borderRadius: 30,
                        padding: 10,
                        zIndex: 100
                        }}
                        onPress={closeGallery}
                    >
                        {/* <CloseIcon fill="white" /> */}
                    </TouchableOpacity>
                    </View>
                ))}
                </ScrollView>
            </View>
        </Modal>
        <ExpoLinearGradient
            colors={props.background ? [props.background, props.background] : (props.images.length === 0 && !props.showFullContent ? ["#FFFFFF99", "#FFFFFF99"] : ["#F4F4F4", "#FFFFFF00"])}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{borderRadius: 32, paddingTop: 10, paddingBottom: 21, paddingHorizontal: 22,}}
        >
            <View style={{flexDirection: "row", gap: 13, paddingHorizontal: 9, alignItems: "center"}}>
                <View style={{width: 60, height: 60, borderRadius: 40, backgroundColor: "#eee", padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                    {
                         <Image
                           source={require('@/assets/images/userImage.jpg')}
                           style={{width: 60, height: 60, borderRadius: 100}}
                         />
                    }
                </View>
                <View style={{gap: 2}}>
                    <View>
                        <Text style={{fontFamily: FontFamily.gantari.bold, fontSize: 16}}>{props.user.displayName}</Text>
                    </View>
                    <View style={{flexDirection: "row", alignItems: "center", gap: 4}}>
                        <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 14, color: "#929C71"}}>{props.date}</Text>
                        <View style={{width: 4, height: 4, backgroundColor: "#73843D", borderRadius: 5}}></View>
                        <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 14, color: "#929C71"}}>{props.time}</Text>
                    </View>
                </View>
            </View>
            {
                    props.showActions &&
                    <TouchableOpacity style={{position: "absolute", width: 30, height: 30, alignItems: "center", justifyContent: "center", right: 30, top: 20}} onPress={() => setShowPopup(prev => !prev)}>
                        <ActionsIcon/>
                    </TouchableOpacity>
                }
                {
                    props.showActions && showPopup &&
                    
                        <View style={{position: "absolute", zIndex: 10000, gap: 10, backgroundColor: "#EEEEEE", borderRadius: 10, paddingHorizontal: 15, paddingVertical: 20, right: 20, top: 50}}>
                            <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 8}} onPress={() => {}}>
                                {/* <EditIcon/> */}
                                <Text style={{fontFamily: FontFamily.gantari.medium, fontSize: 18}}>{"Edit"}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{flexDirection: "row", alignItems: "center", gap: 11}} onPress={() => handleDelete(props.id)}>
                                {/* <RemoveIcon/> */}
                                <Text style={{fontFamily: FontFamily.gantari.medium, fontSize: 18}}>{"Delete"}</Text>
                            </TouchableOpacity>
                        </View>
                    
                }
            <View style={{flexDirection: "row", gap: 12, marginTop: 24}}>
                <View style={{width: 2, alignSelf: "stretch", backgroundColor: "#929C71", borderRadius: 5}}></View>
                <View style={{width: "100%"}}>
                    {
                        props.showFullContent ?
                        <>
                            <Text style={{fontFamily: FontFamily.gantari.medium, fontSize: 14}}>{props.content}</Text>
                        </>
                        :
                        <>
                            <Text style={{fontFamily: FontFamily.gantari.medium, fontSize: 14}} numberOfLines={2}>{props.content}</Text>
                            <TouchableOpacity 
                                style={{borderWidth: 1, borderColor: "#73843D", borderRadius: 30, alignSelf: "center", marginTop: 11, paddingVertical: 4, flexDirection: "row", gap: 7, alignItems: "center", justifyContent: "center", width: 168, left: -7}}
                                onPress={() => router.push({
                                    pathname: `/posts/[id]`,
                                    params: {
                                        id: props.id,
                                        data: JSON.stringify({
                                            content: props.content,
                                            user: props.user,
                                            date: props.date,
                                            time: props.time,
                                            images: props.images,
                                            scrollToComment: false,
                                            topic: props.topic
                                        })
                                    }
                                })}
                            >
                                <Text style={{fontFamily: FontFamily.gantari.bold, color: "#73843D", fontSize: 16, top: -2}}>Read more</Text>
                                <ReadMoreArrowIcon/>
                            </TouchableOpacity>
                        </>
                        
                    }
                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        onScroll={onScroll}
                        scrollEventThrottle={16}
                        style={{marginTop: 21}}
                    >
                        {props.images.map((image, index) => (
                            <Pressable key={index} style={{width: 340,
                                height: 236,
                                justifyContent: "center",
                                alignItems: "center",}} onPress={() => setIsGalleryVisible(true)}>
                                <Image source={{ uri: image }} style={{width: "100%",
                                    height: "100%",
                                    resizeMode: "cover",borderRadius: 20}} />
                            </Pressable>
                        ))}
                    </ScrollView>
                </View>
            </View>
            <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", marginTop: 22}}>
                <TouchableOpacity style={{flexDirection: "row", gap: 8, alignItems: "center"}} onPress={() => toggleLike()}>
                    {
                        isLiked ?
                        <FilledLikeIcon/>
                        :
                        <LikeIcon/>
                    }
                    <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 19}}>{"Like"}</Text>
                    <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 19, color: "#9F9F9F"}}>{likesAmount}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flexDirection: "row", gap: 8, alignItems: "center"}} onPress={() => handleCommentClick()}>
                    <CommentIcon/>
                    <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 19}}>{"Comment"}</Text>
                    <Text style={{fontFamily: FontFamily.gantari.semiBold, fontSize: 19, color: "#9F9F9F"}}>{commentsAmount}</Text>
                </TouchableOpacity>
            </View>
        </ExpoLinearGradient>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({
     gradientBox: {
        width: 92, // Ширина квадрата
        height: 89, // Высота квадрата
        borderRadius: 18, // Опциональное скругление углов
        justifyContent: "center",
        alignItems: "center",
      },
      overlay: {
        ...StyleSheet.absoluteFillObject, // Растягиваем на весь экран
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Полупрозрачное затемнение
        justifyContent: "flex-end",
        zIndex: 9998, // Поверх всех элементов
      },
      annotationOverlay: {
        position: "absolute",
        bottom: 0, // Фиксируем внизу
        left: 0,
        right: 0,
        backgroundColor: "white", // Полупрозрачный фон
        zIndex: 9999, // Поднимаем блок выше всех элементов
        elevation: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 24,
      },
})