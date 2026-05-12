import { TextInput, Text, View, StyleSheet, Button } from 'react-native';
import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function signIn() {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) window.alert('Error: ' + error.message);
            else router.replace('/(app)');
        } catch (e) {
            window.alert('Unexpected error: ' + JSON.stringify(e));
        }
        setLoading(false);
    }

    async function signUp() {
        setLoading(true);
        try {
            const { error } = await supabase.auth.signUp({ email, password, options: { emailRedirectTo: 'https://psychic-space-parakeet-5gg5rv564rvvc7j7w-8081.app.github.dev/'} });
            if (error) window.alert('Error: ' + error.message);
            else window.alert('Check your email for a confirmation link!');
        } catch (e) {
            window.alert('Unexpected error: ' + JSON.stringify(e));
        }
        setLoading(false);
    }

    return (
        <View style={styles.body}>
            <Text style={{color: '#d5d5d5',}}>Welcome to Backpack</Text>
            <Text style={{color: '#d5d5d5',}}>Please login to continue</Text>
            <TextInput
                style={styles.input}
                placeholder='Email'
                placeholderTextColor={'#808080'}
                value={email}
                onChangeText={setEmail}
                autoCapitalize='none'
                keyboardType='email-address'
            />
            <TextInput
                style={styles.input}
                placeholder='Password'
                placeholderTextColor={'#808080'}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <Button title={loading ? 'Loading...' : 'Sign In'} onPress={signIn} disabled={loading} />
            <Button title={loading ? 'Loading...' : 'Sign Up'} onPress={signUp} disabled={loading} />
        </View>
    );
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#1e1e1e',
    },
    input: {
        backgroundColor: '#d5d5d5',
        color: '#1e1e1e',
        padding: 10,
        borderRadius: 5,
        borderColor: '#808080',
        borderWidth: 2
    },
})