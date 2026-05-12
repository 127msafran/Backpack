import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text, Button, Modal, Pressable, FlatList, ScrollView, ActivityIndicator } from 'react-native';
import Animated, { useSharedValue, withDelay, withTiming, Easing, useAnimatedStyle } from 'react-native-reanimated';
import { supabase } from '../../lib/supabase'
import FormatTime from '../../components/FormatTime';

const assignments = [
  {id: '1', title: 'Math Homework', due: 'Tomorrow', class: 'Math'},
  {id: '2', title: 'Science Project', due: 'Next Week', class: 'Science'},
  {id: '3', title: 'History Essay', due: 'In 3 Days', class: 'History'},
  {id: '4', title: 'English Reading', due: 'Tomorrow', class: 'English'},
  {id: '5', title: 'Art Portfolio', due: 'Next Month', class: 'Art'},
];
const scheduleList = [
  {id: '1', period: 1, class: 'Math', time: '9:00 AM'},
  {id: '2', period: 2, class: 'Science', time: '10:30 AM'},
  {id: '3', period: 3, class: 'History', time: '1:00 PM'},
  {id: '4', period: 4, class: 'English', time: '2:30 PM'},
  {id: '5', period: 5, class: 'Art', time: '4:00 PM'},
  {id: '1', period: 1, class: 'Math', time: '9:00 AM'},
  {id: '2', period: 2, class: 'Science', time: '10:30 AM'},
  {id: '3', period: 3, class: 'History', time: '1:00 PM'},
  {id: '4', period: 4, class: 'English', time: '2:30 PM'},
  {id: '5', period: 5, class: 'Art', time: '4:00 PM'},
  {id: '1', period: 1, class: 'Math', time: '9:00 AM'},
  {id: '2', period: 2, class: 'Science', time: '10:30 AM'},
  {id: '3', period: 3, class: 'History', time: '1:00 PM'},
  {id: '4', period: 4, class: 'English', time: '2:30 PM'},
  {id: '5', period: 5, class: 'Art', time: '4:00 PM'},
  {id: '1', period: 1, class: 'Math', time: '9:00 AM'},
  {id: '2', period: 2, class: 'Science', time: '10:30 AM'},
  {id: '3', period: 3, class: 'History', time: '1:00 PM'},
  {id: '4', period: 4, class: 'English', time: '2:30 PM'},
  {id: '5', period: 5, class: 'Art', time: '4:00 PM'},
]

export default function Index() {
  const [schedule, setSchedule] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [favColor, setFavColor] = useState('red');
  const borderWidth = useSharedValue(0);
  const redBorder = useSharedValue(0);
  const orangeBorder = useSharedValue(0);
  const yellowBorder = useSharedValue(0);
  const greenBorder = useSharedValue(0);
  const tealBorder = useSharedValue(0);
  const blueBorder = useSharedValue(0);
  const purpleBorder = useSharedValue(0);
  const pinkBorder = useSharedValue(0);

  useEffect(() => {
    getSchedule();
  }, []);

  async function getSchedule() {
    // Test connection first
    const { data, error } = await supabase.from('Schedule').select();
    
    /*if (error) {
      alert(`Connection failed:\n${error.message}\n\nCode: ${error.code}`);
      return;
    }

    if (!data || data.length === 0) {
      alert('Connected but no data returned. Check RLS policies.');
      return;
    }

    alert(`Connected! Got ${data.length} rows:\n${JSON.stringify(data[0])}`);*/
    setSchedule(data ?? []);
    setLoading(false);
  }
  
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
      <StatusBar style="auto" />
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
      <ScrollView style={styles.scrollBody}>
        <View style={styles.body}>
          <Text style={{fontFamily: 'Anton_400Regular', fontSize: 48, color: '#d5d5d5'}}>
            Hello{' '}
            <Text style={{textDecorationLine: 'underline', textDecorationColor: favColor}}>User</Text>
          </Text>
          <Text style={{color: '#d5d5d5', marginBottom: 5, marginTop: 5}}>Today's Assignments</Text>
          <FlatList
            data={assignments}
            renderItem={({item}) => (
              <View style={styles.assignmentItem}>
                <Text style={{color: '#d5d5d5', fontWeight: 'bold'}}>{item.class}</Text>
                <Text style={{color: '#d5d5d5'}}>{item.title} is due {item.due}</Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.center}>
                <Text style={{color: '#1e1e1e'}}>No assignments due 🎉</Text>
              </View>
            }
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            style={styles.assignmentsList}
          />
          <Text style={{color: '#d5d5d5', marginTop: 10, marginBottom: 5}}>Today's Schedule</Text>
          <View style={styles.schedule}>
            <FlatList
              data={schedule}
              renderItem={({item, index}) => (
                <>
                  {index > 0 && index % 5 === 0 && (
                    <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10, gap: 5 }}>
                      <View style={{ height: 60, width: 2, backgroundColor: '#888' }}/>
                      <Text style={{ color: '#888', marginHorizontal: 8 }}>Day {index / 5 + 1}</Text>
                      <View style={{ height: 60, width: 2, backgroundColor: '#888' }}/>
                    </View>
                  )}
                  <View style={styles.scheduleItem}>
                    <Text style={{color: '#d5d5d5', fontWeight: 'bold'}}>{item.class}</Text>
                    <Text style={{color: '#d5d5d5'}}>Period {item.period}: <FormatTime time={item.time} /></Text>
                  </View>
                </>
              )}
              ListEmptyComponent={
                loading
                  ? <ActivityIndicator size="large" color="#1e1e1e" />
                  : <Text style={{color: '#1e1e1e', alignSelf: 'center'}}>No classes scheduled 🕒</Text>
              }
              contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
              style={styles.assignmentsList}
              horizontal
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollBody: {
    backgroundColor: '#1e1e1e',
    width: '100%',
    height: '100%',
  },
  body: {
    padding: 10,
  },
  center: {
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
  assignmentsList: {
    backgroundColor: '#d5d5d5',
    borderRadius: 10,
    marginBottom: 10,
    height: 230
  },
  assignmentItem: {
    justifyContent: 'center',
    borderRadius: 5,
    backgroundColor: '#1e1e1e',
    padding: 10,
    margin: 10,
    gap: 5,
  },
  schedule: {
    borderRadius: 10,
    backgroundColor: '#d5d5d5',
    height: 200,
  },
  scheduleItem: {
    backgroundColor: '#1e1e1e',
    borderRadius: 5,
    padding: 10,
    margin: 10,
  }
});