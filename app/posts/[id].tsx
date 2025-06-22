import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useRef, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Comment from "@/components/posts/Comment";
import CommentInput from "@/components/posts/CommentInput";
import * as ImagePicker from "expo-image-picker";
import { useTranslation } from "react-i18next";
import CloseIcon from "@/assets/svg/posts/CloseIcon";
import SelectedImagesIcon from "@/assets/svg/posts/SelectedImagesIcon";
import ReplyStaticIcon from "@/assets/svg/posts/ReplyStaticIcon";
import PostCard from "@/components/cards/PostCard";
import { mentionRegEx } from "react-native-controlled-mentions";
import { useUser } from "@/context/UserContext";
import PhotoIcon from "@/assets/svg/posts/PhotoIcon";
import SendIcon from "@/assets/svg/posts/SendIcon";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import Header from "@/components/Header";
import BackIcon from "@/components/BackIcon";
import { LinearGradient } from "expo-linear-gradient";

interface User {
  _id: string;
  name: string;
  surname: string;
}

interface CommentData {
  id: string;
  text: string;
  mentions: User[];
}
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
      parts.push(
        <Text
          key={lastIndex}
          style={{ fontFamily: "Montserrat500", fontSize: 15 }}
        >
          {text.slice(lastIndex, offset)}
        </Text>
      );
    }

    // Добавляем само упоминание как кликабельную ссылку
    parts.push(
      <Text
        style={{ fontFamily: "Montserrat600", fontSize: 15, color: "#73843D" }}
        onPress={() => {}}
      >
        @{name}
      </Text>
    );

    // Обновляем индекс
    lastIndex = offset + match.length;
  });

  // Добавляем оставшийся текст после последнего упоминания
  if (lastIndex < text.length) {
    parts.push(
      <Text
        key={lastIndex}
        style={{ fontFamily: "Montserrat500", fontSize: 15 }}
      >
        {text.slice(lastIndex)}
      </Text>
    );
  }

  return parts;
};

const allUsers: User[] = [
  { _id: "u1", name: "Ann", surname: "Brooks" },
  { _id: "u2", name: "Kate", surname: "Miller" },
  { _id: "u3", name: "Ivan", surname: "Priyadko" },
];

const topicColor = {
    "General": ["#fff", "rgba(255, 255, 255, 0)"],
    "experiences": ["#C8FBD8", "rgba(255, 255, 255, 0)"],
    "ideas": ["#FFC390", "rgba(255, 255, 255, 0)"],
    "NEWS": ["#BBE2FF", "rgba(255, 255, 255, 0)"],
    "Trends": ["#F5BAD7", "rgba(255, 255, 255, 0)"],
    "Lifestyle": ["#D3FAC1", "rgba(255, 255, 255, 0)"],
}

