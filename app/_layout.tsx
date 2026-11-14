import { Tabs } from 'expo-router';
import * as React from 'react';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF4D00',
        tabBarInactiveTintColor: '#6E6E7A',
        tabBarStyle: {
          backgroundColor: '#12121A',
          borderTopWidth: 1,
          borderTopColor: '#3A3A4A',
          height: Platform.OS === 'ios' ? 80 : 60,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="today"
        options={{
          title: 'Hoje',
          tabBarIcon: ({ focused, color }) => (
            <React.Fragment>
              {focused ? '🏠' : '🏠'}
            </React.Fragment>
          ),
        }}
      />
      <Tabs.Screen
        name="workout"
        options={{
          title: 'Treino',
          tabBarIcon: ({ focused, color }) => (
            <React.Fragment>
              {focused ? '🏋️' : '🏋️'}
            </React.Fragment>
          ),
        }}
      />
      <Tabs.Screen
        name="library"
        options={{
          title: 'Biblioteca',
          tabBarIcon: ({ focused, color }) => (
            <React.Fragment>
              {focused ? '📚' : '📚'}
            </React.Fragment>
          ),
        }}
      />
      <Tabs.Screen
        name="progress"
        options={{
          title: 'Progresso',
          tabBarIcon: ({ focused, color }) => (
            <React.Fragment>
              {focused ? '📈' : '📈'}
            </React.Fragment>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ focused, color }) => (
            <React.Fragment>
              {focused ? '👤' : '👤'}
            </React.Fragment>
          ),
        }}
      />
    </Tabs>
  );
}