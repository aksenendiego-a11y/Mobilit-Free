import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Switch,,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTestResults, selectDailyStreak, selectMembership } from '@/lib/store';
import { toggleStreakVisibility } from '@/lib/actions';

export default function Progress() {
  const dispatch = useDispatch();
  const testResults = useSelector(state => useSelector(state => selectTestResults(state)));
  const dailyStreak = useSelector(state => useSelector(state => selectDailyStreak(state)));
  const [showStreakSettings, setShowStreakSettings] = useState(false);

  useFocusEffect(() => {
    // Load progress data
  });

  const toggleStreak = () => {
    setShowStreakSettings(!showStreakSettings);
    dispatch(toggleStreakVisibility(!showStreakSettings));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progresso</Text>
      </View>

      {/* Score Geral */}
      <View style={statsCard}>
        <Text style={statsLabel}>Score Geral de Mobilidade</Text>
        <Text style={statsValue}>{dailyStreak?.overallScore || '—'}%</Text>
      </View>

      {/* Evolução por Zona */}
      <View style={statsCard}>
        <Text style={statsLabel}>Evolução por Zona</Text>
        <Text style={statsValue}>{dailyStreak?.zoneScores?.length || 0} zonas acompanhadas</Text>
      </View>

      {/* Dias Seguidores */}
      <View style={statsCard}>
        <Text style={statsLabel}>Dias Seguidores</Text>
        <Text style={statsValue}>
          <Switch
            value={dailyStreak?.isVisible || false}
            onValueChange={toggleStreak}
            testID="streak-switch"
          />{' '}
          {dailyStreak?.count || 0} dias
        </Text>
      </View>

      {/* Timeline de Retestes */}
      <View style={section}>
        <Text style={sectionTitle}>Timeline de Retestes</Text>
      </View>

      {testResults.length > 0 ? (
        <View style={timeline}>
          {testResults.map((result, index) => (
            <View key={index} style={timelineItem}>
              <Text style={timelineDate}>{new Date(result.testDate).toLocaleDateString('pt-BR')}</Text>
              <Text style={timelineScore}>{result.overallScore}%</Text>
            </View>
          ))}
        </View>
      ) : (
        <Text style={emptyState}>Nenhum reteste realizado ainda</Text>
      )}

      {/* Ações */}
      <View style={actions}>
        <Button
          variant="primary"
          fullWidth
          onPress={() => console.log('Retestar mensal')}
          testID="retest-btn"
        >
          Retestar Mensal
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  header: {
    padding: 24,
    backgroundColor: 'color.surface',
    borderBottomWidth: 1,
    borderColor: '#3A3A4A',
  },
  title: {
    color: 'color.onSurface',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  statsCard: {
    backgroundColor: 'color.surface',
    borderRadius: 12,
    padding: 20,
    margin: 16,
    alignItems: 'center',
  },
  statsLabel: {
    color: 'color.muted',
    fontSize: 12,
    marginBottom: 4,
  },
  statsValue: {
    color: 'color.onSurface',
    fontSize: 24,
    fontWeight: 600,
  },
  section: {
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: 'color.surface',
    borderRadius: 12,
  },
  sectionTitle: {
    color: 'color.muted',
    fontSize: 14,
    marginBottom: 20,
  },
  timeline: {
    marginHorizontal: -24,
  },
  timelineItem: {
    backgroundColor: 'color.surface',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timelineDate: {
    color: 'color.muted',
    fontSize: 12,
  },
  timelineScore: {
    color: 'color.onSurface',
    fontSize: 16,
    fontWeight: 500,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    color: 'color.muted',
  },
  actions: {
    padding: 24,
    marginHorizontal: 24,
  },
});