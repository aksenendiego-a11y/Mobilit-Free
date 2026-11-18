import React from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Text } from 'react-native';
import { Header } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';
import { useTheme } from '@/hooks/useTheme';

export default function Root() {
  const { user, loading } = useAuth();
  const { theme, setTheme } = useTheme();

  if (loading) {
    return null; // Show nothing while auth loads
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <Header />
      {user ? null : (
        <View style={styles.onboardingPlaceholder}>
          <Text style={styles.onboardingText}>Bem-vindo ao Mobility Free</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
});