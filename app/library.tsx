import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, FlatList, ScrollView, ActivityIndicator,
  RefreshControl, StyleSheet, Switch, TextInput
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile } from '@/lib/store';
import { exerciseSeed } from '@/lib/seeds';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function Library() {
  const dispatch = useDispatch();
  const { equipment, lesions } = useSelector(selectUserProfile);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredExercises, setFilteredExercises] = useState<typeof exerciseSeed>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { reducedMotion } = useReducedMotion();

  useFocusEffect(() => {
    setFilteredExercises(exerciseSeed);
  });

  useEffect(() => {
    const debounce = setTimeout(() => {
      setFilteredExercises(exerciseSeed.filter(ex =>
        ex.name.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchQuery]);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => {
            setIsRefreshing(true);
            setTimeout(() => {
              setIsRefreshing(false);
            }, 1000);
          }}
        />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Biblioteca de Exercícios</Text>
        <View style={styles.headerActions}>
          <Switch
            value={reducedMotion}
            onValueChange={() => console.log('Reduced motion toggled')}
            testID="reduced-motion-switch"
          />
        </View>
      </View>

      {/* Search */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar exercício, zona ou tipo..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          autoCapitalize="none"
        />
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <View style={styles.filterChip} onPress={() => filterByZone('Quadris')}>
          <Text style={styles.filterText}>Quadris</Text>
        </View>
        <View style={styles.filterChip} onPress={() => filterByZone('Overhead')}>
          <Text style={styles.filterText}>Overhead</Text>
        </View>
        <View style={styles.filterChip} onPress={() => filterByZone('Tornozelos')}>
          <Text style={styles.filterText}>Tornozelos</Text>
        </View>
        <View style={styles.filterChip} onPress={() => filterByZone('Tórax')}>
          <Text style={styles.filterText}>Tórax</Text>
        </View>
      </View>

      {/* List */}
      <FlatList
        data={filteredExercises}
        keyExtractor={item => item.slug}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => console.log('Ver detalhes:', item.name)}
            testID={item.slug}
          >
            <View style={styles.itemContent}>
              <View style={styles.itemZoneTag}>{item.zone}</View>
              <View style={styles.itemInfo}>
                <Text style={styles.itemTitle}>{item.name}</Text>
                <Text style={styles.itemSubtitle}>
                  {item.type} • {item.duration_minutes}min • {item.equipment}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={2}
        horizontal={false}
        contentContainerStyle={styles.listContainer}
        refreshing={isRefreshing}
      />
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
  headerTitle: {
    color: '#F8F8F8',
    fontSize: 22,
    fontWeight: 600,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginLeft: 'auto',
  },
  searchContainer: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginLeft: -24,
    marginRight: -24,
  },
  searchInput: {
    backgroundColor: '#1A1A24',
    borderWidth: 1,
    borderColor: '#3A3A4A',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#F8F8F8',
  },
  filters: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    marginLeft: -24,
    marginRight: -24,
    gap: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  filterChip: {
    backgroundColor: '#1A1A24',
    borderWidth: 1,
    borderColor: '#3A3A4A',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  filterText: {
    color: '#F8F8F8',
    fontSize: 12,
    fontWeight: 500,
  },
  listContainer: {
    padding: 24,
    gap: 16,
  },
  item: {
    backgroundColor: '#1A1A24',
    borderRadius: 12,
    overflow: 'hidden',
  },
  itemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  itemZoneTag: {
    backgroundColor: '#FF4D00',
    color: 'white',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 12,
    fontSize: 11,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#F8F8F8',
    fontSize: 14,
    fontWeight: 500,
  },
  itemSubtitle: {
    color: '#6E6E7A',
    fontSize: 12,
    marginTop: 2,
  },
};