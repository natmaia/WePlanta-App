import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, Text, View, SafeAreaView } from 'react-native';

import PostDetailScreen from '../post/PostDetailScreen';

export default function PageHomeScreen({ navigation }) {
  return (
    <SafeAreaView>
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

        </View>

        <ScrollView>
          <PostDetailScreen />
          <View style={{ justifyContent: 'center', alignItems: 'center', padding: 20 }}>
            <Ionicons name="ios-reload-circle-sharp" style={{ fontSize: 60, opacity: 0.2, }} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
