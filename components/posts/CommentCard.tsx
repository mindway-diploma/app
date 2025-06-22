import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View, Image, Pressable, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentLikeFilledIcon from '@/assets/svg/posts/CommentLikeFilledIcon';
import ReplyCommentIcon from '@/assets/svg/posts/ReplyCommentIcon';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';
import CommentLikeIcon from '@/assets/svg/posts/CommentLikeIcon';
import CloseIcon from '@/assets/svg/posts/CloseIcon';
import { useUser } from '@/context/UserContext';

const screenWidth = Dimensions.get("window").width; 

const MAX_LINES = 3;
const TEXT_LENGTH_THRESHOLD = 100;

const renderComment = (text: string) => {
    // Регулярное выражение для нахождения упоминаний в формате @[Name](ID)
    const mentionRegex = /\@\[(.+?)\]\((.+?)\)/g;
    
    // Разбиваем текст и заменяем упоминания на ссылки
    const parts = [];
    let lastIndex = 0;
    
    // Ищем все упоминания
    text.replace(mentionRegex, (match, name, id, offset): any => {
      // Добавляем текст перед упоминанием
      if (offset > lastIndex) {
        parts.push(<Text key={lastIndex} style={{fontFamily: "Montserrat500", fontSize: 15,}}>{text.slice(lastIndex, offset)}</Text>);
      }
  
      // Добавляем само упоминание как кликабельную ссылку
      parts.push(
          <Text style={{fontFamily: "Montserrat600", fontSize: 15, color: "#73843D"}} onPress={() => {}}>@{name}</Text>
      );
  
      // Обновляем индекс
      lastIndex = offset + match.length;
    });
  
    // Добавляем оставшийся текст после последнего упоминания
    if (lastIndex < text.length) {
      parts.push(<Text key={lastIndex} style={{fontFamily: "Montserrat500", fontSize: 15,}}>{text.slice(lastIndex)}</Text>);
    }
  
    return parts;
  };
