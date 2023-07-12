import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'

import UserDetailScreen from '../screens/profile/UserDetailScreen'
import CameraScreen from '../screens/camera/CameraScreen'
import DashboardPostScreen from '../screens/post/DashboardPostScreen'
import PageHomeScreen from '../screens/profile/PageHomeScreen'
import GardenDetailScreen from '../screens/garden/GardenDetailScreen'


import { MaterialIcons } from '@expo/vector-icons'
import IconTabBar from './IconTabBar'

const Tab = createBottomTabNavigator();

export default function TabBar({ navigation }) {
    return (

        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#63C71F',
                    borderTopColor: 'transparent',
                    borderTopLeftRadius: 25,
                    borderTopRightRadius: 25,
                    height: 55,
                    fontColor: 'white'
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'white',
                tabBarItemStyle: {
                    paddingBottom: 5,
                    paddingTop: 5,
                },
            }}
        >
            <Tab.Screen name='Profile' component={UserDetailScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="person" size={size} color={color} />
                    ),
                }} />

            <Tab.Screen name='Camera' component={CameraScreen} options={{
                //tabBarLabel: 'Profile',
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="add-a-photo" size={size} color={color} />
                ),
            }} />

            <Tab.Screen name='PageHome' component={PageHomeScreen} options={{
                tabBarLabel: 'PageHome',
                tabBarIcon: ({ focused, color, size }) => (
                    <IconTabBar size={size} color={color} focused={focused} />
                ),
            }} />

            <Tab.Screen name='DashboardPost' component={DashboardPostScreen}
                options={{
                    //tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notifications" size={size} color={color} />
                    ),
                }}
            />

            <Tab.Screen name='GardenDetail' component={GardenDetailScreen} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="search" size={size} color={color} />
                ),
            }} />

        </Tab.Navigator>
    )
}

