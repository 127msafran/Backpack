import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Dimensions, Image, View } from 'react-native';
import { createNativeBottomTabNavigator } from '@react-navigation/bottom-tabs/unstable';
import { NavigationContainer } from '@react-navigation/native';
import Animated, { useSharedValue, withDelay, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import Assignments from './pages/Assignments';
import Home from './pages/Home';
import Schedule from './pages/Schedule';

const { width, height } = Dimensions.get('window');
const screenDiagonal = Math.sqrt(width ** 2 + height ** 2);

export default function App() {
  const NativeTabs = createNativeBottomTabNavigator();
  const scale = useSharedValue(1);

  useEffect(() => {
    scale.value = withDelay(1000, withTiming(0, {duration: 1000, easing: Easing.inOut(Easing.ease)}));
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

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
                  type: 'resource',
                  name: 'house_icon',
                },
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
                  type: 'resource',
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
                  name: 'app',
                },
                android: {
                  type: 'resource',
                  name: 'heart_icon',
                },
              }),
              tabBarActiveTintColor: 'red',
          }} />
          </NativeTabs.Navigator>
      </NavigationContainer>
      <Animated.View style={[styles.circle, animatedStyle, {backgroundColor: 'red'}]}>
        <Image
          source={require('./assets/logo.png')}
          style={styles.logo}
          resizeMode='contain'
        />
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  circle: {
    position: 'absolute',
    width: screenDiagonal,
    height: screenDiagonal,
    borderRadius: screenDiagonal / 2,
    top: height / 2 - screenDiagonal / 2,
    left: width / 2 - screenDiagonal / 2,
    zIndex: 1000,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  }
});