const CommentCard = ({data, width, backgroundColor, setParentComment, setMentions, showReplies, setShowReplies, handleDeleteComment}: any) => {
    const { t } = useTranslation();
    const {user} = useUser();
    const [expanded, setExpanded] = useState(false);
    const [showToggle, setShowToggle] = useState(false);
    const [likesAmount, setLikesAmount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

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
    

    useEffect(() => {
        console.log(data.text);
        // Проверяем длину текста и устанавливаем состояние showToggle
        if (data?.text && data.text.length > TEXT_LENGTH_THRESHOLD) {
          setShowToggle(true);
        } else {
          setShowToggle(false);
        }
      }, [data?.text]);

    const fetchIsLiked = async () => {
        console.log("FETCHING is LIKEd");
        const token = await AsyncStorage.getItem("token");
        console.log(data._id)
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/likes/${data._id}/Comment/is-liked`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            }
        });
        const resdata = await res.json();
        console.log(data);
        setIsLiked(resdata.isLiked)
    }

    const toggleLike = async () => {
        const token = await AsyncStorage.getItem("token");
        // console.log(token);
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/likes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({
                objectId: data._id,
                objectType: "Comment"
            }),
        });
        const resData = await res.json();
        // console.log(resData);
        setLikesAmount(resData.likesCount);
        fetchIsLiked();
    }
    
    const fetchLikesAmount = async () => {
        const token = await AsyncStorage.getItem("token");
        // console.log(data);
        const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/likes/${data._id}/Comment/amount`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        if (response.ok) {
            const resData = await response.json();
            // console.log(resData);
            setLikesAmount(resData.likesCount);
        }
    }
    useEffect(() => {
        // console.log("-------------")
        // console.log("first", data)
        // console.log("-------------")
        fetchLikesAmount();
        fetchIsLiked();
    }, []);


    return (
        <View style={{width}}>
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
                {data.images.map((item: any, index: number) => (
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
                        <CloseIcon fill="white" />
                    </TouchableOpacity>
                    </View>
                ))}
                </ScrollView>
            </View>
        </Modal>
            <View style={{elevation: 2,shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1, backgroundColor, borderRadius: 10, paddingTop: 8, paddingBottom: 6, paddingHorizontal: 20, width: "100%" }}>
                <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                    <Text style={[{color: data.author?._id === user?._id ? "#000000" : "#73843D" , fontFamily: "Montserrat600", fontSize: 16}, ]}>{data.author?.name} {data.author?.surname} {data.author?._id === user?._id && <Text style={{color: "#9F9F9F"}}>{t("(you)")}</Text>}</Text>
                    <View style={{flexDirection: "row", gap: 7, alignItems: "center"}}>
                        {
                            data.replies.length > 0 &&
                            <View style={{flexDirection: "row", alignItems: "center", gap: 6}}>
                                <Text style={{color: "#8999B9", fontFamily: "Montserrat600", fontSize: 16}}>@</Text>
                                <Text style={{color: "#8999B9", fontFamily: "Montserrat600", fontSize: 18}}>{data.replies.length}</Text>
                            </View>
                        } 
                        <TouchableOpacity style={{flexDirection: "row", alignItems: "center"}} onPress={() => toggleLike()}>
                            {
                                isLiked ? 
                                <CommentLikeFilledIcon/>
                                :
                                <CommentLikeIcon/>
                            }
                            <Text style={{color: "#7A7A7A", fontFamily: "Montserrat600", fontSize: 16}}>{likesAmount}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <Text
                    style={{fontFamily: "Montserrat500", fontSize: 16, marginTop: 4}}
                    numberOfLines={expanded ? undefined : MAX_LINES}
                    ellipsizeMode="tail"
                >{data?.text}</Text> */}
                <Text
                    style={{fontFamily: "Montserrat500", fontSize: 15, marginTop: 4}}
                    numberOfLines={expanded ? undefined : MAX_LINES}
                    ellipsizeMode="tail"
                >{
                    renderComment(data?.text)
                }</Text>
                {showToggle && (
                    <TouchableOpacity
                        onPress={() => setExpanded(!expanded)}
                        style={{ marginTop: 4, alignSelf: "flex-start" }}
                    >
                        <Text style={{ color: "#808080", fontFamily: "Montserrat600", fontSize: 15, textDecorationLine: "underline" }}>
                        {expanded ? t("Show less") : t("Show more")}
                        </Text>
                    </TouchableOpacity>
                )}
                <ScrollView scrollEnabled={true} horizontal style={{marginTop: 11}}>
                    {
                        data?.images.map((item: string) => (
                            <Pressable onPress={() => setIsGalleryVisible(true)}>
                                <Image 
                                    source={{
                                        uri: item
                                    }}
                                    style={{height: 150, width: 200, borderRadius: 10, marginRight: 10}}
                                />
                            </Pressable>
                        ))
                    }
                </ScrollView>
                <View style={{flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 8}}>
                    {
                        data.author?._id === user?._id &&
                        <TouchableOpacity onPress={() => handleDeleteComment(data._id)}>
                            <Text style={{fontSize: 15, fontFamily: "Montserrat500", color: "#808080"}}>Delete</Text>
                        </TouchableOpacity>
                    }
                    {
                        data.parentComment &&
                        <TouchableOpacity
                            onPress={() => {
                                setParentComment(data.parentComment);
                                setMentions((prev: any) => [...prev, {_id: data?.author?._id, name: data?.author?.name, surname: data?.author?.surname}])
                            }}
                        >
                            <Text style={{fontSize: 15, fontFamily: "Montserrat600", color: "#808080"}}>Reply</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={{flexDirection: "row", gap: 8, marginTop: 6, alignItems: "center"}}>
                {
                    !data?.parentComment &&
                    <TouchableOpacity style={{ flexDirection: "row", gap: 5, alignItems: "center"}}
                        onPress={() => {
                            setParentComment(data);
                            setMentions((prev: any) => [...prev, {_id: data?.author?._id, name: data?.author?.name, surname: data?.author?.surname}])
                        }}
                    >
                        <ReplyCommentIcon style={{top: 1}}/>
                        <Text style={{fontFamily: "Montserrat600", color: "#808080", fontSize: 16}}>{t("Reply")}</Text>
                    </TouchableOpacity>
                }
                {
                    !showReplies && data?.replies.length > 0 &&
                    <>
                        <View style={{width: 5, height: 5, backgroundColor: "#828282", borderRadius: 10}}/>
                        <TouchableOpacity onPress={() => setShowReplies(true)}>
                            <Text style={{color: "#3C62AA", fontFamily: "Montserrat600", fontSize: 16}}>{t("View replies")}</Text>
                        </TouchableOpacity>
                    </>
                }
            </View>
        </View>
  )
}

export default CommentCard

const styles = StyleSheet.create({})