import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, Modal } from 'react-native';
import { useState } from 'react';

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);
  
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text>This is a modal!</Text>
            <Pressable
              style={{
                height: 44,
                width:180,
                backgroundColor: 'lightblue',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 20,
                borderRadius: 10
              }}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text>Close Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={{
          height: 50,
          width:200,
          backgroundColor: 'lightblue',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 20,
          borderRadius: 10
        }}
        onPress={() => setModalVisible(true)}
        hitSlop={{ top: 100, bottom: 100, left: 10, right: 10 }}
      >
        <Text>Open Modal</Text>
      </Pressable>
      <StatusBar style="auto" />
    </View>
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
