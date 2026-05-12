import { useEffect, useRef, useState } from 'react';
import { Slot, useRouter, Redirect } from 'expo-router';
import { supabase } from '../lib/supabase';
import { Session } from '@supabase/supabase-js';
import { useFonts, Comfortaa_400Regular, Comfortaa_700Bold } from '@expo-google-fonts/comfortaa';
import { Nunito_400Regular, Nunito_700Bold } from '@expo-google-fonts/nunito';
import { Anton_400Regular } from '@expo-google-fonts/anton';
import { Feather } from '@expo/vector-icons';

export default function RootLayout() {
    const [session, setSession] = useState<Session | null>(null);
    const [loading, setLoading] = useState(true);
    const [fontsLoaded] = useFonts({
        Comfortaa_400Regular,
        Comfortaa_700Bold,
        Nunito_400Regular,
        Nunito_700Bold,
        Anton_400Regular,
        ...Feather.font
    });
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setLoading(false);
        });

        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });
    }, []);

    if (loading || !fontsLoaded) return null;

    if (!session) {
        return (
            <>
                <Slot />
                <Redirect href="/(auth)/login" />
            </>
        );
}

    return <Slot />;
}