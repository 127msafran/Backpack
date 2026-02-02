import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, Image } from 'react-native';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Assignments from './pages/Assignments';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

export default function App() {
  const NativeTabs = createNativeBottomTabNavigator();

  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
          <NativeTabs.Navigator initialRouteName="Home">
            <NativeTabs.Screen name="Home" component={Home} options={{
              tabBarLabel: 'Home',
              tabBarIcon: Platform.select({
                ios: {
                  type: 'sfSymbol',
                  name: 'house',
                },
                android: {
                  type: 'image',
                  source: require('./assets/home_icon.png'),
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
    </>
  );
}