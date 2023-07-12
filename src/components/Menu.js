import { createDrawerNavigator } from '@react-navigation/drawer';
import React from 'react';

import UserDetailScreen from '../screens/profile/UserDetailScreen';
import UpdateUserScreen from '../screens/profile/UpdateUserScreen';
import UserGardenAddScreen from '../screens/garden/UserGardenAddScreen';
import PostDetailScreen from '../screens/post/PostDetailScreen';

const Drawer = createDrawerNavigator();

export default function Menu({ navigation, route }) {
  return (
    <Drawer.Navigator initialRouteName="Publicações">
      <Drawer.Screen
        name="Jardim"
        component={UserDetailScreen}
        initialParams={{ id: route.params.id }}
      />
      <Drawer.Screen
        name="UpdateUserScreen"
        component={() => (
          <UpdateUserScreen
            id={route.params.id}
            token={route.params.token}
          />
        )}
      />
      <Drawer.Screen name="Adicionar Garden" component={UserGardenAddScreen} />
      <Drawer.Screen name="Publicações" component={PostDetailScreen} />
    </Drawer.Navigator>
  );
}