const Post = () => {
  const { t } = useTranslation();
  const { user } = useUser();

  const { id } = useLocalSearchParams();
  const { data } = useLocalSearchParams();
  const parsedData = JSON.parse(data as string);
  // console.log(parsedData);
  const [likes, setLikes] = useState([]);
  const [comments, setComments] = useState<any>([]);

  const [showComments, setShowComments] = useState(true);
  const [parentComment, setParentComment] = useState<any>(null);

  const [commentInput, setCommentInput] = useState("");
  const [mentions, setMentions] = useState<
    { _id: string; name: string; surname: string }[]
  >([]);

  const [isLoading, setIsLoading] = useState(false);

  const [selectedImages, setSelectedImages] = useState<
    {
      uri: string;
      base64: string;
      ratio: number;
    }[]
  >([]);

  const handleCommentSubmit = (text: string, mentions: User[]) => {
    const newComment: CommentData = {
      id: Date.now().toString(), // простой способ создать уникальный ID
      text,
      mentions,
    };
    setComments((prev: any) => [...prev, newComment]);
  };

  const removeImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      // console.log((result?.assets as any)[0].uri);
      setSelectedImages((prev) => [
        ...prev,
        {
          uri: (result?.assets as any)[0].uri,
          base64: (result?.assets as any)[0].base64 as string,
          ratio:
            (result?.assets as any)[0].width /
            (result?.assets as any)[0].height,
        },
      ]);
    }
  };

  const sendComment = async () => {
    // console.log("Send comment");
    if (commentInput && commentInput.length) {
      setIsLoading(true);
      // console.log(commentInput);
      const token = await AsyncStorage.getItem("token");

      const mentionsArray = [];
      const mentionMatches = commentInput.matchAll(mentionRegEx);
      for (const match of mentionMatches) {
        console.log(match);
        mentionsArray.push(match[4]);
      }

      console.log("Extracted mentions:", mentionsArray);

      let payload: any = {
        images: [],
      };
      selectedImages.forEach((image) => {
        let extension = image?.uri.split(".").pop()?.toLowerCase();
        let fileName = image?.uri.split("/").pop();
        payload.images.push({
          image: `data:image/${
            extension === "jpg" ? "jpeg" : extension
          };base64,${image.base64}`,
          name: fileName,
          type: `image/${extension === "jpg" ? "jpeg" : extension}`,
        });
      });
      console.log(parentComment);
      if (parentComment) {
        payload.parentCommentId = parentComment._id;
      } else {
        payload.parentCommentId = null;
      }
      payload.post = id;
      payload.text = commentInput;
      payload.mentions = mentions;
      const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setCommentInput("");
        setSelectedImages([]);
        setMentions([]);
        setParentComment(null);
        await fetchFullComments();
      }
      setIsLoading(false);
    }
  };
  const fetchFullComments = async () => {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/comments/post/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    // console.log("Comment data", data);
    setComments(data);
  };
  const fetchFullLikes = async () => {
    const token = await AsyncStorage.getItem("token");

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/likes/${id}/Post`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    // console.log(data);
    setLikes(data);
  };

  const handelDeleteComment = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/comments/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    // console.log(data);
    await fetchFullComments();
  };

  const removePost = async (id: string) => {
    const token = await AsyncStorage.getItem("token");
    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    router.back();
    // console.log(data);
  };

  useEffect(() => {
    setCommentInput((prev) =>
      mentions.length
        ? `@${mentions[0].name} ${mentions[0].surname} `
        : "" + prev
    );
    // console.log(parentComment)
  }, [mentions]);

  useEffect(() => {
    fetchFullLikes();
    fetchFullComments();
  }, []);

  const targetComponentRef = useRef<View>(null);
  const targetInputRef = useRef<View>(null);
  const scrollViewRef = useRef<ScrollView>(null);
  const [inputY, setInputY] = useState<number | null>(null);

  // Сохраняем позицию поля ввода при рендере
  const handleInputLayout = (event: any) => {
    setInputY(event.nativeEvent.layout.y);
  };

  // Скроллим и фокусируем, если нужно
  useEffect(() => {
    if (parsedData.scrollToComment && inputY !== null && scrollViewRef.current && targetInputRef.current) {
      scrollViewRef.current.scrollTo({ x: 0, y: inputY, animated: true });
      setTimeout(() => {
        targetInputRef.current?.focus();
      }, 350);
    }
  }, [parsedData.scrollToComment, inputY]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
        <LinearGradient
            colors={topicColor[parsedData.topic as "General" | "NEWS" | "Trends" | "Lifestyle" | "ideas" | "experiences"] as [string, string]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{position: "absolute", top: 0, left: 0, right: 0, height: 200}}
        >
            
        </LinearGradient>
      <Header
        title={""}
        style={{backgroundColor: "transparent", elevation: 0, shadowColor: "transparent"}}
        backgroundColor="rgba(255, 255, 255, 0)"
        leftContent={<BackIcon />}
        onLeftPress={() => router.back()}
      />
      <ScrollView
        style={{ paddingTop: 80 }}
        ref={scrollViewRef}
        contentContainerStyle={{ paddingBottom: 0, flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        scrollEnabled={true}
        bounces={false}
        overScrollMode="never"
      >
        <SafeAreaView style={styles.screenWrapper}>
          <View style={styles.itemsContainer}>
            <PostCard
                topic={parsedData.topic}
              content={parsedData.content}
              id={id as string}
              user={{
                _id: parsedData.user._id,
                displayName: parsedData.user.displayName,
                avatar: parsedData.user.avatar,
              }}
              date={parsedData.date}
              removePost={removePost}
              time={parsedData.time}
              images={parsedData.images}
              showFullContent={true}
              onLike={() => fetchFullLikes()}
              showActions={user?._id === parsedData.user._id}
            />
            <View
              style={{ backgroundColor: "#F7F7F7", borderRadius: 37 }}
            >
              <View
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 23,
                  flexDirection: "row",
                }}
              >
                <TouchableOpacity
                  style={[
                    {
                      width: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderBottomWidth: !showComments ? 2 : 0,
                      borderBottomColor: "#73843D",
                    },
                  ]}
                  onPress={() => setShowComments(false)}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat600",
                      color: !showComments ? "#73843D" : "#9F9F9F",
                      fontSize: 19,
                    }}
                  >
                    {t("Like")}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    {
                      width: "50%",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: 10,
                      borderBottomWidth: showComments ? 2 : 0,
                      borderBottomColor: "#73843D",
                    },
                  ]}
                  onPress={() => setShowComments(true)}
                >
                  <Text
                    style={{
                      fontFamily: "Montserrat600",
                      color: showComments ? "#73843D" : "#9F9F9F",
                      fontSize: 19,
                    }}
                  >
                    {t("Comments")}
                  </Text>
                </TouchableOpacity>
              </View>

              {showComments && (
                <>
                  <View
                    style={{
                      backgroundColor: "#EDEDED",
                      marginTop: 20,
                      elevation: 3,
                      shadowColor: "#000",
                      shadowOffset: { width: 0, height: 0 },
                      shadowOpacity: 0.3,
                      shadowRadius: 1,
                      paddingTop: 21,
                      paddingBottom: 27,
                      paddingHorizontal: 10,
                    }}
                  >
                    {parentComment && (
                      <View
                        style={{
                          height: 40,
                          flexDirection: "row",
                          gap: 16,
                          opacity: 1,
                        }}
                      >
                        <View style={{ width: 48, height: 48 }} />
                        <View
                          style={{
                            flex: 1,
                            flexDirection: "row",
                            gap: 5,
                            alignItems: "center",
                          }}
                        >
                          <ReplyStaticIcon />
                          <View
                            style={{
                              backgroundColor: "rgba(223, 234, 255, 1)",
                              flex: 1,
                              paddingVertical: 6,
                              paddingHorizontal: 12,
                              borderRadius: 40,
                            }}
                          >
                            <Text style={{ color: "black" }}>
                              {renderComment(parentComment?.text)}
                            </Text>
                          </View>
                        </View>
                      </View>
                    )}
                    <View style={{ flexDirection: "row", gap: 16 }}>
                      <View>
                        {user?.avatar ? (
                          <Image
                            source={{
                              uri: user?.avatar,
                            }}
                            style={{ width: 48, height: 48, borderRadius: 40 }}
                          />
                        ) : (
                          <>
                            <View
                              style={{
                                width: 48,
                                height: 48,
                                borderRadius: 40,
                                backgroundColor: "#eee",
                                padding: 10,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <ProfileIcon
                                fill={"white"}
                                stroke={"white"}
                                size="large"
                              />
                            </View>
                          </>
                        )}
                        {selectedImages.length > 0 && (
                          <View
                            style={{
                              flexDirection: "row",
                              marginTop: 8,
                              alignItems: "center",
                              justifyContent: "center",
                              gap: 9,
                            }}
                          >
                            <SelectedImagesIcon />
                            <Text
                              style={{
                                fontFamily: "Montserrat500",
                                fontSize: 19,
                              }}
                            >
                              {selectedImages.length}/5
                            </Text>
                          </View>
                        )}
                      </View>
                      <View
                        style={{
                          alignItems: "center",
                          justifyContent: "space-between",
                          backgroundColor: "white",
                          paddingLeft: 20,
                          paddingRight: 7,
                          borderWidth: 1,
                          borderColor: "#B0B0B0",
                          elevation: 2,
                          shadowColor: "#000",
                          shadowOffset: { width: 0, height: 0 },
                          shadowOpacity: 0.3,
                          shadowRadius: 1,
                          flex: 1,
                          borderRadius: 30,
                        }}
                        onLayout={handleInputLayout} // <--- ВАЖНО!
                      >
                        <View
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            gap: 14,
                            marginTop: selectedImages.length > 0 ? 15 : 0,
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <TouchableOpacity onPress={() => pickImage()}>
                            <PhotoIcon />
                          </TouchableOpacity>
                          {selectedImages.length > 0 ? (
                            <ScrollView
                              horizontal
                              style={{
                                flexDirection: "row",
                                width: "65%",
                                gap: 10,
                                zIndex: 99,
                              }}
                            >
                              {selectedImages?.map((item, index) => (
                                <View
                                  style={{
                                    position: "relative",
                                    marginRight: 10,
                                    marginTop: 10,
                                  }}
                                >
                                  <TouchableOpacity
                                    style={{
                                      position: "absolute",
                                      top: -8,
                                      right: -8,
                                      width: 22,
                                      backgroundColor: "black",
                                      height: 22,
                                      alignItems: "center",
                                      justifyContent: "center",
                                      borderRadius: 30,
                                      zIndex: 100,
                                    }}
                                    onPress={() => removeImage(index)}
                                  >
                                    <CloseIcon />
                                  </TouchableOpacity>
                                  <Image
                                    source={{
                                      uri: item.uri,
                                    }}
                                    style={{
                                      height: 60,
                                      borderRadius: 6,
                                      borderColor: "#eee",
                                      borderWidth: 1,
                                      aspectRatio: item.ratio,
                                    }}
                                    resizeMode="cover"
                                  />
                                </View>
                              ))}
                            </ScrollView>
                          ) : (
                            <View style={{ width: "65%" }} ref={targetInputRef}>
                              <CommentInput
                                value={commentInput}
                                onValueChange={(text: string) => setCommentInput(text)}
                                setMentions={setMentions}
                              />
                            </View>
                          )}
                          {isLoading || commentInput.length === 0 ? (
                            <TouchableOpacity
                              disabled={true}
                              style={{
                                width: 39,
                                height: 39,
                                backgroundColor: "#A6A6A6",
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <SendIcon />
                            </TouchableOpacity>
                          ) : (
                            <TouchableOpacity
                              onPress={() => sendComment()}
                              style={{
                                width: 39,
                                height: 39,
                                backgroundColor: "#73843D",
                                borderRadius: 30,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <SendIcon />
                            </TouchableOpacity>
                          )}
                          {/* <AppTextInput
                                style={{flex: 1, marginLeft: 14,}}
                                multiline={true}
                                placeholder={t('Add a comment. Use @ to mention')}
                                value={commentInput}
                                onChangeText={(text) => setCommentInput(text)}
                              /> */}
                        </View>
                        {selectedImages.length > 0 && (
                          <View style={{ width: "70%" }}>
                            <CommentInput
                              value={commentInput}
                              onValueChange={(text: string) => setCommentInput(text)}
                              setMentions={setMentions}
                            />
                          </View>
                        )}
                      </View>
                      {/* <MentionInput users={[
                            { id: 1, name: "John", surname: "Doe" },
                            { id: 2, name: "Jane", surname: "Smith" },
                            { id: 3, name: "Alex", surname: "Brown" },
                          ]}/> */}
                    </View>
                  </View>
                </>
              )}
              {showComments ? (
                <View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 40,
                    paddingHorizontal: 10,
                    marginTop: 25,
                    gap: 25,
                  }}
                >
                  {comments.map((item: any) => (
                    <Comment
                      data={item}
                      setParentComment={setParentComment}
                      setMentions={setMentions}
                      handleDeleteComment={handelDeleteComment}
                    />
                  ))}
                </View>
              ) : (
                <View
                  style={{
                    paddingTop: 10,
                    paddingBottom: 40,
                    paddingHorizontal: 23,
                    marginTop: 10,
                    gap: 25,
                  }}
                >
                  {likes.map((item: any) => (
                    <View
                      style={{
                        width: "100%",
                        backgroundColor: "#EEEEEE",
                        alignItems: "center",
                        borderRadius: 40,
                        flexDirection: "row",
                        justifyContent: "space-between",
                        paddingRight: 38,
                        elevation: 2,
                        shadowColor: "#000",
                        shadowOffset: { width: 0, height: 0 },
                        shadowOpacity: 0.3,
                        shadowRadius: 1,
                      }}
                    >
                      {item.user.avatar ? (
                        <Image
                          source={{
                            uri: item.user.avatar,
                          }}
                          style={{
                            width: 58,
                            height: 58,
                            borderRadius: 40,
                          }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 58,
                            height: 58,
                            borderRadius: 40,
                            backgroundColor: "#eee",
                            padding: 10,
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <ProfileIcon
                            fill={"white"}
                            stroke={"white"}
                            size="large"
                          />
                        </View>
                      )}
                      <Text
                        style={{
                          fontFamily: "Montserrat600",
                          fontSize: 16,
                          color: "#73843D",
                        }}
                      >
                        {item.user.name} {item.user.surname}
                      </Text>
                      <TouchableOpacity
                        style={{
                          borderWidth: 1,
                          borderColor: "#73843D",
                          borderRadius: 40,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingHorizontal: 10,
                          paddingVertical: 3,
                        }}
                        // onPress={() =>
                        //   router.push({
                        //     pathname: "/profile/otherUserProfile",
                        //     params: { data: JSON.stringify(item.user._id) },
                        //   })
                        // }
                      >
                        <Text
                          style={{
                            fontFamily: "Montserrat600",
                            fontSize: 16,
                            color: "#73843D",
                          }}
                        >
                          {t("View profile")}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
        </SafeAreaView>
        <View style={{ height: 88 }} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Post;

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    color: "black",
    fontFamily: "Montserrat700",
  },
  headerTitleOutlined: {
    color: "#73843D",
  },
  headerTop: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    // justifyContent: "center",
    justifyContent: "space-between",
  },
  headerButton: {
    // position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    // left: 37,
    marginHorizontal: 37,
    width: 25,
  },
  screenWrapper: {
    height: "100%",
    flex: 1,
    paddingBottom: 100,
    width: "100%",
    alignSelf: "center",
  },
  itemsContainer: {
    marginTop: 0,
    gap: 33,
  },
});
