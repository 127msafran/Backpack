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
import FormatTime from '../../components/FormatTime';

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
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        getSchedule();
    }, []);

    async function getSchedule() {
        // Test connection first
        if (!loading) setLoading(true);
        const { data, error } = await supabase.from('Schedule').select();
        
        const sorted = (data ?? []).sort((a, b) => a.period - b.period);
        setSchedule(sorted);
        setLoading(false);
    }

    async function addScheduleItem() {
        setModalVisible(false);
        const { data: { user } } = await supabase.auth.getUser();
        

        if (!user) {
            window.alert('You must be logged in to add a class.');
            return;
        }

        const { error } = await supabase
            .from('Schedule')
            .insert({
                class: className,
                period: Number(period),
                time: Platform.OS === 'web' ? `${hours}:${minutes}:00` : time.toTimeString().split(' ')[0],
                user_id: user.id
            });

        if (error) {
            window.alert('Error: ' + error.message);
            return;
        }

        setClassName('');
        setPeriod('');
        setHours('');
        setMinutes('');
        getSchedule(); // refresh the list
    }

    async function deleteScheduleItem(id: number) {
        const { error } = await supabase
            .from('Schedule')
            .delete()
            .eq('id', id);

        if (error) {
            window.alert('Error: ' + error.message);
            return;
        }

        getSchedule();
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
                            <Pressable 
                                style={[styles.minusButton, Platform.OS === 'web' && { cursor: 'pointer' } as any]}
                                onPress={() => setDeleteId(item.id)}
                            >
                                <AntDesign name="minus" size={16} color="#d5d5d5" pointerEvents="none" />
                            </Pressable>
                            <Text style={{color: '#d5d5d5', fontWeight: 'bold'}}>{item.class}</Text>
                            <Text style={{color: '#d5d5d5'}}>Period {item.period}</Text>
                            <Text style={{color: '#d5d5d5'}}><FormatTime time={item.time}/></Text>
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
                            onChangeText={(text) => setPeriod(text.replace(/[^0-9]/g, ''))}
                        />
                        {Platform.OS === 'web' ?(
                            <View style={styles.time}>
                                <TextInput
                                    style={[styles.input, {width: 102}]}
                                    placeholder="HH"
                                    placeholderTextColor={"#808080"}
                                    value={hours}
                                    onChangeText={(text) => setHours(text.replace(/[^0-9]/g, ''))}
                                    maxLength={2}
                                    keyboardType='numeric'
                                />
                                <Text style={{color: '#d5d5d5'}}>:</Text>
                                <TextInput
                                    style={[styles.input, {width: 102}]}
                                    placeholder="MM"
                                    placeholderTextColor={"#808080"}
                                    value={minutes}
                                    onChangeText={(text) => setMinutes(text.replace(/[^0-9]/g, ''))}
                                    maxLength={2}
                                    keyboardType='numeric'
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
                        <Pressable style={styles.addClassButton} onPress={addScheduleItem}>
                            <Text style={{fontFamily: 'GoogleSans_400Regular', color: 'white'}}>Add</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Modal
                visible={deleteId !== null}
                transparent={true}
                animationType='fade'
                onRequestClose={() => setDeleteId(null)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={{color: '#d5d5d5', fontWeight: 'bold', fontSize: 24, textAlign: 'center'}} >Are you sure you want to remove this class?</Text>
                        <View style={{gap: 20, marginTop: 10}}>
                            <Pressable
                                onPress={() => {
                                    if (deleteId !== null) deleteScheduleItem(deleteId);
                                    setDeleteId(null);
                                }}
                                style={styles.removeAndCancel}
                            >
                                <Text style={{color: '#d5d5d5', fontWeight: 600}}>Remove</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => setDeleteId(null)}
                                style={styles.removeAndCancel}
                            >
                                <Text style={{color: '#d5d5d5', fontWeight: 600}}>Cancel</Text>
                            </Pressable>
                        </View>
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
        overflow: 'hidden',
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    },
    addClassButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10
    },
    minusButton: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        width: 30,
        top: 5,
        right: 5,
        zIndex: 10,
    },
    removeAndCancel: {
        padding: 10,
        width: 200,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    }
});