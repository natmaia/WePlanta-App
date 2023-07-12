import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { registerRootComponent } from 'expo';

import { NavigationContainer } from '@react-navigation/native';

import Home from './src/screens/home/HomeScreen';
import Login from './src/screens/login/UserLogin';
import LoginBio from './src/screens/login/UserLoginBio';
import UserAddScreen from './src/screens/register/UserAddScreen';
import UserAddressScreen from './src/screens/register/UserAddressScreen';
import ChatScreen from './src/screens/chat/ChatScreen';
import CameraScreen from './src/screens/camera/CameraScreen';
import GardenDeleteScreen from './src/screens/garden/GardenDeleteScreen';
import GardenDetailScreen from './src/screens/garden/GardenDetailScreen';
import GardenEditScreen from './src/screens/garden/GardenEditScreen';
import GardenNoteAddScreen from './src/screens/garden/GardenNoteAddScreen';
import GardenNoteDeleteScreen from './src/screens/garden/GardenNoteDeleteScreen';
import GardenNoteEditScreen from './src/screens/garden/GardenNoteEditScreen';
import GardenNotesScreen from './src/screens/garden/GardenNotesScreen';
import UserGardenAddScreen from './src/screens/garden/UserGardenAddScreen';
import DashboardPostScreen from './src/screens/post/DashboardPostScreen';
import PostCommentAddScreen from './src/screens/post/PostCommentAddScreen';
import PostCommentDeleteScreen from './src/screens/post/PostCommentDeleteScreen';
import PostDeleteScreen from './src/screens/post/PostDeleteScreen';
import PostDetailScreen from './src/screens/post/PostDetailScreen';
import PageHomeScreen from './src/screens/profile/PageHomeScreen';
import UserDetailScreen from './src/screens/profile/UserDetailScreen';
import UserEditScreen from './src/screens/profile/UserEditScreen';
import UserGardensScreen from './src/screens/profile/UserGardensScreen';
import UserPasswordUpdateScreen from './src/screens/profile/UserPasswordUpdateScreen';
import UserPostsScreen from './src/screens/profile/UserPostsScreen';

import HomePage from './src/routes/HomePage';


import TabBar from './src/components/TabBar';
import Menu from './src/components/Menu';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="LoginBio" component={LoginBio} />
        <Stack.Screen name="HomePage" component={HomePage} />


        <Stack.Screen name="UserAddScreen" component={UserAddScreen} />
        <Stack.Screen name="UserAddressScreen" component={UserAddressScreen} />
        <Stack.Screen name="UserGardenAddScreen" component={UserGardenAddScreen} />
        <Stack.Screen name="ChatScreen" component={ChatScreen} />
        <Stack.Screen name="CameraScreen" component={CameraScreen} />
        <Stack.Screen name="GardenDeleteScreen" component={GardenDeleteScreen} />
        <Stack.Screen name="GardenDetailScreen" component={GardenDetailScreen} />
        <Stack.Screen name="GardenEditScreen" component={GardenEditScreen} />
        <Stack.Screen name="GardenNoteAddScreen" component={GardenNoteAddScreen} />
        <Stack.Screen name="GardenNoteDeleteScreen" component={GardenNoteDeleteScreen} />
        <Stack.Screen name="GardenNoteEditScreen" component={GardenNoteEditScreen} />
        <Stack.Screen name="GardenNotesScreen" component={GardenNotesScreen} />
        <Stack.Screen name="DashboardPostScreen" component={DashboardPostScreen} />
        <Stack.Screen name="PostCommentAddScreen" component={PostCommentAddScreen} />
        <Stack.Screen name="PostCommentDeleteScreen" component={PostCommentDeleteScreen} />
        <Stack.Screen name="PostDeleteScreen" component={PostDeleteScreen} />
        <Stack.Screen name="PostDetailScreen" component={PostDetailScreen} />
        <Stack.Screen name="PageHomeScreen" component={PageHomeScreen} />
        <Stack.Screen name="UserDetailScreen" component={UserDetailScreen} />
        <Stack.Screen name="UserEditScreen" component={UserEditScreen} />
        <Stack.Screen name="UserGardensScreen" component={UserGardensScreen} />
        <Stack.Screen name="UserPasswordUpdateScreen" component={UserPasswordUpdateScreen} />
        <Stack.Screen name="UserPostsScreen" component={UserPostsScreen} />
        <Stack.Screen name="TabBar" component={TabBar} />
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );

}
registerRootComponent(App);
