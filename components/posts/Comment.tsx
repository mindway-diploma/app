import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommentLikeIcon from '@/assets/svg/posts/CommentLikeIcon';
import { TouchableOpacity } from 'react-native';
import ReplyCommentIcon from '@/assets/svg/posts/ReplyCommentIcon';
import ReplyIcon from '@/assets/svg/posts/ReplyIcon';
import { useTranslation } from 'react-i18next';
import ImageIcon from '@/assets/svg/posts/ImageIcon';
import ProfileIcon from '@/assets/svg/ProfileIcon';
import CommentCard from './CommentCard';

const screenWidth = Dimensions.get("window").width; 



const Comment = ({data, setParentComment, setMentions, handleDeleteComment}: any) => {
    const { t } = useTranslation();
    const [showReplies, setShowReplies] = useState(false);
    // console.log(data);

    useEffect(() => {
        if (!data.replies.length)
            setShowReplies(false);
    }, [data.replies])
    return (
        <View>
            <View style={{flexDirection: "row", gap: 10}}>
                <View>
                    {
                        data?.author?.avatar ?
                        <Image
                            source={{
                                uri: data?.author?.avatar
                            }}
                            style={{width: 58, height: 58, borderRadius: 40, marginTop: 19}}
                        />
                        :
                        <View style={{width: 58, height: 58, borderRadius: 40, backgroundColor: "#eee", padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                            <ProfileIcon fill={"white"} stroke={"white"} size="large" />
                        </View>
                    }
                    {
                        data.images.length > 0 &&
                        <View style={{flexDirection: "row", gap: 10, alignItems: "center", justifyContent: "center", marginTop: 18}}>
                            <ImageIcon/>
                            <Text style={{fontFamily: "Montserrat500", fontSize: 20}}>{data.images.length}</Text>
                        </View>
                    }
                </View>
                <CommentCard data={data} width={screenWidth - 90} backgroundColor="#EEEEEE" setParentComment={setParentComment} setMentions={setMentions} showReplies={showReplies} setShowReplies={setShowReplies} handleDeleteComment={handleDeleteComment}/>
            </View>
            {
                showReplies &&
                <View style={{flexDirection: "row", gap: 10, paddingLeft: 17, marginTop: 13}}>
                    <ReplyIcon style={{marginTop: 18}}/>
                    <View style={{gap: 15}}>
                        {
                            data.replies.map((item: any) => (
                                <View style={{flexDirection: "row", gap: 10}}>
                                    {
                                        data?.author?.avatar ?
                                        <Image
                                            source={{
                                                uri: data?.author?.avatar
                                            }}
                                            style={{width: 58, height: 58, borderRadius: 40, marginTop: 19}}
                                        />
                                        :
                                        <View style={{width: 58, height: 58, borderRadius: 40, backgroundColor: "#eee",  marginTop: 19, padding: 10, alignItems: 'center', justifyContent: 'center'}}>
                                            <ProfileIcon fill={"white"} stroke={"white"} size="large" />
                                        </View>
                                    }
                                    <CommentCard data={item} width={screenWidth - 150} backgroundColor="#E8ECF4" setParentComment={setParentComment} setMentions={setMentions} showReplies={showReplies} setShowReplies={setShowReplies} handleDeleteComment={handleDeleteComment}/>
                                    {/* <View style={{width: screenWidth - 179}}>
                                        <View style={{elevation: 2, backgroundColor: "#E8ECF4", borderRadius: 10, paddingTop: 8, paddingBottom: 20, paddingHorizontal: 20, width: "100%" }}>
                                            <View style={{flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                                                <Text style={{color: item.author._id === user._id ? "#000000" : "#73843D", fontFamily: "Montserrat600", fontSize: 16}}>{data.author.name} {data.author.surname} {item.author._id === user._id && <Text style={{color: "#9F9F9F"}}>(you)</Text>}</Text>
                                                <View style={{flexDirection: "row", gap: 7, alignItems: "center"}}>
                                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                                        <CommentLikeIcon/>
                                                        <Text style={{color: "#7A7A7A", fontFamily: "Montserrat600", fontSize: 16}}>10</Text>
                                                    </View>
                                                </View>
                                            </View>
                                            <Text style={{fontFamily: "Montserrat500", fontSize: 16, marginTop: 4}}><Text style={{fontFamily: "Montserrat600", color: "#3C62AA"}}>{item.mentions.length > 0 ? `@${item.mentions[0].name} ${item.mentions[0].surname}` : ''}</Text> {item.text}</Text>
                                        </View>
                                    </View> */}
                                </View>
                            ))
                        }
                    <TouchableOpacity style={{alignItems: "center", justifyContent: "center"}} onPress={() => setShowReplies(false)}>
                        <Text style={{color: "#3C62AA", fontFamily: "Montserrat500"}}>{t("Hide replies")}</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            }
        </View>
  )
}

export default Comment

const styles = StyleSheet.create({})