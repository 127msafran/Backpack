import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { supabase } from '../../lib/supabase';

type ScheduleItem = {
    id: number;
    class: string;
    period: number;
    time: string;
}

export default function Schedule() {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [loading, setLoading] = useState(true);

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

    return (
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
                        : <Text style={{color: '#d5d5d5'}}>No schedule data available.</Text>
                }
                style={styles.schedule}
            />
        </View>
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
    }
});