import {
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { FC, useEffect, useState } from "react";
import { MentionInput, MentionSuggestionsProps, replaceMentionValues } from "react-native-controlled-mentions";
import { ScrollView } from "react-native-gesture-handler";
import { useTranslation } from "react-i18next";

interface User {
  _id: string;
  name: string;
  surname: string;
}

interface CommentInputProps {
  value: string;
  onValueChange: (value: string) => void;
  setMentions: any;
}

const renderSuggestions: FC<MentionSuggestionsProps> = ({keyword, onSuggestionPress}) => {
  const [suggestions, setSuggestions] = useState<User[]>([]);
  useEffect(() => {
    console.log(keyword)
    const fetchSuggestions = async () => {
      if (keyword && keyword.length > 0) {
        // console.log("Fetching..............")
        try {
          const response = await fetch(
            `${process.env.EXPO_PUBLIC_API_URL}/users/suggestions?keyword=${encodeURIComponent(keyword)}`
          );
          if (response.ok) {
            const data = await response.json();
            // console.log("_________________________________________-")
            // console.log(data);
            // console.log("_________________________________________-")
            // Предполагаем, что сервер возвращает массив пользователей
            setSuggestions(data);
          } else {
            setSuggestions([]);
          }
        } catch (error) {
          console.error("Error fetching suggestions:", error);
          setSuggestions([]);
        }
      } else {
        setSuggestions([]);
      }
    };
    fetchSuggestions();
  }, [keyword]);
  if (keyword == null) {
    return null;
  }
  return (
    <View
      pointerEvents="box-none"  // Пропускаем события к дочерним элементам
      style={{
        position: "absolute",
        zIndex: 10, 
        elevation: 2, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.3,
        shadowRadius: 1,
        bottom: 30,  // Регулируйте значение для правильного расположения
        width: "100%", 
        left: 0, 
        borderRadius: 10, 
        backgroundColor: "white",
        maxHeight: 150,
      }}
    >
    <ScrollView
      bounces={false}
      overScrollMode="never"
      nestedScrollEnabled={true}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={true} >
      {suggestions
        .filter(one => one.name.toLocaleLowerCase().includes(keyword.toLocaleLowerCase()))
        .map(one => (
          <Pressable
            key={one._id}
            onPress={() => onSuggestionPress({
              name: `${one.name} ${one.surname}`,
              id: one._id,
            })}

            style={{padding: 12, borderBottomWidth: 1, borderBottomColor: "#eee"}}
          >
            <Text>{one.name} {one.surname}</Text>
          </Pressable>
        ))
      }
    </ScrollView>
    </View>
  );
};


const CommentInput = ({ value, onValueChange, setMentions }: CommentInputProps) => {  
  const { t } = useTranslation();
  return (
    <View style={{ padding: 10, maxHeight: 150 }}>
      <MentionInput
        value={value}
        onChangeText={onValueChange}
        placeholder={t("Type a comment...")}
        partTypes={[
          {
            trigger: "@",
            renderSuggestions,
            textStyle: styles.mention,
            isInsertSpaceAfterMention: true,
          }
        ]}
        onChange={onValueChange}
      />
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  mention: {
    color: "#73843D",
    fontWeight: "bold",
  },
  suggestionItem: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 16,
  },
  container: {
    width: "80%",
  },
  overlay: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  // mention: {
  //   color: "#73843D",
  //   fontWeight: "bold",
  // },
  // normalText: {
  //   color: "black",
  // },
  // mentionItem: {
  //   padding: 10,
  //   borderBottomWidth: 1,
  //   borderBottomColor: "#eee",
  // },
  // mentionItemText: {
  //   color: "#007AFF",
  //   fontWeight: "bold",
  // },
});
