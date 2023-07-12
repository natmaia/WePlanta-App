import axios from 'axios';
import React, { useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AntDesign, Entypo, Feather, Ionicons } from 'react-native-vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Botao from "../../components/ButtonDefault";

export default function PostDetailScreen({ route }) {
    const [postInfo, setPostInfo] = useState([
        {
            postTitle: 'mr shermon',
            postPersonImage: require('../../storage/images/userProfile.png'),
            postImage: require('../../storage/images/post2.png'),
            likes: 765,
            isLiked: false,
        },
        {
            postTitle: 'chillhouse',
            postPersonImage: require('../../storage/images/profile5.png'),
            postImage: require('../../storage/images/post5.png'),
            likes: 345,
            isLiked: false,
        },
        {
            postTitle: 'Tom',
            postPersonImage: require('../../storage/images/profile4.png'),
            postImage: require('../../storage/images/post3.png'),
            likes: 734,
            isLiked: false,
        },
        {
            postTitle: 'The_Groot',
            postPersonImage: require('../../storage/images/profile3.png'),
            postImage: require('../../storage/images/post4.png'),
            likes: 875,
            isLiked: false,
        },
    ]);

    const handleAddPost = async () => {
        const newPost = {
            // Obtenha os detalhes do novo post a partir do formulário
        };

        try {
            const response = await axios.post('https://localhost:8080/users/add', newPost);
            setPostInfo([...postInfo, response.data]); 
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdatePost = async (postId, updatedPost) => {
        try {
            await axios.put(`URL_DO_ENDPOINT_API/${postId}`, updatedPost);

            const updatedPostInfo = postInfo.map((post) =>
                post.id === postId ? { ...post, ...updatedPost } : post
            );
            setPostInfo(updatedPostInfo);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    {postInfo.map((data, index) => {
                        const [like, setLike] = useState(data.isLiked);
                        return (
                            <View
                                key={index}
                                style={{
                                    paddingBottom: 10,
                                    borderBottomColor: 'gray',
                                    borderBottomWidth: 0.1,
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        padding: 15,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image
                                            source={data.postPersonImage}
                                            style={{ width: 40, height: 40, borderRadius: 100 }}
                                        />
                                        <View style={{ paddingLeft: 5 }}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold' }}>
                                                {data.postTitle}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        position: 'relative',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                >
                                    <Image
                                        source={data.postImage}
                                        style={{ width: '100%', height: 400 }}
                                    />
                                </View>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        paddingHorizontal: 12,
                                        paddingVertical: 15,
                                    }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity onPress={() => setLike(!like)}>
                                            <AntDesign
                                                name={like ? 'heart' : 'hearto'}
                                                style={{
                                                    paddingRight: 10,
                                                    fontSize: 20,
                                                    color: like ? 'red' : '#63C71F',
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity>
                                            <Ionicons
                                                name="ios-chatbubble-outline"
                                                style={{ fontSize: 20, paddingRight: 10, color: '#63C71F'}}
                                            />
                                        </TouchableOpacity>

                                    </View>
                                </View>
                                <View style={{ paddingHorizontal: 15 }}>
                                    <Text>
                                        Liked by {like ? 'you and' : ''}{' '}
                                        {like ? data.likes + 1 : data.likes} others
                                    </Text>
                                    <Text
                                        style={{
                                            fontWeight: '700',
                                            fontSize: 14,
                                            paddingVertical: 2,
                                        }}
                                    >
                                    </Text>
                                    <Text style={{ opacity: 0.4, paddingVertical: 2 }}>
                                        View all comments
                                    </Text>
                                    <View
                                        style={{ flexDirection: 'row', justifyContent: 'space-between' }}
                                    >
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Image
                                                source={data.postPersonImage}
                                                style={{
                                                    width: 25,
                                                    height: 25,
                                                    borderRadius: 100,
                                                    backgroundColor: 'orange',
                                                    marginRight: 10,
                                                }}
                                            />
                                            <TextInput
                                                placeholder="Add a comment "
                                                style={{ opacity: 0.5 }}
                                            />
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <MaterialIcons name="mood" size={20} color={'#710B6D'} />
                                        <MaterialIcons name="sentiment-dissatisfied" size={20} color={'#0B1571'} />
                                        <MaterialIcons name="mood" size={20} color={'#34710B'} />
                                        </View>

                                    </View>
                                </View>
                            </View>
                        );
                    })}

                </View>
            </ScrollView>

        </SafeAreaView>

    );
}
