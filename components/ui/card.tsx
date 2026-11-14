import React from 'react';
import { View, Text, StyleSheet, } from 'react-native';

interface CardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  status?: 'default' | 'loading' | 'error' | 'empty';
  onError?: () => void;
}

export const Card = ({
  title,
  subtitle,
  children,
  status = 'default',
  onError,
}: CardProps) => {
  const statusStyles = {
    default: {
      backgroundColor: 'color.surface',
      borderColor: 'color.border',
    },
    loading: {
      backgroundColor: 'color.surface',
    },
    error: {
      backgroundColor: '#EF4444',
    },
    empty: {
      backgroundColor: 'color.surface',
    },
  };

  const statusContent = {
    default: children,
    loading: (
      <View style={styles.loading}>
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    ),
    error: (
      <View style={styles.error}>
        <Text style={styles.errorText}>Erro ao carregar</Text>
        {onError && <Text style={styles.errorRetry} onPress={onError}>Tentar novamente</Text>}
      </View>
    ),
    empty: (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>Nenhum dado disponível</Text>
      </View>
    ),
  };

  return (
    <View style={[styles.root, statusStyles[status]]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      {statusContent[status]}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: 'color.surface',
    borderRadius: 'radius.md',
    borderWidth: '1px',
    borderColor: 'color.border',
    overflow: 'hidden',
    marginBottom: 'space-md',
  },
  title: {
    color: 'color.onSurface',
    fontSize: 'text-lg',
    fontWeight: 600,
    padding: 'space-sm',
  },
  subtitle: {
    color: 'color.muted',
    fontSize: 'text-sm',
    padding: 'space-sm',
  },
  loading: {
    padding: 'space-3xl',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
  },
  loadingText: {
    color: 'color.muted',
  },
  error: {
    padding: 'space-3xl',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    backgroundColor: '#EF4444',
  },
  errorText: {
    color: 'white',
    fontSize: 'text-sm',
  },
  empty: {
    padding: 'space-3xl',
    alignItems: 'center',
    justifyContent: 'center',
    height: 200,
    color: 'color.muted',
  },
  emptyText: {
    color: 'color.muted',
  },
});