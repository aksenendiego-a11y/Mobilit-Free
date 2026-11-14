import React from 'react';
import { View, TextInput, StyleSheet, } from 'react-native';

interface InputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
  testID?: string;
}

export const Input = ({
  label,
  value,
  onChangeText,
  disabled = false,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  testID,
}: InputProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        disabled={disabled}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 'space-md',
  },
  label: {
    color: 'color.onSurface',
    fontSize: 'text-sm',
    fontWeight: 500,
    marginBottom: 'space-xs',
  },
  input: {
    backgroundColor: 'color.surface',
    borderWidth: '1px',
    borderColor: 'color.border',
    borderRadius: 'radius.md',
    paddingHorizontal: 'space-md',
    paddingVertical: 'space-sm',
    color: 'color.onBackground',
    fontSize: 'text-base',
  },
});