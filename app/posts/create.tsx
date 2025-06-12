import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  formateDate,
  formateDateAndTime,
  formatTime,
} from "@/utils/formateDate";
import AddPostHeaderIcon from "@/assets/svg/posts/AddPostHeaderIcon";
import SelectImageLargeIcon from "@/assets/svg/posts/SelectImageLargeIcon";
import SelectImageIcon from "@/assets/svg/posts/SelectImageIcon";
import * as ImagePicker from "expo-image-picker";
import RemoveIcon from "@/assets/svg/posts/RemoveIcon";
import { useTranslation } from "react-i18next";
import ProfileIcon from "@/assets/svg/ProfileIcon";
import Header from "@/components/Header";
import BackIcon from "@/components/BackIcon";
import GeneralIcon from "@/assets/svg/topics/GeneralIcon";
import NewsIcon from "@/assets/svg/topics/NewsIcon";
import TrendsIcon from "@/assets/svg/topics/TrendsIcon";
import LifestyleIcon from "@/assets/svg/topics/LifestyleIcon";
import IdeasIcon from "@/assets/svg/topics/IdeasIcon";
import ExperiencesIcon from "@/assets/svg/topics/ExperiencesIcon";

const topics = [
  {
    title: "General",
    value: "General",
    icon: (color: string) => <GeneralIcon color={color} />,
    bg: require('@/assets/images/topics/generalBg.png'),
  },
  {
    title: "NEWS",
    value: "NEWS",
    icon: (color: string) => <NewsIcon color={color} />,
    bg: require('@/assets/images/topics/newsBg.png'),
  },
  {
    title: "Trends",
    value: "Trends",
    icon: (color: string) => <TrendsIcon color={color} />,
    bg: require('@/assets/images/topics/trendsBg.png'),
  },
  {
    title: "Lifestyle",
    value: "Lifestyle",
    icon: (color: string) => <LifestyleIcon color={color} />,
    bg: require('@/assets/images/topics/lifestyleBg.png'),
  },
  {
    title: "ideas",
    value: "ideas",
    icon: (color: string) => <IdeasIcon color={color} />,
    bg: require('@/assets/images/topics/ideasBg.png'),
  },
  {
    title: "experiences",
    value: "experiences",
    icon: (color: string) => <ExperiencesIcon color={color} />,
    bg: require('@/assets/images/topics/experiencesBg.png'),
  },
];

