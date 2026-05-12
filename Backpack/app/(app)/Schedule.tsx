import { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Pressable,
    Modal,
    TextInput,
    Platform
} from 'react-native';
import { supabase } from '../../lib/supabase';
import DateTimePicker from '@react-native-community/datetimepicker';
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';

type ScheduleItem = {
    id: number;
    class: string;
    period: number;
    time: string;
}

export default function Schedule() {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [time, setTime] = useState(new Date());
    const [className, setClassName] = useState('');
    const [period, setPeriod] = useState('');
    const [hours, setHours] = useState('');
    const [minutes, setMinutes] = useState('');

    useEffect(() => {
        getSchedule();
    }, []);

    async function getSchedule() {
        // Test connection first
        if (!loading) setLoading(true);
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

    return (
        <>
            <View style={styles.container}>
                <Text style={{color: '#d5d5d5', marginBottom: 10}}>Schedule</Text>
                <FlatList
                    data={schedule}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.scheduleItem}>
                            <Text style={{color: '#d5d5d5'}}>{item.time} - {item.class}</Text>
                        </View>
                    )}
                    contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
                    ListEmptyComponent={
                        loading
                            ? <ActivityIndicator size="large" color="#1e1e1e" />
                            : <Text style={{color: '#1e1e1e', alignSelf: 'center'}}>No schedule data available.</Text>
                    }
                    style={styles.schedule}
                />
            </View>
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Pressable style={styles.closeModalButton} onPress={() => setModalVisible(false)}>
                            <AntDesign name="close" size={20} color="#d5d5d5" />
                        </Pressable>
                        <Text style={{color: '#d5d5d5'}}>Add a class</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Class Name"
                            placeholderTextColor={"#808080"}
                            value={className}
                            onChangeText={setClassName}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Period"
                            placeholderTextColor={"#808080"}
                            value={period}
                            onChangeText={setPeriod}
                        />
                        {Platform.OS === 'web' ?(
                            <View style={styles.time}>
                                <TextInput
                                    style={[styles.input, {width: 102}]}
                                    placeholder="HH"
                                    placeholderTextColor={"#808080"}
                                    value={hours}
                                    onChangeText={setHours}
                                />
                                <Text style={{color: '#d5d5d5'}}>:</Text>
                                <TextInput
                                    style={[styles.input, {width: 102}]}
                                    placeholder="MM"
                                    placeholderTextColor={"#808080"}
                                    value={minutes}
                                    onChangeText={setMinutes}
                                />
                            </View>
                        ) : (
                            <DateTimePicker
                                value={time}
                                mode='time'
                                onChange={(event, selectedTime) => {
                                    if (selectedTime) setTime(selectedTime);
                                }}
                            />
                        )}
                        <Pressable>
                            <Text style={{color: 'blue'}}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
                <Feather name="plus" size={24} color="#d5d5d5" />
            </Pressable>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    schedule: {
        backgroundColor: '#d5d5d5',
        borderRadius: 10,
        marginBottom: 10,
        height: 230,
    },
    scheduleItem: {
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#1e1e1e',
        padding: 10,
        margin: 10,
        gap: 5
    },
    addButton: {
        position: 'absolute',
        height: 50,
        width: 50,
        borderRadius: 10,
        backgroundColor: "blue",
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 10,
        right: 10,
    },
    modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // dark transparent background
    },
    modalBox: {
        backgroundColor: '#1e1e1e',
        borderRadius: 10,
        padding: 20,
        width: 400,
        alignItems: 'center',
        gap: 5
    },
    closeModalButton: {
        position: 'absolute',
        top: 5,
        right: 5,
    },
    input: {
        backgroundColor: '#d5d5d5',
        color: '#1e1e1e',
        padding: 10,
        borderRadius: 5,
        borderColor: '#808080',
        borderWidth: 2
    },
    time: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }
});