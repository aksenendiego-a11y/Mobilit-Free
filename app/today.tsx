import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, ActivityIndicator,
  StyleSheet, Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile, selectTestResults, selectDailyRoutine, selectMembership } from '@/lib/store';
import { setUser, toggleEconomyMode, setLanguage } from '@/lib/store';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useNavigation } from '@react-navigation/native';

export default function Today() {
  const dispatch = useDispatch();
  const { user, loading, economyMode, language, units, equipment, lesions } = useSelector(selectUserProfile);
  const testResults = useSelector(selectTestResults);
  const dailyRoutine = useSelector(selectDailyRoutine);
  const [localEconomyMode, setLocalEconomyMode] = useState(false);
  const { reducedMotion } = useReducedMotion();
  const navigation = useNavigation();

  useFocusEffect(() => {
    // Load mock user if not exists
    if (!user) {
      dispatch(setUser({
        id: 'user-1',
        name: 'Usuário Teste',
        level: 'intermediario',
        frequency: '3x',
        schedule: 'noite',
        location: 'box',
        equipment: ['banda', 'rolo', 'barra'],
        injuries: ['ombro_direito'],
        language: 'pt-BR',
        units: 'kg',
        economyMode: false,
        streakVisible: true,
      }));
    }
  });

  const handleStartRoutine = () => {
    navigation.navigate('workout');
  };

  const handleWODProtocol = () => {
    navigation.navigate('workout');
  };

  const handleEconomyToggle = () => {
    setLocalEconomyMode(!localEconomyMode);
    dispatch(toggleEconomyMode());
  };

  const handleThemeToggle = () => {
    // Theme toggle would be handled by a theme context
    console.log('Toggle theme');
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF4D00" />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.mainContainer}>
      {/* Header com tema e avatar */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerTitle}>Hoje</Text>
          <Text style={styles.headerSubtitle}>Mobilidade e Aquecimento</Text>
        </View>
        <View style={styles.headerRight}>
          <Switch
            value={localEconomyMode}
            onValueChange={handleEconomyToggle}
            trackColor={{ false: 'gray', true: 'green' }}
          />
          <Text style={styles.economyText}>Economia de dados</Text>
        </View>
      </View>

      {/* Rotina do Dia Card */}
      <View style={styles.routineCard}>
        <Text style={styles.routineTitle}>Rotina Personalizada</Text>
        <Text style={styles.routineSubtitle}>
          {dailyRoutine?.length ? `${dailyRoutine.length} exercícios` : '15 min — Mobilidade quadril e ombros'}
        </Text>
        <Text style={styles.routineTimer}>
          00:15
        </Text>
        <TouchableOpacity style={styles.startButton} onPress={handleStartRoutine} testID="start-routine">
          <Text style={styles.startButtonText}>Começar</Text>
        </TouchableOpacity>
      </View>

      {/* Atalho WOD */}
      <TouchableOpacity style={styles.wodSection} onPress={handleWODProtocol} testID="wod-shortcut">
        <View style={styles.wodSectionContent}>
          <Text style={styles.wodSectionTitle}>Aquecer para o WOD de hoje</Text>
          <Text style={styles.wodSectionSubtitle}>
            Gerar aquecimento e volta à calma baseados no WOD do dia
          </Text>
        </View>
        <Text style={styles.wodArrow}>›</Text>
      </TouchableOpacity>

      {/* Progresso */}
      <View style={styles.streakSection}>
        <Text style={styles.streakTitle}>Progresso</Text>
        <Text style={styles.streakValue}>
          {testResults?.length > 0 ? `${testResults.length} sessões este mês` : 'Faça seu teste inicial'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  mainContainer: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    padding: 24,
    borderBottomWidth: 1,
    borderColor: '#3A3A4A',
    backgroundColor: '#12121A',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    color: '#F8F8F8',
    fontSize: 24,
    fontWeight: 600,
  },
  headerSubtitle: {
    color: '#6E6E7A',
    fontSize: 14,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routineCard: {
    backgroundColor: '#1A1A24',
    borderRadius: 16,
    padding: 24,
    margin: 24,
  },
  routineTitle: {
    color: '#F8F8F8',
    fontSize: 18,
    marginBottom: 4,
  },
  routineSubtitle: {
    color: '#6E6E7A',
    fontSize: 14,
  },
  routineTimer: {
    color: '#FF4D00',
    fontSize: 32,
    fontWeight: 700,
    marginTop: 8,
  },
  startButton: {
    backgroundColor: '#FF4D00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 16,
    alignSelf: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
  wodSection: {
    backgroundColor: '#1A1A24',
    borderRadius: 16,
    padding: 20,
    margin: 0 24 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wodSectionContent: {
    flex: 1,
  },
  wodSectionTitle: {
    color: '#6E6E7A',
    fontSize: 14,
    marginBottom: 4,
  },
  wodSectionSubtitle: {
    color: '#6E6E7A',
    fontSize: 12,
  },
  wodArrow: {
    color: '#FF4D00',
    fontSize: 24,
    fontWeight: 600,
  },
  streakSection: {
    backgroundColor: '#1A1A24',
    borderRadius: 16,
    padding: 20,
    margin: 0 24,
  },
  streakTitle: {
    color: '#6E6E7A',
    fontSize: 12,
    marginBottom: 4,
  },
  streakValue: {
    color: '#F8F8F8',
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
};