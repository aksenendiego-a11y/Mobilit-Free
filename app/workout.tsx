import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Switch,
  Dimensions,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useNavigation } from '@react-navigation/native';
import { selectCurrentSession, selectExerciseProgress, completeExercise, skipExercise, startExerciseProgress, endSession } from '@/lib/store';
import { exerciseSeed } from '@/lib/seeds';

// Screen dimensions
const { width, height } = Dimensions.get('window');

export default function Workout() {
  const dispatch = useDispatch();
  const { reducedMotion } = useReducedMotion();
  const navigation = useNavigation();
  const currentSession = useSelector(selectCurrentSession);
  const exerciseProgress = useSelector(selectExerciseProgress);

  useFocusEffect(() => {
    // Initialize session if coming from Today screen
    if (!currentSession?.isActive) {
      const exercises = exerciseSeed.slice(0, 5); // First 5 exercises for demo
      dispatch({ type: 'session/startSession', payload: {
        id: 'session-1',
        exerciseId: exercises[0]?.slug || '',
        exercises,
        isActive: true,
      }});
      dispatch(startExerciseProgress(exercises[0]?.slug || ''));
    }
  });

  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const exercises = currentSession?.exercises || [];
  const totalExercises = exercises.length;

  const togglePlay = () => setIsPlaying(prev => !prev);
  const nextExercise = () => setCurrentExerciseIndex(prev => {
    if (prev >= totalExercises - 1) {
      dispatch(endSession());
      navigation.goBack();
      return prev;
    }
    return prev + 1;
  });
  const prevExercise = () => setCurrentExerciseIndex(prev => {
    if (prev <= 0) return 0;
    return prev - 1;
  });
  const handleSkip = () => {
    dispatch(skipExercise(exercises[currentExerciseIndex]?.slug || ''));
    nextExercise();
  };
  const handleComplete = () => {
    dispatch(completeExercise(exercises[currentExerciseIndex]?.slug || ''));
    if (currentExerciseIndex === totalExercises - 1) {
      dispatch(endSession());
      navigation.goBack();
    } else {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      dispatch(startExerciseProgress(exercises[currentExerciseIndex + 1]?.slug || ''));
    }
  };

  if (!currentSession || exercises.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Nenhum exercício disponível</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const current = exercises[currentExerciseIndex];

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sessão de Mobilidade</Text>
        <View style={styles.controls}>
          <TouchableOpacity style={[styles.controlButton, styles.controlButtonPrev]} onPress={prevExercise} testID="prev-exercise">
            <Text style={styles.controlButtonText}>←</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.controlButtonPlay]} onPress={togglePlay} testID="play-pause">
            <Text style={styles.controlButtonText}>{isPlaying ? '⏸️' : '▶️'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.controlButtonSkip]} onPress={handleSkip} testID="skip-exercise">
            <Text style={styles.controlButtonText}>pular</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.controlButton, styles.controlButtonComplete]} onPress={handleComplete} testID="complete-exercise">
            <Text style={styles.controlButtonText}>✓</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Video Player Area */}
      <View style={styles.playerArea}>
        <View style={styles.videoBox}>
          <Text style={styles.videoPlaceholder}>
            Vídeo: {current?.name || 'Exercício'}
          </Text>
        </View>
      </View>

      {/* Exercise Details */}
      <View style={styles.details}>
        <View style={styles.exerciseInfo}>
          <Text style={styles.exerciseName}>{current?.name || 'Exercício'}</Text>
          <Text style={styles.exerciseZone}>{current?.zone || ''}</Text>
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>
            {current?.duration_minutes ? current.duration_minutes * 60 : 60}s
          </Text>
        </View>

        {/* Abas do exercício */}
        <View style={styles.tabs}>
          <TouchableOpacity style={styles.tab} onPress={() => console.log('Instruções')}>
            <Text style={styles.tabText}>Instruções</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => console.log('Estímulo')}>
            <Text style={styles.tabText}>Estímulo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab} onPress={() => console.log('Zonas')}>
            <Text style={styles.tabText}>Zonas/Músculos</Text>
          </TouchableOpacity>
        </View>

        {/* Progress bar */}
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${((currentExerciseIndex + 1) / totalExercises) * 100}%` }]} />
        </View>
      </View>

      {/* Controls at bottom */}
      <View style={styles.bottomControls}>
        <Text style={styles.instructions}>
          {isPlaying ? 'Troque de lado quando o timer piscar' : 'Pré-visualização: toque para controlar'}
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = {
  container: {
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
  title: {
    color: '#F8F8F8',
    fontSize: 20,
    fontWeight: 600,
  },
  controls: {
    flexDirection: 'row',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: '#1A1A24',
    borderRadius: 8,
  },
  controlButtonText: {
    color: '#F8F8F8',
    fontSize: 16,
  },
  playerArea: {
    width: '100%',
    height: width * 16 / 9, // 9:16 ratio based on width
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoBox: {
    width: '80%',
    height: '80%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoPlaceholder: {
    color: 'white',
    fontSize: 16,
  },
  details: {
    padding: 24,
  },
  exerciseInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  exerciseName: {
    color: '#F8F8F8',
    fontSize: 20,
    fontWeight: 600,
  },
  exerciseZone: {
    color: '#6E6E7A',
    fontSize: 12,
    marginLeft: 8,
  },
  timerContainer: {
    marginBottom: 24,
  },
  timer: {
    color: '#FF4D00',
    fontSize: 48,
    fontWeight: 700,
    textAlign: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  tab: {
    padding: 8,
    backgroundColor: '#1A1A24',
    borderRadius: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  tabText: {
    color: '#F8F8F8',
    fontSize: 12,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#6E6E7A',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progress: {
    height: '100%',
    backgroundColor: '#FF4D00',
    width: 0,
  },
  bottomControls: {
    padding: 24,
    borderTopWidth: 1,
    borderColor: '#3A3A4A',
    backgroundColor: '#12121A',
  },
  instructions: {
    color: '#6E6E7A',
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    color: '#6E6E7A',
    fontSize: 16,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#FF4D00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 600,
  },
};