import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet, PressParams, } from 'react-native';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface ButtonProps extends PressParams {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  disabled?: boolean;
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onPress?: () => void;
  size?: 'sm' | 'md' | 'lg';
  testID?: string;
}

export const Button = ({
  children,
  variant = 'primary',
  disabled,
  fullWidth,
  size = 'md',
  ...rest
}: ButtonProps) => {
  const { reducedMotion } = useReducedMotion();

  const variants = {
    primary: {
      backgroundColor: 'color.primary',
      paddingVertical: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-lg' : 'space-md',
      paddingHorizontal: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-xl' : 'space-lg',
      borderRadius: 'radius.md',
      color: 'color.on-primary',
      fontWeight: 600,
      fontSize: size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
      ...(reducedMotion && {
        transition: 'background-color 0.15s ease',
      }),
    },
    secondary: {
      backgroundColor: 'color.secondary',
      paddingVertical: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-lg' : 'space-md',
      paddingHorizontal: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-xl' : 'space-lg',
      borderRadius: 'radius.md',
      color: 'color.on-secondary',
      fontWeight: 600,
      fontSize: size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
    },
    outline: {
      backgroundColor: 'transparent',
      borderWidth: '1px',
      borderColor: 'color.border',
      paddingVertical: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-lg' : 'space-md',
      paddingHorizontal: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-xl' : 'space-lg',
      borderRadius: 'radius.md',
      color: 'color.on-surface',
      fontWeight: 600,
      fontSize: size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
    },
    ghost: {
      backgroundColor: 'transparent',
      paddingVertical: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-lg' : 'space-md',
      paddingHorizontal: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-xl' : 'space-lg',
      borderRadius: 'radius.md',
      color: 'color.muted',
      fontWeight: 600,
      fontSize: size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
    },
    danger: {
      backgroundColor: 'color.error',
      paddingVertical: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-lg' : 'space-md',
      paddingHorizontal: size === 'sm' ? 'space-sm' : size === 'lg' ? 'space-xl' : 'space-lg',
      borderRadius: 'radius.md',
      color: 'color.on-error',
      fontWeight: 600,
      fontSize: size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
    },
  };

  const activeOpacity = 0.8;

  return (
    <TouchableOpacity
      disabled={disabled}
      opacity={disabled ? 0.5 : 1}
      activeOpacity={activeOpacity}
      style={styles[variant]}
      onPress={rest.onPress}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    // Fallback styles - tokens applied via className or style prop
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullWidth: {
    width: '100%',
  },
});