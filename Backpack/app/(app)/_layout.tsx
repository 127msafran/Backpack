import { Tabs } from 'expo-router';
import { useEffect } from 'react';
import { Image, StyleSheet, Dimensions } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window');
const screenDiagonal = Math.sqrt(width ** 2 + height ** 2);

export default function RootLayout() {
    const scale = useSharedValue(1);

    useEffect(() => {
        scale.value = withDelay(1000, withTiming(0, {duration: 1000, easing: Easing.inOut(Easing.ease)}));
    }, []);
    
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }));

    return (
        <>
            <Animated.View style={[styles.circle, animatedStyle, {backgroundColor: 'red'}]}>
                <Image
                source={require('../../assets/logo.png')}
                style={styles.logo}
                resizeMode='contain'
                />
            </Animated.View>
            <Tabs screenOptions = {{
                headerShown: false,
                sceneStyle: { backgroundColor: '#1a1a1a' },
                tabBarStyle:{
                    backgroundColor: '#202020',
                    borderTopColor: 'transparent',
                    borderRadius: 10,
                    width: '60%',
                    alignSelf: 'center',
                    borderTopWidth: 0,
                    position: 'absolute',
                    left: '20%',
                    bottom: 20,
                },
                tabBarLabelStyle: {
                    fontFamily: 'GoogleSans_700Bold',
                },
                tabBarActiveTintColor: '#d5d5d5',
                tabBarInactiveTintColor: '#888888'
            }}>
                <Tabs.Screen name = "index" options = {{
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "home" : "home-outline"} size={size} color={color} />
                    )
                }}/>
                <Tabs.Screen name = "Schedule" options = {{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "calendar" : "calendar-outline"} size={size} color={color} />
                    )
                }}/>
                <Tabs.Screen name = "Assignments" options = {{
                    tabBarLabel: 'Assignments',
                    tabBarIcon: ({ color, size, focused }) => (
                        <MaterialCommunityIcons name={focused ? "list-box" : "list-box-outline"} size={size} color={color} />
                    )
                }}/>
                <Tabs.Screen name = "Settings" options = {{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons name={focused ? "settings-sharp" : "settings-outline"} size={size} color={color} />
                    )
                }}/>
            </Tabs>
        </>
    )
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