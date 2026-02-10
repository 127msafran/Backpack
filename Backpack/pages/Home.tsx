import { View, Text, StyleSheet, Button, Modal, Pressable, Dimensions } from 'react-native';
import Animated, { useSharedValue, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import { useState, useEffect, use } from 'react';

const { width, height } = Dimensions.get('window');
const screenDiagonal = Math.sqrt(width ** 2 + height ** 2);

export default function Home() {
  const [favColor, setFavColor] = useState('red');
  const [loggedIn, setLoggedIn] = useState(false);
  const scale = useSharedValue(1);
  const borderWidth = useSharedValue(0);
  const redBorder = useSharedValue(0);
  const orangeBorder = useSharedValue(0);
  const yellowBorder = useSharedValue(0);
  const greenBorder = useSharedValue(0);
  const tealBorder = useSharedValue(0);
  const blueBorder = useSharedValue(0);
  const purpleBorder = useSharedValue(0);
  const pinkBorder = useSharedValue(0);

  const handleLogin = () => {
    setLoggedIn(true);
  };

  const onPickColor = () => {
    borderWidth.value = withTiming(borderWidth.value === 0 ? 4 : 0, {duration: 100, easing: Easing.in(Easing.quad)});
  }

  const handleColorSelect = (color: string) => {
    setFavColor(color);
    
    // Reset all borders to 0
    redBorder.value = withTiming(0, {duration: 200});
    orangeBorder.value = withTiming(0, {duration: 200});
    yellowBorder.value = withTiming(0, {duration: 200});
    greenBorder.value = withTiming(0, {duration: 200});
    tealBorder.value = withTiming(0, {duration: 200});
    blueBorder.value = withTiming(0, {duration: 200});
    purpleBorder.value = withTiming(0, {duration: 200});
    pinkBorder.value = withTiming(0, {duration: 200});
    
    // Animate the selected color's border
    if (color === 'red') redBorder.value = withTiming(4, {duration: 200});
    if (color === 'orange') orangeBorder.value = withTiming(4, {duration: 200});
    if (color === 'yellow') yellowBorder.value = withTiming(4, {duration: 200});
    if (color === 'green') greenBorder.value = withTiming(4, {duration: 200});
    if (color === 'aqua') tealBorder.value = withTiming(4, {duration: 200});
    if (color === 'royalblue') blueBorder.value = withTiming(4, {duration: 200});
    if (color === 'darkorchid') purpleBorder.value = withTiming(4, {duration: 200});
    if (color === 'pink') pinkBorder.value = withTiming(4, {duration: 200});
    
    onPickColor();
  };
  return (
    <>
      {/*<Modal visible={!loggedIn} animationType="fade" onRequestClose={handleLogin} style = {styles.container}>
        <View style={styles.container}>
          <Text>Welcome to Backpack!</Text>
          <Text>Choose your favorite color:</Text>
          <View style={styles.colorOptions}>
            <Pressable
              onPress={() => {
                handleColorSelect('red');
              }}
            >
                  <Animated.View style={[styles.colorButtons, {backgroundColor: 'red', borderColor: '#b91d1d', borderWidth: redBorder}]}/>
                </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('orange');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'orange', borderColor: '#f97316', borderWidth: orangeBorder}]}/>
            </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('yellow');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'yellow', borderColor: '#fbbf24', borderWidth: yellowBorder}]}/>
            </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('green');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'green', borderColor: 'rgb(16, 88, 16)', borderWidth: greenBorder}]}/>
            </Pressable>
          </View>
          <View style={styles.colorOptions}>
            <Pressable
              onPress={() => {
                handleColorSelect('aqua');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'aqua', borderColor: 'rgb(55, 181, 181)', borderWidth: tealBorder}]}/>
            </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('royalblue');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'royalblue', borderColor: '#2545a7', borderWidth: blueBorder}]}/>
            </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('darkorchid');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'darkorchid', borderColor: '#651e89', borderWidth: purpleBorder}]}/>
            </Pressable>
            <Pressable
              onPress={() => {
                handleColorSelect('pink');
              }}
            >
              <Animated.View style={[styles.colorButtons, {backgroundColor: 'pink', borderColor: '#e263a2', borderWidth: pinkBorder}]}/>
            </Pressable>
          </View>
          <Button title="Log In" onPress={handleLogin} />
        </View>
      </Modal>*/}
      <Text>Hi</Text>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  colorOptions: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  colorButtons: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  circle: {
    position: 'absolute',
    width: screenDiagonal,
    height: screenDiagonal,
    borderRadius: screenDiagonal / 2,
    top: height / 2 - screenDiagonal / 2,
    left: width / 2 - screenDiagonal / 2,
    zIndex: 1000,
  }
});