const NewPostScreen = () => {
  const { t } = useTranslation();
  const [selectedImages, setSelectedImages] = useState<
    {
      uri: string;
      base64: string;
    }[]
  >([]);

  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topics[0].value);

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
      console.log((result?.assets as any)[0].uri);
      setSelectedImages((prev) => [
        ...prev,
        {
          uri: (result?.assets as any)[0].uri,
          base64: (result?.assets as any)[0].base64 as string,
        },
      ]);
    }
  };
  const handlePublishClick = async () => {
    if (postText.length === 0) return;

    setIsLoading(true);

    const token = await AsyncStorage.getItem("token");
    let payload: any = {
      images: [],
      topic: selectedTopic, // добавляем выбранный topic
    };

    selectedImages.forEach((image) => {
      let extension = image?.uri.split(".").pop()?.toLowerCase();
      let fileName = image?.uri.split("/").pop();
      payload.images.push({
        image: `data:image/${extension === "jpg" ? "jpeg" : extension};base64,${
          image.base64
        }`,
        name: fileName,
        type: `image/${extension === "jpg" ? "jpeg" : extension}`,
      });
    });
    payload.content = postText;

    const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    console.log(data);
    setSelectedImages([]);
    setPostText("");
    setIsLoading(false);
    if (res.ok) router.back();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <SafeAreaView style={styles.screenWrapper}>
        <Header
          titlePreIcon={<AddPostHeaderIcon />}
          title={t("New post")}
          titleStyle={{ color: "#FF9C01" }}
          leftContent={<BackIcon />}
          onLeftPress={() => router.back()}
          backgroundColor="#504F4E"
        />
        <ScrollView style={{ paddingTop: 60 }}>
          <View style={styles.itemsContainer}>
            <View>
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 40,
                  backgroundColor: "#eee",
                  padding: 10,
                  alignItems: "center",
                  justifyContent: "center",
                  alignSelf: "center",
                }}
              >
                
                  <ProfileIcon fill={"white"} stroke={"white"} size="large" />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  marginTop: 5,
                }}
              >
                <Text style={{ fontFamily: "Montserrat700", fontSize: 16, color: "#FFFFFF" }}>
                  Kate Miller
                </Text>
              </View>
            </View>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "Montserrat500",
                fontSize: 24,
                color: "#888888",
              }}
            >
              {t("What will you share today?")}
            </Text>
            {postText.length === 0 || isLoading ? (
              <TouchableOpacity
                disabled={isLoading}
                style={{
                  backgroundColor: "#989898",
                  borderRadius: 40,
                  width: 178,
                  alignSelf: "center",
                  padding: 9,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#DBDBDB",
                    fontFamily: "Montserrat600",
                    fontSize: 20,
                  }}
                >
                  {t("Publish")}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#406FC8",
                  borderRadius: 40,
                  width: 178,
                  alignSelf: "center",
                  padding: 9,
                  alignItems: "center",
                }}
                onPress={() => handlePublishClick()}
              >
                <Text
                  style={{
                    color: "#FFFFFF",
                    fontFamily: "Montserrat600",
                    fontSize: 20,
                  }}
                >
                  {t("Publish")}
                </Text>
              </TouchableOpacity>
            )}
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#B0B0B0",
                borderRadius: 35,
                backgroundColor: "white",
                paddingVertical: 18,
                paddingHorizontal: 36,
                width: "100%",
              }}
              multiline={true}
              placeholder={t("Enter the post text...")}
              placeholderTextColor={"black"}
              value={postText}
              onChangeText={setPostText}
            />
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
              {topics.map((topic) => (
                <TouchableOpacity
                  key={topic.value}
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    backgroundColor: selectedTopic === topic.value ? "#406FC8" : "#E7E7E7",
                    borderRadius: 20,
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    margin: 4,
                  }}
                  onPress={() => setSelectedTopic(topic.value)}
                >
                  {topic.icon(selectedTopic === topic.value ? "white" : "#406FC8")}
                  <Text style={{
                    color: selectedTopic === topic.value ? "white" : "#406FC8",
                    marginLeft: 8,
                    fontFamily: "Montserrat600",
                    fontSize: 16,
                  }}>
                    {topic.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            {selectedImages[4] ? (
              <View style={{ position: "relative" }}>
                <Image
                  source={{
                    uri: selectedImages[4].uri,
                  }}
                  style={{ width: 342, height: 236, borderRadius: 12 }}
                />
                <TouchableOpacity
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius: 20,
                    backgroundColor: "white",
                    position: "absolute",
                    right: 13,
                    top: 13,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => removeImage(4)}
                >
                  <RemoveIcon />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={{
                  backgroundColor: "#E7E7E7",
                  borderWidth: 1,
                  borderColor: "#969696",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  paddingTop: 36,
                  paddingBottom: 55,
                  paddingHorizontal: 71,
                  borderRadius: 20,
                }}
                onPress={() => pickImage()}
              >
                <SelectImageLargeIcon />
                <Text
                  style={{
                    fontFamily: "Montserrat700",
                    color: "#969696",
                    fontSize: 18,
                  }}
                >
                  {t("Import from gallery")}
                </Text>
              </TouchableOpacity>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {selectedImages[0] ? (
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri: selectedImages[0].uri,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 12 }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 20,
                      backgroundColor: "white",
                      position: "absolute",
                      right: -8,
                      top: -8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => removeImage(0)}
                  >
                    <RemoveIcon />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E7E7E7",
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "#969696",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 15,
                    borderRadius: 12,
                  }}
                >
                  <SelectImageIcon />
                </TouchableOpacity>
              )}
              {selectedImages[1] ? (
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri: selectedImages[1].uri,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 12 }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 20,
                      backgroundColor: "white",
                      position: "absolute",
                      right: -8,
                      top: -8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => removeImage(1)}
                  >
                    <RemoveIcon />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E7E7E7",
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "#969696",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 15,
                    borderRadius: 12,
                  }}
                >
                  <SelectImageIcon />
                </TouchableOpacity>
              )}
              {selectedImages[2] ? (
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri: selectedImages[2].uri,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 12 }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 20,
                      backgroundColor: "white",
                      position: "absolute",
                      right: -8,
                      top: -8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => removeImage(2)}
                  >
                    <RemoveIcon />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E7E7E7",
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "#969696",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 15,
                    borderRadius: 12,
                  }}
                >
                  <SelectImageIcon />
                </TouchableOpacity>
              )}
              {selectedImages[3] ? (
                <View style={{ position: "relative" }}>
                  <Image
                    source={{
                      uri: selectedImages[3].uri,
                    }}
                    style={{ width: 70, height: 70, borderRadius: 12 }}
                  />
                  <TouchableOpacity
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: 20,
                      backgroundColor: "white",
                      position: "absolute",
                      right: -8,
                      top: -8,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    onPress={() => removeImage(3)}
                  >
                    <RemoveIcon />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#E7E7E7",
                    width: 70,
                    height: 70,
                    borderWidth: 1,
                    borderColor: "#969696",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 15,
                    borderRadius: 12,
                  }}
                >
                  <SelectImageIcon />
                </TouchableOpacity>
              )}
            </View>
          </View>
          <View style={{ height: 88 }} />
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default NewPostScreen;

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
    width: "100%",
    backgroundColor: "#504F4E",
    alignSelf: "center",
  },
  itemsContainer: {
    marginTop: 35,
    marginBottom: 150,
    padding: 22,
    gap: 33,
  },
});
