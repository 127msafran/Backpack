import { View, Text, StyleSheet, Button, Modal } from 'react-native';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useState } from 'react';
import 

export default function Home() {
  const [favColor, setFavColor] = useState('red');
  const dimensions = useSharedValue(200);
  const [loggedIn, setLoggedIn] = useState(false);

  const handlePress = () => {
    if (dimensions.value > 0) {
      dimensions.value = withSpring(dimensions.value - 20);
    }
  }

  return (
    <>
      <Animated.View
        style={{
          borderRadius: 100,
          width: dimensions.value,
          height: dimensions.value,
          backgroundColor: favColor,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />
      <Button title = "Press me" onPress = {handlePress} />
      <Modal visible={!loggedIn} animationType="fade" onRequestClose={() => setLoggedIn(true)}>
        <View>
          <Text>Welcome to Backpack!</Text>
          <Text>Choose your favorite color:</Text>
          <View style={styles.colorOptions}>
            <Button title="" onPress={() => setFavColor('red')} color="red" />
            <Button title="" onPress={() => setFavColor('orange')} color="orange" />
            <Button title="" onPress={() => setFavColor('yellow')} color="yellow" />
            <Button title="" onPress={() => setFavColor('green')} color="green" />
          </View>
          <View style={styles.colorOptions}>
            <Button title="" onPress={() => setFavColor('teal')} color="teal" />
            <Button title="" onPress={() => setFavColor('blue')} color="blue" />
            <Button title="" onPress={() => setFavColor('purple')} color="purple" />
            <Button title="" onPress={() => setFavColor('pink')} color="pink" />
          </View>
          <Button title="Log In" onPress={() => setLoggedIn(true)} />
        </View>
      </Modal>
      <View style={styles.container}>
        <Text>Hello "Insert Username Here"</Text>
      </View>
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
  }
});