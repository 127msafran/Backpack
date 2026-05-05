import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Settings() {
    

    return (
        <View style={styles.container}>
            <Text>Settings Page</Text>
            <Button title="Sign Out" onPress={() => supabase.auth.signOut({scope: 'local'})} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});