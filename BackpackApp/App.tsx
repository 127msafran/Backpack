import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Modal, Platform } from 'react-native';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Assignments from './pages/Assignments';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

export default function App() {
  const NativeTabs = createNativeBottomTabNavigator();
  const Drawer = createDrawerNavigator();
  const [color, setColor] = useState('red');

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
        <NativeTabs.Navigator initialRouteName="Home">
          <NativeTabs.Screen name="Home" component={Home} options={{
            tabBarLabel: 'Home',
            tabBarIcon: Platform.select({
              ios: {
                type: 'sfSymbol',
                name: 'house',
              },
              android: {
                type: 'drawableResource',
                name: 'heart_icon',
              }
            }),
            tabBarActiveTintColor: 'red',
          }} />
          <NativeTabs.Screen name="Assignments" component={Assignments} options={{
            tabBarLabel: 'Assignments',
            tabBarIcon: Platform.select({
              ios: {
                type: 'sfSymbol',
                name: 'doc.text',
              }, android: {
                type: 'drawableResource',
                name: 'heart_icon',
              },
            }),
            tabBarActiveTintColor: 'red',
          }} />
          <NativeTabs.Screen name="Schedule" component={Schedule} options={{
            tabBarLabel: 'Schedule',
            tabBarIcon: Platform.select({
              ios: {
                type: 'sfSymbol',
                name: 'calendar',
              },
              android: {
                type: 'drawableResource',
                name: 'heart_icon',
              },
            }),
            tabBarActiveTintColor: 'red',
        }} />
        </NativeTabs.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
