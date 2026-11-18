import React, { useState, useEffect } from 'react';
import {
  View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet, Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { selectUserProfile, selectMemberships, selectLesions, selectEquipments } from '@/lib/store';
import { updateProfile, toggleNotification, toggleEconomyMode, addLesion, removeLesion, addEquipment, removeEquipment } from '@/lib/actions';

export default function Profile() {
  const dispatch = useDispatch();
  const profile = useSelector(state => useSelector(state => selectUserProfile(state)));
  const memberships = useSelector(state => useSelector(state => selectMemberships(state)));
  const lesions = useSelector(state => useSelector(state => selectLesions(state)));
  const equipments = useSelector(state => useSelector(state => selectEquipments(state)));
  const [economyMode, setEconomyMode] = useState(false);
  const [showingLesionForm, setShowingLesionForm] = useState(false);
  const [newLesion, setNewLesion] = useState('');

  useFocusEffect(() => {
    // Load profile data
  });

  const handleToggleEconomy = () => {
    setEconomyMode(!economyMode);
    dispatch(toggleEconomyMode(!economyMode));
  };

  const handleAddLesion = () => {
    if (newLesion.trim()) {
      dispatch(addLesion(newLesion.trim()));
      setNewLesion('');
      setShowingLesionForm(false);
    }
  };

  const handleRemoveLesion = (lesion: string) => {
    dispatch(removeLesion(lesion));
  };

  const handleAddEquipment = (equipment: string) => {
    dispatch(addEquipment(equipment));
  };

  const handleRemoveEquipment = (equipment: string) => {
    dispatch(removeEquipment(equipment));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileHeader}>
        <Text style={styles.profileTitle}>Perfil</Text>
      </View>

      {/* Configurações Gerais */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configurações Gerais</Text>
      </View>

      <View style={settingsRow}>
        <Text style={settingsLabel}>Idioma</Text>
        <Text style={settingsValue}>pt-BR</Text>
      </View>

      <View style={settingsRow}>
        <Text style={settingsLabel}>Unidades</Text>
        <Text style={settingsValue}>kg</Text>
      </View>

      <View style={settingsRow}>
        <Text style={settingsLabel}>Modo economia de dados</Text>
        <Switch
          value={economyMode}
          onValueChange={handleToggleEconomy}
          testID="economy-switch"
        />
        <Text style={settingsValue}>{economyMode ? 'Ligado' : 'Desligado'}</Text>
      </View>

      {/* Lesões e Restrições */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Lesões e Restrições</Text>
      </View>

      {lesions.length > 0 ? (
        <View style={lesionsList}>
          {lesions.map((lesion, index) => (
            <View key={index} style={lesionItem}>
              <Text style={lesionText}>{lesion}</Text>
              <Button
                variant="link"
                onPress={() => handleRemoveLesion(lesion)}
                testID={`remove-lesion-${index}`}
              >
                Remover
              </Button>
            </View>
          ))}
        </View>
      ) : (
        <Text style={emptyState}>Nenhuma lesão informada</Text>
      )}

      <View style={addLesionRow} onPress={() => setShowingLesionForm(true)}>
        <Text style={addLesionText}>Adicionar lesão</Text>
        <Image source={{ uri: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/icons/bootstrap.svg' }} style={{ width: 16, height: 16, marginLeft: 4 }} />
      </View>

      {/* Integrações */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Integrações</Text>
      </View>

      <View style={integrationsRow}>
        <Text style={integrationsText}>Strava</Text>
        <Text style={integrationsStatus}>Desconectado</Text>
      </View>

      <View style={integrationsRow}>
        <Text style={integrationsText}>Apple Health / Health Connect</Text>
        <Text style={integrationsStatus}>Desconectado</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0A0A0F',
  },
  profileHeader: {
    padding: 24,
    backgroundColor: 'color.surface',
    borderBottomWidth: 1,
    borderColor: '#3A3A4A',
  },
  profileTitle: {
    color: 'color.onSurface',
    fontSize: 20,
    fontWeight: 600,
    textAlign: 'center',
  },
  section: {
    padding: 24,
    marginBottom: 16,
    backgroundColor: 'color.surface',
    borderRadius: 12,
  },
  sectionTitle: {
    color: 'color.muted',
    fontSize: 14,
    marginBottom: 20,
  },
  settingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'color.surface',
    borderRadius: 8,
    marginHorizontal: 24,
    marginBottom: 8,
  },
  settingsLabel: {
    color: 'color.onSurface',
    fontSize: 14,
  },
  settingsValue: {
    color: 'color.primary',
    fontSize: 14,
    fontWeight: 500,
  },
  lesionsList: {
    marginHorizontal: -24,
    marginBottom: 16,
  },
  lesionItem: {
    backgroundColor: 'color.surface',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  lesionText: {
    color: 'color.onSurface',
    fontSize: 14,
  },
  addLesionRow: {
    backgroundColor: 'color.surface',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'color.border',
  },
  addLesionText: {
    color: 'color.primary',
    fontSize: 14,
    flex: 1,
  },
  section: {
    padding: 24,
    marginHorizontal: 24,
    marginBottom: 16,
    backgroundColor: 'color.surface',
    borderRadius: 12,
  },
  integrationsRow: {
    backgroundColor: 'color.surface',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 24,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'color.border',
  },
  integrationsText: {
    color: 'color.onSurface',
    fontSize: 14,
    flex: 1,
  },
  integrationsStatus: {
    color: 'color.muted',
    fontSize: 12,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    color: 'color.muted',
  },
});