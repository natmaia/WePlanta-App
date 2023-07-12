import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';

import Post from './PostDetailScreen';

export default function DashboardPostScreen({navigation}) {
  return (
    <View style={{ backgroundColor: 'white', height: '100%' }}>
      <StatusBar backgroundColor="white" barStyle="dark-content" animated={true} />
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingHorizontal: 15,
          alignItems: 'center',
        }}
      >

        <Text style={{ fontSize: 20, fontWeight: '500' }}>Comunidade e Rede de Apoio</Text>
        <FontAwesome name="plus-square-o" style={{ fontSize: 24, color: "#63C71F" }} onPress={() => navigation.navigate("PageHomeScreen")} />

        {/* <Feather name="navigation" style={{ fontSize: 24 }} /> */}
      </View>

      <ScrollView>
        <Post />
        <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
          <Ionicons name="ios-reload-circle-sharp" style={{ fontSize: 60, opacity: 0.2, }} />
        </View>
      </ScrollView>
    </View>
  );
}
